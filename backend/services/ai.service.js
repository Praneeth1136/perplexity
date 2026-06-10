import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash-lite',
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAI() {
  try {
    const response = await model.invoke('what is the capital of india?');
    console.log(response.text);
  } catch (error) {
    console.warn('AI test failed:', error?.message || error);
  }
}
