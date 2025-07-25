import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, ChevronDown, ChevronUp } from 'lucide-react';

const CaseStudies = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      company: 'Zepto',
      industry: 'E-commerce & Quick Commerce',
      challenge: 'Rapid scaling required 200+ tech professionals within 3 months for their expansion across 10 cities',
      solution: 'Deployed dedicated RAAS team with specialized tech recruiters and streamlined interview processes',
      results: [
        { metric: '220+', label: 'Positions Filled' },
        { metric: '45 days', label: 'Average Time to Hire' },
        { metric: '95%', label: 'Retention Rate' },
        { metric: '100%', label: 'Client Satisfaction' }
      ],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      testimonial: "Jobs Territory's RAAS model was instrumental in our rapid expansion. Their understanding of our culture and technical requirements was exceptional.",
      author: 'Head of Talent Acquisition',
      color: 'from-green-500 to-emerald-600'
    },
    {
      company: 'Maxvolt Industries',
      industry: 'Manufacturing & Engineering',
      challenge: 'Needed specialized engineers and C-suite executives for their renewable energy division launch',
      solution: 'Combined C-Suite hiring expertise with technical recruitment for engineering roles across multiple locations',
      results: [
        { metric: '15+', label: 'Senior Hires' },
        { metric: '30 days', label: 'C-Suite Placement' },
        { metric: '100%', label: 'Success Rate' },
        { metric: '6 months', label: 'Project Timeline' }
      ],
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      testimonial: "The quality of candidates and speed of delivery exceeded our expectations. Jobs Territory truly understands executive search.",
      author: 'CEO',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      company: 'FinTech Startup',
      industry: 'Financial Technology',
      challenge: 'Bootstrap startup needed cost-effective hiring solution for building their core development team',
      solution: 'Implemented Pay Per Hire model with milestone-based recruitment for critical technical positions',
      results: [
        { metric: '25+', label: 'Tech Hires' },
        { metric: '60%', label: 'Cost Savings' },
        { metric: '21 days', label: 'Average Hiring' },
        { metric: '90%', label: 'Offer Acceptance' }
      ],
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      testimonial: "Pay Per Hire model was perfect for our startup. We got quality talent without the financial risk of traditional recruitment.",
      author: 'Founder & CTO',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real results from real companies. See how we've helped organizations transform their hiring process
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
                <div className="lg:flex">
                  {/* Image Section */}
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.company}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${study.color} opacity-80`} />
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Company Info Overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-2">{study.company}</h3>
                      <p className="text-white/90 font-medium">{study.industry}</p>
                    </div>

                    {/* Floating Stats */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30"
                    >
                      <Award size={24} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 p-8">
                    <div className="space-y-6">
                      {/* Challenge */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                          Challenge
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          Solution
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                      </div>

                      {/* Results Grid */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                          Results
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {study.results.map((result, resultIndex) => (
                            <motion.div
                              key={result.label}
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              transition={{ delay: resultIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                            >
                              <div className="text-2xl font-bold text-white mb-1">
                                {result.metric}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {result.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Expandable Testimonial */}
                      <motion.div
                        initial={false}
                        className="border-t border-white/10 pt-6"
                      >
                        <motion.button
                          onClick={() => setExpandedCase(expandedCase === index ? null : index)}
                          className="flex items-center justify-between w-full text-left"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-white font-semibold">Client Testimonial</span>
                          {expandedCase === index ? (
                            <ChevronUp className="text-gray-400" size={20} />
                          ) : (
                            <ChevronDown className="text-gray-400" size={20} />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {expandedCase === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4">
                                <blockquote className="text-gray-300 italic mb-4 leading-relaxed">
                                  "{study.testimonial}"
                                </blockquote>
                                <div className="text-gray-400 text-sm">
                                  — {study.author}, {study.company}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of companies who have transformed their hiring process with Jobs Territory
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-600 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;