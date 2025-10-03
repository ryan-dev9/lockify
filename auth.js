'use client'
import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Component() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ Outside click handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (session) {
    return (
      <div className="relative" ref={menuRef}>
        {/* Profile image button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full mt-1 overflow-hidden cursor-pointer border-2 border-gray-300"
        >
          <Image
            src={session.user.image}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>

        {/* Animated Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-56 rounded-xl border bg-white dark:bg-black shadow-lg p-4"
            >
              {/* User image + name */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={session.user.image}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
                <span className="font-semibold text-lg">{session.user.name}</span>
              </div>

              {/* Logout button */}
              <button
                onClick={() => signOut()}
                className="w-full bg-red-500 hover:bg-red-600 cursor-pointer py-2 rounded-lg font-medium"
              >
                Log out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Agar user login nahi hai
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 font-semibold text-white text-lg px-4 rounded-full hover:bg-blue-700 transition-colors duration-200"
    >
      Sign in
    </button>
  );
}
