import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Image as ImageIcon, Paperclip, MoreVertical, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

const AIChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I am HortiSmart AI, your personal agricultural assistant. I can help you with crop disease identification, real-time market prices, and farming best practices. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "🍅 Today's Tomato prices?",
    "🍂 How to treat leaf curl?",
    "🌧️ Weather forecast for farming?",
    "📈 Market trend for onions?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newUserMsg = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: "That's a great question! Based on current market trends and agricultural best practices, I'd recommend checking the Crop Prices dashboard for localized data. Is there anything specific about soil health or pest management you'd like to know?",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative">
      
      {/* Premium Chat Header */}
      <div className="px-8 py-5 bg-gradient-to-r from-[#2e7d32] via-[#388e3c] to-[#1b5e20] text-white flex items-center justify-between shrink-0 shadow-lg z-10 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="flex items-center space-x-4 relative z-10">
          <div className="relative">
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/40 shadow-inner">
              <Bot className="h-7 w-7 text-white drop-shadow-md" />
            </div>
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#1b5e20] animate-pulse"></span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold flex items-center tracking-tight">
              HortiSmart AI <Sparkles className="w-5 h-5 ml-2 text-yellow-300 drop-shadow-md" />
            </h2>
            <p className="text-green-100 text-xs font-medium flex items-center mt-0.5">
              Agricultural Intelligence Agent
            </p>
          </div>
        </div>
        
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all relative z-10">
          <MoreVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-gradient-to-b from-green-50/50 to-white/50">
        
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center mt-4">
            {suggestedPrompts.map((prompt, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-4 py-2 bg-white border border-green-100 rounded-full text-sm font-medium text-green-800 hover:bg-green-50 hover:border-green-300 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex items-end max-w-[85%] md:max-w-[70%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.type === 'user' ? 'bg-gradient-to-br from-gray-800 to-gray-600 ml-3' : 'bg-gradient-to-br from-green-100 to-green-50 border border-green-200 mr-3'
              }`}>
                {msg.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-[#2e7d32]" />}
              </div>

              {/* Message Content */}
              <div className={`group flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`relative px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-br-none' 
                    : 'bg-white border border-green-100/50 text-gray-800 rounded-bl-none shadow-md'
                }`}>
                  <p>{msg.text}</p>
                </div>
                
                {/* Message Actions & Timestamp */}
                <div className={`flex items-center mt-1.5 space-x-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {msg.timestamp}
                  </span>
                  {msg.type === 'ai' && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded"><Copy className="w-3 h-3" /></button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="p-1 text-gray-400 hover:text-red-500 rounded"><ThumbsDown className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex items-end max-w-[80%] flex-row">
              <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-gradient-to-br from-green-100 to-green-50 border border-green-200 mr-3">
                <Bot className="h-4 w-4 text-[#2e7d32]" />
              </div>
              <div className="relative px-5 py-4 rounded-2xl bg-white border border-green-100/50 shadow-md rounded-bl-none flex space-x-1.5 items-center h-[46px]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Chat Input Area */}
      <div className="p-4 md:p-6 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-10">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-[#2e7d32] rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-white p-2 rounded-xl shadow-inner border border-gray-200">
            <button type="button" className="p-2.5 text-gray-400 hover:text-[#2e7d32] hover:bg-green-50 transition-colors rounded-xl">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button type="button" className="p-2.5 text-gray-400 hover:text-[#2e7d32] hover:bg-green-50 transition-colors rounded-xl">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about farming, prices, or diseases..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-3 text-gray-800 placeholder-gray-400 h-10"
            />
            
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
                inputValue.trim() 
                  ? 'bg-gradient-to-r from-[#2e7d32] to-[#388e3c] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
          HortiSmart AI can make mistakes. Please verify important agricultural decisions.
        </p>
      </div>
    </div>
  );
};

export default AIChatbotPage;
