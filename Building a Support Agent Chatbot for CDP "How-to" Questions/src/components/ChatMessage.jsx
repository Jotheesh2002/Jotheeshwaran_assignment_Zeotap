import React, { useEffect, useState } from 'react';

const ChatMessage = ({ message }) => {
  const isBot = message.type === 'bot';
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay before showing the message to create a staggered animation effect
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} ${visible ? 'animate-fadeIn' : 'opacity-0'}`}
      style={{ animationDelay: '150ms' }}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-4 transition-all duration-300 ${
          isBot 
            ? 'bg-white text-gray-800 shadow-md hover:shadow-lg' 
            : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
        }`}
      >
        {message.content.split('\n').map((text, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;