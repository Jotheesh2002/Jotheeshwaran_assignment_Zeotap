# CDP Support Agent Chatbot

A chatbot that can answer "how-to" questions related to four Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. The chatbot extracts relevant information from the official documentation of these CDPs to guide users on how to perform tasks or achieve specific outcomes within each platform.

## Features

- Answer "How-to" Questions about CDPs
- Extract Information from Documentation
- Handle Variations in Questions
- Cross-CDP Comparisons
- Advanced "How-to" Questions

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- NLP: LangChain, OpenAI
- Document Processing: Cheerio for web scraping

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the application: `npm start`

## How It Works

1. The application scrapes documentation from the official CDP websites
2. Documents are processed, chunked, and stored in a vector database
3. When a user asks a question, the system:
   - Retrieves relevant documentation chunks
   - Uses LangChain and OpenAI to generate an accurate response
   - Returns the answer to the user

## Project Structure

- `/src` - React frontend
- `/server` - Node.js backend
  - `index.js` - Express server
  - `chatbot.js` - Main chatbot logic
  - `documentLoader.js` - Loads documentation from websites
  - `vectorStore.js` - Creates and manages the vector database