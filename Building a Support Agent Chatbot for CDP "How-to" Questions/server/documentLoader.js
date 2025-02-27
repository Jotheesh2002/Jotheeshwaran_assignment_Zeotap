import { CheerioWebBaseLoader } from 'langchain-community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

// Define the documentation URLs for each CDP
const documentationUrls = {
  segment: [
    'https://segment.com/docs/connections/sources/',
    'https://segment.com/docs/connections/destinations/',
    'https://segment.com/docs/connections/spec/',
    'https://segment.com/docs/connections/destinations/catalog/',
    'https://segment.com/docs/connections/sources/catalog/',
  ],
  mparticle: [
    'https://docs.mparticle.com/guides/',
    'https://docs.mparticle.com/developers/',
    'https://docs.mparticle.com/integrations/',
  ],
  lytics: [
    'https://docs.lytics.com/docs/introduction',
    'https://docs.lytics.com/docs/audiences',
    'https://docs.lytics.com/docs/campaigns',
    'https://docs.lytics.com/docs/content-recommendations',
  ],
  zeotap: [
    'https://docs.zeotap.com/home/en-us/getting-started',
    'https://docs.zeotap.com/home/en-us/data-ingestion',
    'https://docs.zeotap.com/home/en-us/audience-builder',
    'https://docs.zeotap.com/home/en-us/activation',
  ],
};

// Function to load documents from URLs
export async function loadDocuments() {
  try {
    console.log('Loading documents from documentation URLs...');
    
    const allDocuments = [];
    
    // For each CDP, load documents from their URLs
    for (const [cdp, urls] of Object.entries(documentationUrls)) {
      console.log(`Loading documents for ${cdp}...`);
      
      for (const url of urls) {
        try {
          console.log(`Loading from URL: ${url}`);
          
          // Use Cheerio loader to load the web page
          const loader = new CheerioWebBaseLoader(url);
          const docs = await loader.load();
          
          // Add metadata to identify the CDP
          const docsWithMetadata = docs.map(doc => ({
            ...doc,
            metadata: {
              ...doc.metadata,
              cdp,
              source: url,
            },
          }));
          
          allDocuments.push(...docsWithMetadata);
          console.log(`Loaded ${docsWithMetadata.length} documents from ${url}`);
        } catch (error) {
          console.error(`Error loading from URL ${url}:`, error);
          // Continue with other URLs even if one fails
        }
      }
    }
    
    console.log(`Total documents loaded: ${allDocuments.length}`);
    
    // Split documents into smaller chunks for better processing
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    
    const splitDocuments = await textSplitter.splitDocuments(allDocuments);
    console.log(`Split into ${splitDocuments.length} chunks`);
    
    return splitDocuments;
  } catch (error) {
    console.error('Error loading documents:', error);
    throw error;
  }
}