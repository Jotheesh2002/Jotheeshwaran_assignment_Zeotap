import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';

// Create a vector store from documents
export async function createVectorStore(documents) {
  try {
    console.log('Creating vector store...');
    
    // Initialize OpenAI embeddings
    const embeddings = new OpenAIEmbeddings();
    
    // Create HNSW vector store from documents
    const vectorStore = await HNSWLib.fromDocuments(documents, embeddings);
    
    console.log('Vector store created successfully');
    return vectorStore;
  } catch (error) {
    console.error('Error creating vector store:', error);
    throw error;
  }
}