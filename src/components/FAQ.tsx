import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Clock, DollarSign, Users, Target, Zap, Shield } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      icon: HelpCircle,
      question: "How does Recruitment as a Service (RAAS) work?",
      answer: "RAAS provides you with dedicated recruiters who become an extension of your team. We assign specialized recruiters based on your industry, company culture, and specific requirements. They work exclusively on your hiring needs, understand your processes, and maintain consistent communication throughout the engagement.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      question: "What is Pay Per Hire and how does pricing work?",
      answer: "Pay Per Hire is a risk-free recruitment model where you only pay when we successfully place a candidate who joins your organization. There are no upfront costs, retainer fees, or monthly charges. You pay a predetermined fee only after the candidate starts working and completes their probation period.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      question: "What types of industries do you serve?",
      answer: "We serve 30+ industries including Technology & Startups, E-commerce & Retail, Manufacturing & Engineering, Healthcare & Life Sciences, BFSI, Media & Entertainment, Real Estate, Logistics, and many more. Our recruiters have specialized expertise in each vertical to understand unique requirements and challenges.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      question: "How fast is your hiring turnaround time?",
      answer: "Our average response time is 24-48 hours for initial candidate profiles. Depending on the role complexity, we typically present qualified candidates within 5-7 days. For senior and C-suite positions, the process may take 2-3 weeks to ensure we find the perfect cultural and technical fit.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      question: "How do you ensure candidate quality and cultural fit?",
      answer: "We use a multi-stage screening process including technical assessments, behavioral interviews, cultural fit evaluation, and reference checks. Our recruiters spend time understanding your company culture, values, and team dynamics to ensure candidates align with your organizational goals.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      question: "How do I get started with Jobs Territory?",
      answer: "Getting started is simple! Contact us through our website or call our team. We'll schedule a consultation to understand your hiring needs, discuss the best service model for you, and create a customized recruitment strategy. We can begin sourcing candidates within 24 hours of agreement.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Shield,
      question: "What guarantees do you provide?",
      answer: "We offer a 90-day replacement guarantee. If a placed candidate leaves within 90 days for any reason (except layoffs or company closure), we'll replace them at no additional cost. We also maintain strict confidentiality and data security protocols throughout the recruitment process.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about our recruitment services and processes
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Question Header */}
                  <motion.button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 bg-gradient-to-br ${faq.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <faq.icon size={24} className="text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      {openFAQ === index ? (
                        <Minus size={24} className="text-primary-600" />
                      ) : (
                        <Plus size={24} className="text-gray-400" />
                      )}
                    </motion.div>
                  </motion.button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-16">
                            <motion.p
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="text-gray-600 leading-relaxed"
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 left-8 w-6 h-6 bg-white/10 rounded-full"
            />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Our recruitment experts are here to help. Get in touch for a personalized consultation about your hiring needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <span>Contact Our Experts</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <span>Schedule a Call</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;