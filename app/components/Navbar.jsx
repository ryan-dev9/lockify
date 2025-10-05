"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import Authenticator from "../../auth";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";


const Navbarx = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl fixed top-0 left-0 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-15">

                    {/* Mobile menu button and logo */}
                    <div className="flex items-center gap-3 md:gap-4">

                        {/* Mobile hamburger menu */}
                        <button
                            className="md:hidden flex flex-col gap-1 p-2 group"
                            aria-label="Toggle menu"
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1">
                            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-500" />
                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl sm:text-2xl md:text-4xl font-bold text-transparent">
                                Lockify
                            </span>
                        </Link>
                    </div>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 font-medium"
                            >
                                <span className="z-10 text-xl relative">{link.name}</span>
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        ))}
                        <ThemeToggleButton />
                        <Authenticator />
                    </div>

                    {/* Mobile User Section */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggleButton />
                        {session?.user?.image && (
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Authentication */}
                            <motion.div
                                className="pt-4 border-t border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                            >
                                <div className="px-4">
                                    <Authenticator />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbarx;