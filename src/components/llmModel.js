import { ChatOpenAI } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

const llmModel = async (message, file, fileType, history) => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    verbose: true,
  });

  const response = await model.invoke(message);
  return response.content;
};

export default llmModel;
