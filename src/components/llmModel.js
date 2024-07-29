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
  if (fileType === "text/plain") {
    const txtLoader = new TextLoader(file);
    const docs = await txtLoader.load();
  } else if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docxLoader = new DocxLoader(file);
    const docs = await docxLoader.load();
  } else if (fileType === "") {
    const loader = new CSVLoader(file);
    const docs = await loader.load();
  }

  const response = await model.invoke(message);
  return response.content;
};

export default llmModel;
