import React from 'react';

const Header = () => {
  return (
    <header className="gradient-bg text-white p-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 animate-pulse-slow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
            CDP Support Agent Chatbot
          </span>
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          {['Segment', 'mParticle', 'Lytics', 'Zeotap'].map((platform) => (
            <span 
              key={platform}
              className="px-3 py-2 glass-effect rounded-full text-sm font-medium transition-all duration-300 hover:shadow-glow transform hover:scale-105"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;