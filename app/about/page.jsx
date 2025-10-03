"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Globe, Zap, Star, CheckCircle, Eye, KeyRound } from 'lucide-react';
import Navbarx from '../components/Navbar';;

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

const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, type: "spring", stiffness: 100 }
};

const AboutPage = () => {

    const handleClick = () => {
      window.open('/')  
    }

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Encryption",
      description: "Your passwords are protected with AES-256 encryption, the same standard used by governments and banks worldwide."
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Security",
      description: "We never see your passwords. Everything is encrypted locally on your device before being stored."
    },
    {
      icon: Globe,
      title: "Cross-Platform Sync",
      description: "Access your passwords seamlessly across all your devices with real-time synchronization."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant password generation and retrieval with our optimized performance architecture."
    },
    {
      icon: Users,
      title: "Secure Sharing",
      description: "Share passwords safely with team members and family using encrypted sharing protocols."
    },
    {
      icon: Eye,
      title: "Password Health",
      description: "Monitor password strength and get alerts about compromised or weak passwords."
    }
  ];

  const stats = [
    { number: "1M+", label: "Trusted Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "256-bit", label: "Encryption" },
    { number: "24/7", label: "Support" }
  ];

  const benefits = [
    "Never forget a password again",
    "Generate strong, unique passwords",
    "Secure password sharing",
    "Dark web monitoring",
    "Biometric authentication",
    "Emergency access"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <Navbarx />
      
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
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mr-3 sm:mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lockify
                </span>
              </h1>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white mb-6"
              variants={fadeInUp}
            >
              Your Digital Vault for
              <span className="block text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                Ultimate Security
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
              variants={fadeInUp}
            >
              The world's most trusted password manager, protecting over 1 million users worldwide. 
              Experience unparalleled security with military-grade encryption and zero-knowledge architecture.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 px-4"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center min-w-[100px]"
                  variants={scaleIn}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
                Why Choose <span className="text-blue-600">Lockify?</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Built with cutting-edge technology and designed for everyone, from individuals to enterprises.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-8">
                Everything You Need for
                <span className="block text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                  Password Security
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                From password generation to secure sharing, Lockify provides all the tools you need to stay safe online.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 rounded-3xl shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="flex items-center justify-center mb-8">
                    <KeyRound className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    Trusted by Professionals
                  </h3>
                  <div className="flex justify-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/90 text-center mt-4">
                    "Lockify has completely transformed how we manage passwords in our company. 
                    The security features are unmatched."
                  </p>
                  <p className="text-white/70 text-center mt-4 text-sm">
                    - Sarah Johnson, Security Director
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of users who trust Lockify to keep their passwords safe and secure.
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
