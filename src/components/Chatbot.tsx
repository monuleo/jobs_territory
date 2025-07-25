import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatResponse {
  response: string;
  confidence: number;
  category: string;
  suggestions: string[];
}

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  message: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm the Jobs Territory assistant. I can help you with information about our recruitment services, hiring processes, job opportunities, and more. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const predefinedResponses = {
    "Tell me about RAAS": {
      response: "**Recruitment as a Service (RAAS)**\n\nRaaS: Recruitment as a Service offers a flat subscription fee for access to dedicated recruiters. It allows hiring unlimited candidates according to your business needs. This model is scalable and cost-effective for continuous hiring.\n\n✅ Dedicated recruitment team\n✅ Unlimited hiring capacity\n✅ Scalable solution\n✅ Cost-effective for continuous hiring",
      showHireButton: true
    },
    "What is Pay Per Hire": {
      response: "**Pay Per Hire Model**\n\nPay Per Hire: You pay only when a candidate is successfully hired, with no upfront fees. This reduces your recruitment risk and controls hiring costs. It's ideal for businesses needing flexible hiring without long-term commitments.\n\n✅ No upfront fees\n✅ Pay only for successful hires\n✅ Reduced recruitment risk\n✅ Flexible hiring solution",
      showHireButton: true
    },
    "What is Fractional Hiring": {
      response: "**Fractional Hiring**\n\nFractional Hiring: Hire specialized experts on a part-time or project basis. This avoids full-time employment costs while accessing needed skills. It is flexible and suited for startups or projects requiring expert support.\n\n✅ Part-time specialized experts\n✅ Avoid full-time employment costs\n✅ Access to needed skills\n✅ Perfect for startups and projects",
      showHireButton: true
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Check if it's a predefined response
    const predefinedResponse = predefinedResponses[inputValue as keyof typeof predefinedResponses];
    if (predefinedResponse) {
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: predefinedResponse.response,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Simulate API call to chatbot backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ChatResponse = await response.json();

      // Simulate typing delay
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I'm having trouble connecting to our servers right now. Please try again in a moment, or contact us directly at hello@jobsterritory.com or +91 98765 43210 for immediate assistance.",
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    "Tell me about RAAS",
    "What is Pay Per Hire",
    "What is Fractional Hiring"
  ];

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => sendMessage(), 100);
  };

  const handleHireNow = () => {
    setShowApplicationForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Add a confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: "Thank you for your interest! We've received your application and our team will contact you within 24 hours.",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmationMessage]);
    
    // Reset form and close
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      message: ''
    });
    setShowApplicationForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderMessageContent = (message: Message) => {
    const lines = message.text.split('\n');
    const hasHireButton = message.sender === 'bot' && 
      (message.text.includes('Recruitment as a Service') || 
       message.text.includes('Pay Per Hire') || 
       message.text.includes('Fractional Hiring'));

    return (
      <div>
        {lines.map((line, index) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <div key={index} className="font-bold text-primary-600 mb-2">{line.slice(2, -2)}</div>;
          }
          if (line.startsWith('✅')) {
            return <div key={index} className="text-green-600 text-sm mb-1">{line}</div>;
          }
          return line ? <div key={index} className="mb-1">{line}</div> : <div key={index} className="mb-2" />;
        })}
        {hasHireButton && (
          <button
            onClick={handleHireNow}
            className="mt-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200"
          >
            Hire Now
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Jobs Territory Assistant</h3>
                    <p className="text-sm opacity-90">Ask me anything about our services</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-white border-2 border-gray-200 text-primary-600'
                      }`}>
                        {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-br-md'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                      }`}>
                        <div className="text-sm leading-relaxed">
                          {renderMessageContent(message)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-primary-600 flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Actions */}
                {messages.length === 1 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-gray-500 text-center">Quick actions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action)}
                          className="text-left p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Application Form Modal */}
            {showApplicationForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowApplicationForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Hire Now - Application Form</h3>
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position/Role to Hire For *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Tell us more about your hiring needs..."
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;