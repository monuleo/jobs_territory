import { motion } from 'framer-motion';
import { Users, Target, Crown, ArrowRight, CheckCircle, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Users,
      title: 'Recruitment as a Service (RAAS)',
      description: 'Dedicated recruiters tailored to your business needs, culture, and growth objectives.',
      features: [
        'Dedicated recruitment team',
        'Custom hiring processes',
        'Scalable solutions',
        'Industry expertise'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      icon: Target,
      title: 'Pay Per Hire',
      description: 'Pay only for successful hires with no long-term commitment. Risk-free recruitment solution.',
      features: [
        'No upfront costs',
        'Pay only for results',
        'Flexible engagement',
        'Quality guarantee'
      ],
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      icon: Crown,
      title: 'C-Suite Hiring',
      description: 'Executive search and placement for top-tier leadership positions across all industries.',
      features: [
        'Executive search expertise',
        'Leadership assessment',
        'Confidential process',
        'Global network access'
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive recruitment solutions designed to meet your unique hiring needs and drive business growth
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute top-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30"
                >
                  <service.icon size={32} className="text-white" />
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-6 right-8 w-6 h-6 bg-white/30 rounded-full"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group/btn w-full bg-gradient-to-r ${service.color} text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <span>Learn More</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-full blur-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-3xl p-8 text-white relative overflow-hidden">
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
            
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Hiring Process?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Let's discuss how our recruitment solutions can help you find the perfect talent for your organization
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Zap size={20} />
              <span>Get Started Today</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;