import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question about Segment, mParticle, Lytics, or Zeotap..."
        className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all duration-300 font-poppins"
        disabled={disabled}
      />
      <button
        type="submit"
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 btn-hover ${
          disabled 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-glow transform hover:-translate-y-1'
        }`}
        disabled={disabled}
      >
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          Send
        </span>
      </button>
    </form>
  );
};

export default ChatInput;