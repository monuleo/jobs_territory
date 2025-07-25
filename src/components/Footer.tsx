import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ArrowRight,
  Clock,
  Award,
  Users
} from 'lucide-react';

const Footer = () => {
  const services = [
    'Recruitment as a Service (RAAS)',
    'Pay Per Hire',
    'C-Suite Hiring',
    'Executive Search',
    'Technical Recruitment',
    'Bulk Hiring'
  ];

  const industries = [
    'Technology & Startups',
    'E-commerce & Retail',
    'Manufacturing',
    'Healthcare',
    'BFSI',
    'Media & Entertainment'
  ];

  const quickLinks = [
    'About Us',
    'Our Process',
    'Success Stories',
    'Career Opportunities',
    'Privacy Policy',
    'Terms of Service'
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Facebook, href: '#', color: 'hover:text-blue-700' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border border-white rounded-full" />
        <div className="absolute top-32 right-32 w-48 h-48 border border-white rounded-full" />
        <div className="absolute bottom-16 left-1/3 w-32 h-32 border border-white rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">JT</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Jobs Territory</h3>
                    <p className="text-gray-400 text-sm">Leading Recruitment Agency</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Transforming the way companies hire across India. We connect exceptional talent with outstanding opportunities through innovative recruitment solutions.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: Users, number: '10K+', label: 'Placements' },
                    { icon: Award, number: '95%', label: 'Success Rate' },
                    { icon: Clock, number: '48hrs', label: 'Response Time' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <stat.icon size={20} className="text-primary-400" />
                      </div>
                      <div className="text-xl font-bold text-white">{stat.number}</div>
                      <div className="text-gray-400 text-xs">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/20`}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <motion.li
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href="#"
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                      >
                        <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:translate-x-2 transition-transform duration-200">
                          {service}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Industries */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white">Industries</h4>
                <ul className="space-y-3">
                  {industries.map((industry, index) => (
                    <motion.li
                      key={industry}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href="#"
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                      >
                        <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:translate-x-2 transition-transform duration-200">
                          {industry}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact & Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-all duration-200"
                    >
                      <Phone size={18} />
                      <span>+91 98765 43210</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-all duration-200"
                    >
                      <Mail size={18} />
                      <span>hello@jobsterritory.com</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-3 text-gray-400 hover:text-primary-400 transition-all duration-200"
                    >
                      <MapPin size={18} className="mt-1 flex-shrink-0" />
                      <span>Mumbai, Delhi, Bangalore<br />Pune, Hyderabad</span>
                    </motion.div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                  <ul className="space-y-2">
                    {quickLinks.slice(0, 4).map((link, index) => (
                      <motion.li
                        key={link}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <a
                          href="#"
                          className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700"
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Stay Updated with Industry Insights
                </h4>
                <p className="text-gray-400">
                  Get the latest recruitment trends and hiring tips delivered to your inbox
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary-600 to-accent-500 px-6 py-3 rounded-r-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
              <div className="mb-4 md:mb-0">
                © 2024 Jobs Territory. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;