import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Header from './components/Header';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add a welcome message when the component mounts
  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        content: 'Hello! I\'m your CDP Support Agent. I can help you with questions about Segment, mParticle, Lytics, and Zeotap. How can I assist you today?'
      }
    ]);
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { message });
      
      // Add bot response to chat
      setMessages(prev => [...prev, { type: 'bot', content: response.data.answer }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error processing your request. Please try again later.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-blue-50 font-poppins">
      <Header />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="container mx-auto max-w-4xl">
          {messages.map((msg, index) => (
            <div key={index} className="mb-6">
              <ChatMessage message={msg} />
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center p-4">
              <div className="typing-dots">
                <div className="typing-dot w-3 h-3 bg-primary-500 rounded-full mx-1"></div>
                <div className="typing-dot w-3 h-3 bg-primary-500 rounded-full mx-1"></div>
                <div className="typing-dot w-3 h-3 bg-primary-500 rounded-full mx-1"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 bg-white shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;