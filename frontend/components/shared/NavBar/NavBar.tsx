"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Mic, MicOff, Search } from "lucide-react";
import { isAuthCookieSet, removeAuthCookie } from "@/libs/auth-cookies";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsAuth(isAuthCookieSet());
  }, [pathname]);

  useEffect(() => {
    if (listening) {
      setSearchQuery(transcript);
    }
  }, [transcript, listening]);

  const handleLogout = () => {
    removeAuthCookie();
    setIsAuth(false);
    window.location.href = "/";
    setIsOpen(false);
  };

  const handleVoice = () => {
    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening({ language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push(`/stays?city=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/stays", label: "Stays" },
    { href: "/flights", label: "Flight" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="sticky top-0 w-full bg-white border-b z-50">
      <div className="container py-4 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" // Replace with your logo path
            alt="TravelGuide Logo"
            width={150} // Adjust width as needed
            height={40} // Adjust height as needed
            className="h-8 w-auto" // Maintains aspect ratio, adjust height as needed
            priority
          />
        </Link>

        {/* Search Input */}
        {isMounted && browserSupportsSpeechRecognition && (
          <div className="relative w-full lg:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by voice or text..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              suppressHydrationWarning={true}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <button
              type="button"
              onClick={handleVoice}
              className="absolute right-2 top-1.5 text-primary hover:text-primary/80"
              aria-label={listening ? "Stop voice input" : "Start voice input"}
            >
              {listening ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-semibold text-lg ${
                  pathname === href ? "text-primary" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3 relative">
          {isAuth ? (
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-lg hover:text-primary transition-colors">
                My Account{" "}
                <ChevronDown
                  size={18}
                  className="group-hover:rotate-180 transition-transform"
                />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                <Link href="/dashboard" className="block px-4 py-2 ">
                  Dashboard
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 "
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/register"
                className="btn-v-2 hover:bg-opacity-90 transition-all"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="btn-v-1 hover:bg-opacity-90 transition-all"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-6"
          >
            <button onClick={() => setIsOpen(false)} className="self-end">
              <X size={28} />
            </button>

            <ul className="flex flex-col gap-4">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`font-semibold text-lg ${
                      pathname === href ? "text-primary" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3">
              {isAuth ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="btn-v-2 w-full text-center"
                  >
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-v-1 w-full">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="btn-v-2 w-full text-center"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-v-1 w-full text-center"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;