import { useState } from 'react';
import { Leaf, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowRight, Clock, Shield, CreditCard, Smartphone, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface NewsletterState {
  email: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function Footer() {
  const [newsletter, setNewsletter] = useState<NewsletterState>({
    email: '',
    status: 'idle',
    message: ''
  });

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletter(prev => ({ ...prev, status: 'loading' }));
    
    // Simulating API call
    setTimeout(() => {
      if (newsletter.email.includes('@')) {
        setNewsletter({
          email: '',
          status: 'success',
          message: 'Thank you for subscribing! Check your email for confirmation.'
        });
      } else {
        setNewsletter(prev => ({
          ...prev,
          status: 'error',
          message: 'Please enter a valid email address.'
        }));
      }
    }, 1000);
  };

  const features = [
    { icon: Clock, title: '24/7 Support', description: 'Always here to help' },
    { icon: Shield, title: 'Secure Ordering', description: 'SSL encrypted checkout' },
    { icon: CreditCard, title: 'Easy Payment', description: 'All major cards accepted' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ];

  const footerLinks = [
    {
      title: "About Us",
      links: [
        { name: "Our Story", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        {/* Top Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-800 hover:to-gray-800 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 py-12">
          {/* Brand Section */}
          <div className="space-y-6 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-2.5 rounded-full">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                FreshKing
              </span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Committed to delivering fresh, healthy meals that nourish your body and delight your taste buds. 
              Join us in our mission for a healthier tomorrow.
            </p>

            {/* Investors Button - Moved here */}
            <motion.button
              onClick={() => navigate('/investors')}
              className="relative group px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold 
                        hover:from-green-500 hover:to-green-700 transition-all duration-300
                        shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
              whileHover={{ 
                scale: 1.05,
                y: -5,
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 
                          transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
              />
              <div className="flex items-center space-x-2 relative z-10">
                <TrendingUp className="w-5 h-5 transform transition-transform group-hover:scale-110 
                                    group-hover:rotate-12" />
                <span>Investors</span>
                <div className="absolute -right-1 -top-1 w-2 h-2 bg-yellow-400 rounded-full 
                              animate-ping" />
              </div>
            </motion.button>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`text-gray-400 ${social.color} transition-colors duration-300`}
                  onHoverStart={() => setHoveredLink(social.name)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <social.icon className="w-6 h-6" />
                  <AnimatePresence>
                    {hoveredLink === social.name && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute mt-2 text-xs bg-gray-800 px-2 py-1 rounded"
                      >
                        {social.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>

            {/* Mobile App Download */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-white">Get our mobile app</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-black rounded-lg hover:bg-gray-900 transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                    <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.5 1.3-.82 2.6-2.53 4.08M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">Download on the</div>
                    <div className="text-xs font-semibold">App Store</div>
                  </div>
                </motion.a>
                
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-black rounded-lg hover:bg-gray-900 transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                    <path fill="currentColor" d="M3.609 1.814L13.792 12l-10.183 10.186L3.609 12zm15.183 0L8.609 12l10.183 10.186L18.792 12zM3.609 1.814L13.792 12 8.609 22.186zm15.183 0L8.609 12l5.183 10.186z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">GET IT ON</div>
                    <div className="text-xs font-semibold">Google Play</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="space-y-6">
            {footerLinks.map((linkGroup) => (
              <div key={linkGroup.title} className="space-y-3">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  {linkGroup.title}
                </h3>
                <ul className="space-y-3">
                  {linkGroup.links.map((link) => (
                    <motion.li key={link.name} whileHover={{ x: 5 }}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white flex items-center space-x-2 group transition-colors duration-300"
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <div className="text-gray-400">
                  <p className="font-medium text-white">Main Restaurant</p>
                  <p>123 Fresh Street</p>
                  <p>Hamburg, 20095</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400">
                  <p className="font-medium text-white">Call Us</p>
                  <a href="tel:+49123456789" className="hover:text-white transition-colors">
                    +49 123 456 789
                  </a>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400">
                  <p className="font-medium text-white">Email Us</p>
                  <a href="mailto:hello@freshking.com" className="hover:text-white transition-colors">
                    hello@freshking.com
                  </a>
                </div>
              </motion.li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Join Our Newsletter
            </h3>
            <p className="text-gray-400">
              Get fresh updates about our meals, special offers, health tips, and more!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={newsletter.email}
                  onChange={(e) => setNewsletter(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                />
                <AnimatePresence mode="wait">
                  {newsletter.status === 'loading' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                {newsletter.status !== 'idle' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`text-sm ${
                      newsletter.status === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {newsletter.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={newsletter.status === 'loading'}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
              >
                Subscribe Now
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Terms of Service</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>Mobile App</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
