import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { RunnableSequence } from 'langchain/schema/runnable';

// Initialize OpenAI model
const model = new OpenAI({
  temperature: 0.2,
  modelName: 'gpt-3.5-turbo',
});

// Initialize output parser
const outputParser = new StringOutputParser();

// Create a prompt template for answering questions
const promptTemplate = PromptTemplate.fromTemplate(`
You are a helpful support agent for Customer Data Platforms (CDPs) including Segment, mParticle, Lytics, and Zeotap.
Your task is to answer "how-to" questions related to these platforms based on their official documentation.

If the question is not related to these CDPs, politely inform the user that you can only answer questions about Segment, mParticle, Lytics, and Zeotap.

If the question is about comparing different CDPs, provide a balanced comparison based on the information available.

Question: {question}

Answer the question based on your knowledge of CDP platforms. If you don't know the answer, say so - don't make up information.
Provide step-by-step instructions when applicable.
Format your answer in a clear, concise manner.
`);

// Process a user question
export async function processQuestion(question) {
  try {
    // Create a chain to process the question
    const chain = RunnableSequence.from([
      {
        question: () => question,
      },
      promptTemplate,
      model,
      outputParser,
    ]);
    
    // Execute the chain
    const answer = await chain.invoke();
    
    return answer;
  } catch (error) {
    console.error('Error processing question:', error);
    return "I'm sorry, I encountered an error while processing your question. Please try again later.";
  }
}