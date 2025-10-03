// app/components/Manager.jsx
"use client";
import React, { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Navbarx from "./Navbar";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [loadingPasswords, setLoadingPasswords] = useState(true)
  const [passwords, setPasswords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const session = useSession();
  // Fetch saved passwords from MongoDB on first render
  const fetchPasswords = async () => {
    if (session.status === "authenticated") {
      setLoadingPasswords(true);
      try {
        const res = await fetch("/api/passwords");
        const data = await res.json();
        setPasswords(data);
      } catch (err) {
        console.error(err);
      }
      setLoadingPasswords(false);
    }
  }


  useEffect(() => {
    if (session.status === "authenticated") {
      fetchPasswords();
    }
  }, [session.status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("All fields are required", { theme: "dark" });
      return;
    }

    try {
      // if (storageOption === "local") {
      //   // ✅ Save to localStorage
      //   const existing = JSON.parse(localStorage.getItem("passwords")) || [];
      //   const newPasswords = [...existing, form];
      //   localStorage.setItem("passwords", JSON.stringify(newPasswords));

      //   // Update state
      //   setPasswords(newPasswords);

      //   toast.success("Password added to Local Storage", { position: "top-right", theme: "dark" });
      // } else {
      // ✅ Save to server (MongoDB)
      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const newPassword = await res.json();
      setPasswords(prev => Array.isArray(prev) ? [...prev, newPassword] : [newPassword]);

      toast.success("Password added to Server", { position: "top-right", theme: "dark" });
      // }

      // Clear form
      setForm({ site: "", username: "", password: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add password", { theme: "dark" });
    }

    await fetchPasswords();
  };



  const handleCopy = (id, text) => {
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    setTimeout(() => setCopiedId(null), 2000);
  };

  const deletePassword = async (id) => {
    await fetch(`/api/passwords/${id}`, { method: "DELETE" });
    setPasswords(passwords.filter((item) => item._id !== id));
    toast.info("Password deleted", { theme: "dark" });
    await fetchPasswords();
  };

  const editPassword = async (id, newPassword) => {
    const res = await fetch(`/api/passwords/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });
    const updated = await res.json();
    setPasswords(passwords.map((p) => (p._id === id ? updated : p)));
    toast.success("Password updated", { theme: "dark" });
    await fetchPasswords();
  };

  return (
    <div className="container mx-auto px-4 py-5 max-w-7xl mt-16 ">
      <Navbarx />
      <ToastContainer />
      <div className="flex justify-center items-center mb-4 mt-8 md:mt-12">
        <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-blue-700" />
        <span className="pl-3 text-3xl sm:text-4xl md:text-7xl font-semibold">Lockify</span>
      </div>
      <p className="text-base sm:text-lg md:text-xl text-purple-500 text-center mb-6">
        Your Safest Password Manager app trusted by 1M+ users
      </p>

      {/* Form */}
      <div className="space-y-4 mt-6 md:mt-12 w-full max-w-5xl mx-auto">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Website URL"
          name="site"
          value={form.site}
          className="bg-transparent w-full py-2 px-4 rounded-xl border-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Username"
            name="username"
            value={form.username}
            className="bg-transparent flex-1 py-2 px-4 rounded-xl border-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative flex-1">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
              value={form.password}
              name="password"
              className="w-full py-2 px-4 pr-10 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              <Image
                src={showPassword ? "/images/eye.svg" : "/images/close_eye.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                width={20}
                height={20}
                className="dark:invert"
              />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center w-full md:w-auto mx-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          <lord-icon
            src="https://cdn.lordicon.com/mfdeeuho.json"
            trigger="hover"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          <span className="pl-2 text-lg">Add Password</span>
        </button>
      </div>

      {/* Passwords Table (unchanged except overflow improvements) */}
      <div className="mt-8 md:mt-10 w-full">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600">
          <table className="min-w-full bg-white/5 dark:bg-gray-900">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Website</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Username</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Password</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingPasswords ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500">Loading passwords...</td>
                </tr>
              ) : (
                passwords.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-t border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3">
                      {item.site ? (
                        <Link href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                          <span className="truncate max-w-[200px] block">{item.site}</span>
                        </Link>
                      ) : (
                        <span className="text-gray-400 italic">No site</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="truncate max-w-[150px] block">{item.username}</span>
                    </td>
                    <td className="px-4 py-3">
                      {editId === item._id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none w-full max-w-[200px]"
                        />
                      ) : (
                        <span className="font-mono text-sm truncate max-w-[200px] block">{item.password}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleCopy(item._id, item.password)}
                          className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
                          title="Copy password"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {copiedId === item._id ? (
                              <motion.div
                                key="check"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Check className="w-4 h-4 text-green-600" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Copy className="w-4 h-4 text-blue-600" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>

                        {editId === item._id ? (
                          <button
                            onClick={() => {
                              editPassword(item._id, editValue);
                              setEditId(null);
                            }}
                            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition-colors"
                            title="Save changes"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#121331,secondary:#16a34a"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditId(item._id);
                              setEditValue(item.password);
                            }}
                            className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors"
                            title="Edit password"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#121331,secondary:#155dfc"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                        )}

                        <button
                          onClick={() => deletePassword(item._id)}
                          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition-colors"
                          title="Delete password"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#dc2626"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {passwords.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
                    {item.site ? (
                      <Link
                        href={item.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium truncate block"
                      >
                        {item.site}
                      </Link>
                    ) : (
                      <span className="text-gray-400 italic">No site</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</p>
                  <p className="text-gray-900 dark:text-white font-medium truncate">{item.username}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Password</p>
                  {editId === item._id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <p className="font-mono text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                      {item.password}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Actions</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(item._id, item.password)}
                      className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors"
                      title="Copy password"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copiedId === item._id ? (
                          <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Check className="w-5 h-5 text-green-600" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Copy className="w-5 h-5 text-blue-600" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>

                    {editId === item._id ? (
                      <button
                        onClick={() => {
                          editPassword(item._id, editValue);
                          setEditId(null);
                        }}
                        className="p-2 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 transition-colors"
                        title="Save changes"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#16a34a"
                          style={{ width: "24px", height: "24px" }}
                        ></lord-icon>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(item._id);
                          setEditValue(item.password);
                        }}
                        className="p-2 rounded-full bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/40 transition-colors"
                        title="Edit password"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#155dfc"
                          style={{ width: "24px", height: "24px" }}
                        ></lord-icon>
                      </button>
                    )}

                    <button
                      onClick={() => deletePassword(item._id)}
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors"
                      title="Delete password"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#121331,secondary:#dc2626"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <script src="https://cdn.lordicon.com/lordicon.js" /> {/* Load Lordicon script */}
    </div>
  )
}
{/* Mobile Cards */ }


export default Manager;
