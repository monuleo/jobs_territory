import { motion } from 'framer-motion';

const ClientLogos = () => {
  const clients = [
    { name: 'Zepto', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { name: 'CureFoods', color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Flipkart', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Myntra', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { name: 'PagarBook', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'Swiggy', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { name: 'Zomato', color: 'text-red-600', bgColor: 'bg-red-50' },
    { name: 'PhonePe', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { name: 'Paytm', color: 'text-blue-700', bgColor: 'bg-blue-50' },
    { name: 'BYJU\'S', color: 'text-purple-700', bgColor: 'bg-purple-50' },
    { name: 'Unacademy', color: 'text-green-700', bgColor: 'bg-green-50' },
    { name: 'Razorpay', color: 'text-blue-800', bgColor: 'bg-blue-50' },
  ];

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've helped hundreds of companies across India find their perfect talent match
          </p>
        </motion.div>

        {/* Animated Logo Carousel */}
        <div className="relative">
          <motion.div
            animate={{ x: ['0%', -50 * clients.length + '%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex space-x-12 items-center"
            style={{ width: `${duplicatedClients.length * 200}px` }}
          >
            {duplicatedClients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`flex-shrink-0 w-48 h-24 ${client.bgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-100 hover:border-gray-200`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold ${client.color} group-hover:scale-110 transition-transform duration-300`}>
                    {client.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Trusted Partner
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: '500+', label: 'Companies Served' },
            { number: '10K+', label: 'Successful Placements' },
            { number: '95%', label: 'Client Retention' },
            { number: '48hrs', label: 'Average Response' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2 group-hover:text-accent-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;