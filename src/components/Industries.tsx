import { motion } from 'framer-motion';
import { 
  Code, 
  ShoppingCart, 
  Settings, 
  Heart, 
  CreditCard, 
  Camera, 
  Home, 
  Truck,
  Zap,
  Briefcase,
  Users,
  TrendingUp
} from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      icon: Code,
      title: 'Technology & Startups',
      description: 'Software engineers, product managers, data scientists, and tech leadership roles',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      stats: '2000+ placements'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce & Retail',
      description: 'Digital marketing, operations, supply chain, and customer experience professionals',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      stats: '1500+ placements'
    },
    {
      icon: Settings,
      title: 'Manufacturing & Engineering',
      description: 'Mechanical, electrical, industrial engineers, and production management roles',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      stats: '1200+ placements'
    },
    {
      icon: Heart,
      title: 'Healthcare & Life Sciences',
      description: 'Medical professionals, pharmaceutical, biotech, and healthcare administration',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      stats: '800+ placements'
    },
    {
      icon: CreditCard,
      title: 'BFSI',
      description: 'Banking, financial services, insurance, fintech, and investment professionals',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      stats: '1000+ placements'
    },
    {
      icon: Camera,
      title: 'Media & Entertainment',
      description: 'Content creators, digital marketing, production, and creative professionals',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      stats: '600+ placements'
    },
    {
      icon: Home,
      title: 'Real Estate',
      description: 'Property development, sales, marketing, and real estate investment professionals',
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50',
      stats: '500+ placements'
    },
    {
      icon: Truck,
      title: 'Logistics & Supply Chain',
      description: 'Operations, warehouse management, transportation, and supply chain optimization',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      stats: '700+ placements'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="industries" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
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
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From startups to Fortune 500 companies, we have deep expertise across diverse industries and understand their unique talent requirements
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <industry.icon size={28} className="text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {industry.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
                  {industry.description}
                </p>

                {/* Stats */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${industry.color} text-white shadow-md`}>
                  {industry.stats}
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 w-8 h-8 border-2 border-gray-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 border border-white rounded-full" />
            <div className="absolute top-16 right-16 w-24 h-24 border border-white rounded-full" />
            <div className="absolute bottom-8 left-1/3 w-16 h-16 border border-white rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { icon: Briefcase, number: '8+', label: 'Industries Served', color: 'text-yellow-300' },
                { icon: Users, number: '7000+', label: 'Total Placements', color: 'text-green-300' },
                { icon: TrendingUp, number: '95%', label: 'Success Rate', color: 'text-blue-300' },
                { icon: Zap, number: '24hrs', label: 'Response Time', color: 'text-pink-300' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 ${stat.color} mx-auto mb-4 flex items-center justify-center`}
                  >
                    <stat.icon size={32} />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-white/90 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <h3 className="text-2xl font-bold mb-4">
                Don't See Your Industry?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                We're constantly expanding our expertise. Let's discuss how we can help you find the right talent for your specific industry needs.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Contact Us</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;