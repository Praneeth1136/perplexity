import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {ChatMistralAI} from "@langchain/mistralai";
import {HumanMessage,SystemMessage,AIMessage,tool, createAgent} from "langchain"
import { z } from "zod";
import { searchInternet } from './internet.service.js';



const geminiModel = new ChatGoogleGenerativeAI({
  model: 'gemini-3.1-flash-lite',
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model:"mistral-small-latest",
  apikey: process.env.MISTRAL_API_KEY,
})

const searchInternetTool = tool(
  searchInternet,
  {
    name:"searchInternet", 
    description:"Search the internet for current information",
    schema:z.object({
      query:z.string().describe("Search query for the internet")
    })
  }
)


const agent = createAgent({
  model:geminiModel,
  tools:[searchInternetTool],
  
})


export async function generateResponse(messages){
  const response  = await agent.invoke({
    messages:[
      new SystemMessage(`You are a helpful assistant. Search the internet for current information using the searchInternet tool when needed. 
      
      If you don't find the answer in the search results, respond with your own knowledge
      `),
    ...messages.map(msg => {
    if(msg.role === "user"){
      return new HumanMessage(msg.content)
    }else{
      return new AIMessage(msg.content)
    }
  })
  ]
  }
  );

  return response.messages[response.messages.length-1].text;
}


export async function generateChatTitle(message){
    const response = await mistralModel.invoke([
      new SystemMessage(`You are an AI assistant specialized in creating concise, meaningful titles for user conversations.

### Your Task
Analyze the user's first message and generate a title that accurately reflects the main topic, question, or intent.

### Title Generation Guidelines

1. **Length**: Keep the title short — 2 to 7 words maximum.

2. **Clarity**: The title should be clear and easy to understand at a glance.

3. **Relevance**: It must accurately represent the core subject of the conversation.

4. **Style**:
   - Use natural, conversational language.
   - Do NOT use ALL CAPS, excessive punctuation, or emojis.
   - Avoid generic phrases like "Chat," "Conversation," or "Query."
   - Do NOT add quotation marks or special formatting.

5. **Focus**: If the user asks a question, the title should reflect the question. If they state a topic, the title should reflect the topic.

### Examples

**Good Titles:**
- "How to bake sourdough bread"
- "Python vs JavaScript for web development"
- "Planning a trip to Japan"
- "Understanding quantum computing basics"
- "Best practices for remote teams"

**Bad Titles:**
- "Question about baking"
- "PYTHON VS JAVASCRIPT"
- "Trip to Japan"
- "Quantum computing"
- "Remote work chat"

### Output Format
Return ONLY the title text. Do not include any additional explanation, labels, or metadata.
        `),
      
      new HumanMessage(message)

      
    ]);
    return response.text;
}