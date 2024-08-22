import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { UnstructuredDirectoryLoader } from "@langchain/community/document_loaders/fs/unstructured";
dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  ("system",
  "You are a helpful study mate called Max. Show the file name when you receive it before your message. try to be the best helpful assistant and friendly with little comedies when neccessary "),
  new MessagesPlaceholder("chat_history"),
  ("human", "{input}"),
  new MessagesPlaceholder("agent_scratchpad"),
]);

const searchTool = new TavilySearchResults();
const tools = [searchTool];
const agent = await createOpenAIFunctionsAgent({
  llm: model,
  prompt,
  tools,
});
const agentExecutor = new AgentExecutor({ agent, tools });

const chathistory = [];

const langChain = async (userMessage) => {
  const directoryLoader = new UnstructuredDirectoryLoader("./public", {});
  const directoryDocs = await directoryLoader.load();
  console.log("directoryDocs.length: ", directoryDocs.length);
  console.log(directoryDocs[0]);

  const response = await agentExecutor.invoke({
    input: userMessage,
    chat_history: chathistory,
  });

  chathistory.push(new HumanMessage(userMessage));
  chathistory.push(new AIMessage(response.output));

  return response.output;
};

export default langChain;
