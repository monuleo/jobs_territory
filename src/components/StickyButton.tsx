import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, X, Zap } from 'lucide-react';

const StickyButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactOptions = [
    {
      icon: Phone,
      label: 'Call Now',
      action: () => window.open('tel:+919876543210'),
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600'
    },
    {
      icon: Mail,
      label: 'Email Us',
      action: () => window.open('mailto:hello@jobsterritory.com'),
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => window.open('https://wa.me/919876543210'),
      color: 'from-green-600 to-green-500',
      hoverColor: 'hover:from-green-700 hover:to-green-600'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Contact Options */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 space-y-3"
              >
                {contactOptions.map((option, index) => (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={option.action}
                    className={`flex items-center space-x-3 bg-gradient-to-r ${option.color} ${option.hoverColor} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group`}
                  >
                    <option.icon size={20} />
                    <span className="font-medium whitespace-nowrap">{option.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center group overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Pulse Effect */}
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary-500 rounded-full opacity-20"
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isExpanded ? (
                <X size={24} className="text-white" />
              ) : (
                <div className="flex items-center space-x-1">
                  <Zap size={20} className="text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </div>
              )}
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
            >
              {isExpanded ? 'Close' : 'Hire Now'}
              <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2" />
            </motion.div>
          </motion.button>

          {/* Floating Text */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-12 right-0 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-gray-200"
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Get Started!
              </motion.span>
              <div className="absolute top-full right-4 w-2 h-2 bg-white transform rotate-45 -translate-y-1 border-r border-b border-gray-200" />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default StickyButton;