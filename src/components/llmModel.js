import { ChatOpenAI } from "@langchain/openai";

const llmModel = async (message, file, history) => {
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
