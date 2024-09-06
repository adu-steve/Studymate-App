import { ChatOpenAI } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

// Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the user's question from the following context: 
    {context}
    Question: {input}
    `
);

const urlLangchain = async (url, promptValue) => {
  try {
    // Ensure the URL is a valid string
    if (typeof url !== "string" || !url.startsWith("http")) {
      throw new Error("Invalid URL format. Please provide a valid URL.");
    }

    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt,
    });

    // Use Cheerio to scrape content from webpage and create documents
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();

    // Text Splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 20,
    });
    const splitDocs = await splitter.splitDocuments(docs);
    //console.log(splitDocs);

    // Instantiate Embeddings function
    const embeddings = new OpenAIEmbeddings();

    // Create Vector Store
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    // Create a retriever from vector store
    const retriever = vectorstore.asRetriever({ k: 2 });

    // Create a retrieval chain
    const retrievalChain = await createRetrievalChain({
      combineDocsChain: chain,
      retriever,
    });

    const response = await retrievalChain.invoke({
      input: promptValue,
    });

    return response.answer;
  } catch (error) {
    console.error("Error in processing URL:", error.message);
    throw error;
  }
};

export default urlLangchain;
