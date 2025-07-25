import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Jobs Territory transformed our hiring process completely. Their RAAS model provided us with dedicated recruiters who understood our culture and technical requirements perfectly. The quality of candidates and speed of delivery exceeded all our expectations.",
      author: "Priya Sharma",
      position: "Head of Talent Acquisition",
      company: "TechVision Solutions",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 5,
      results: "Reduced hiring time by 60%"
    },
    {
      quote: "The Pay Per Hire model was perfect for our startup phase. We got access to top-tier talent without the financial risk of traditional recruitment agencies. Jobs Territory's team became an extension of our HR department.",
      author: "Rajesh Kumar",
      position: "Founder & CEO",
      company: "InnovateLabs",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 5,
      results: "Saved 40% on recruitment costs"
    },
    {
      quote: "Their C-Suite hiring expertise is unmatched. They found us the perfect CTO who has been instrumental in scaling our technology infrastructure. The confidential and professional approach was exactly what we needed.",
      author: "Anita Desai",
      position: "Board Member",
      company: "GrowthTech Enterprises",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 5,
      results: "Filled C-Suite role in 3 weeks"
    },
    {
      quote: "Working with Jobs Territory has been a game-changer for our manufacturing division. They understand the technical nuances of engineering roles and consistently deliver candidates who are not just qualified but are the right cultural fit.",
      author: "Vikram Singh",
      position: "VP of Operations",
      company: "Maxvolt Industries",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 5,
      results: "98% candidate retention rate"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"
          />
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say about their experience with Jobs Territory
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="lg:flex">
                {/* Content Side */}
                <div className="lg:w-2/3 p-8 lg:p-12 relative">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Quote size={28} className="text-white" />
                  </motion.div>

                  <div className="pt-16">
                    {/* Stars */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex space-x-1 mb-6"
                    >
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <Star size={20} className="text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-medium"
                    >
                      "{testimonials[currentTestimonial].quote}"
                    </motion.blockquote>

                    {/* Author Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {testimonials[currentTestimonial].author}
                        </h4>
                        <p className="text-gray-600 mb-1">
                          {testimonials[currentTestimonial].position}
                        </p>
                        <p className="text-primary-600 font-semibold">
                          {testimonials[currentTestimonial].company}
                        </p>
                      </div>

                      {/* Results Badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                      >
                        {testimonials[currentTestimonial].results}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-8 right-8 w-12 h-12 border-2 border-primary-200 rounded-full opacity-30"
                  />
                </div>

                {/* Image Side */}
                <div className="lg:w-1/3 relative">
                  <div className="h-64 lg:h-full relative overflow-hidden">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].author}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 to-transparent" />
                    
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30"
                    >
                      <Play size={24} className="text-white" />
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-6 left-6 w-8 h-8 bg-accent-500/30 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-primary-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                "{testimonial.quote.substring(0, 120)}..."
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;