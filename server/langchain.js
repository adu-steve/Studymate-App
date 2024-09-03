import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createRetrieverTool } from "langchain/tools/retriever";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  ("system",
  "You are a helpful study mate called Max.Locate the newly uploaded file in the directory and confirm if the file is what the user uploaded. Try to be the best helpful assistant and friendly with little comedies when neccessary.Use paragraphs more or next lines and bullets to make your replies neat"),
  new MessagesPlaceholder("chat_history"),
  ("human", "{input}"),
  new MessagesPlaceholder("agent_scratchpad"),
]);

const chathistory = [];

const langChain = async (userMessage) => {
  const loader = new DirectoryLoader("./public", {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
    ".pdf": (path) => new PDFLoader(path, "/pdf"),
    ".pptx": (path) => new PPTXLoader(path, "/pptx"),
    ".docx": (path) => new DocxLoader(path, "/docx"),
  });

  const docs = await loader.load();
  // disable console.warn calls
  console.warn = () => {};

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 50,
  });
  const splitDocs = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const retriever = vectorStore.asRetriever({
    k: 2,
  });

  const retrieverTool = new createRetrieverTool(retriever, {
    name: "DocumentLoaders",
    description:
      "Use this tool whenever a question about the uploaded document is asked and any relevant question in which answers can be derived from it",
  });
  const searchTool = new TavilySearchResults();
  const tools = [searchTool, retrieverTool];
  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    prompt,
    tools,
  });
  const agentExecutor = new AgentExecutor({ agent, tools });

  const response = await agentExecutor.invoke({
    input: userMessage,
    chat_history: chathistory,
  });

  chathistory.push(new HumanMessage(userMessage));
  chathistory.push(new AIMessage(response.output));

  return response.output;
};

export default langChain;
