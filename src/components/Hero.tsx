import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ArrowRight, Users, TrendingUp, Award, Target } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Transform Your Hiring Process',
      subtitle: 'Connect with top talent across India through our innovative recruitment solutions',
      stats: { number: '500+', label: 'Successful Placements' }
    },
    {
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Executive Search Excellence',
      subtitle: 'Find C-Suite leaders who drive business transformation and growth',
      stats: { number: '95%', label: 'Client Satisfaction' }
    },
    {
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Recruitment as a Service',
      subtitle: 'Dedicated recruiters tailored to your business needs and culture',
      stats: { number: '30+', label: 'Industries Served' }
    },
    {
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Pay Per Hire Success',
      subtitle: 'Risk-free hiring with payment only for successful placements',
      stats: { number: '48hrs', label: 'Average Response Time' }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const features = [
    { icon: Users, text: 'Expert Recruiters' },
    { icon: TrendingUp, text: 'Fast Turnaround' },
    { icon: Award, text: 'Quality Assured' },
    { icon: Target, text: 'Perfect Match' }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Main Heading */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100px' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  />
                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">
                      {slides[currentSlide].stats.number}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {slides[currentSlide].stats.label}
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
                    >
                      <feature.icon size={16} className="text-accent-400" />
                      <span className="text-white text-sm font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-r from-primary-600 to-accent-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Hire Now</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Play size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Watch Demo</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={20} />
          </motion.button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium rotate-90 origin-center">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;