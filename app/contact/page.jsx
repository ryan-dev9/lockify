"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Github, Send, MessageSquare, Clock, Users, CheckCircle } from 'lucide-react';
import Navbarx from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields', { theme: 'dark' });
      return;
    }
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.', { theme: 'dark' });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      details: "ryandeveloper97@gmail.com",
      description: "Get help with your account and technical issues"
    },
    {
      icon: Instagram,
      title: "Insta Support",
      details: "https://instagram.com/ryan_dev97",
      description: "Available Monday-Friday, 9AM-6PM EST"
    },
    {
      icon: Github,
      title: "Github",
      details: "https://github.com/ryan-dev9",
      description: "Visit our GitHub repository for more information"
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Accounts' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'security', label: 'Security Concerns' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const faqs = [
    {
      question: "How secure is Lockify?",
      answer: "Lockify uses military-grade AES-256 encryption and zero-knowledge architecture to ensure your data is completely secure."
    },
    {
      question: "Can I import passwords from other managers?",
      answer: "Yes, we support importing from all major password managers including LastPass, 1Password, Bitwarden, and more."
    },
    {
      question: "Is there a family plan available?",
      answer: "Yes, our family plan supports up to 6 members with shared vaults and individual accounts for each family member."
    },
    {
      question: "What happens if I forget my master password?",
      answer: "Due to our zero-knowledge architecture, we cannot recover your master password. However, we offer emergency access features."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <Navbarx />
      <ToastContainer />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="flex justify-center items-center mb-6"
              variants={fadeInUp}
            >
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mr-3 sm:mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h1>
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white mb-6"
              variants={fadeInUp}
            >
              We're Here to
              <span className="block text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                Help You
              </span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
              variants={fadeInUp}
            >
              Have questions about Lockify? Need technical support? Want to learn more about our enterprise solutions?
              Our dedicated team is ready to assist you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Get in <span className="text-blue-600">Touch</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Multiple ways to reach our support team. We're committed to providing excellent customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group hover:border-blue-200 dark:hover:border-blue-800"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {info.title}
                    </h3>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {info.details}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {info.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
                Send us a <span className="text-blue-600">Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                  >
                    {supportCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-vertical"
                    placeholder="Please provide details about your inquiry..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
                    }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Additional Info & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-3xl text-white">
                <h3 className="text-2xl font-bold mb-6">Why Contact Lockify?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Expert Support Team</h4>
                      <p className="text-white/90">Our security experts are here to help with any questions or concerns.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Quick Response Time</h4>
                      <p className="text-white/90">We typically respond to inquiries within 2-4 hours during business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Personalized Solutions</h4>
                      <p className="text-white/90">We provide tailored solutions based on your specific needs and requirements.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Frequently Asked Questions</h3>
                <div className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
