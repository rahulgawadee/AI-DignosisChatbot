import React from 'react';
import { motion } from 'framer-motion';
// Note: I've removed react-countup due to a compilation issue. 
// The stats will now display directly.
import { BrainCircuit, Stethoscope, Hospital, Bot } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

// --- Header Component ---
// A simple, clean header with the new branding.
const Header = () => (
  <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-slate-800">
        <span className="text-cyan-600">Med</span>AI
      </h1>
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#features" className="text-slate-600 hover:text-cyan-600 transition-colors">Features</a>
        <a href="#how-it-works" className="text-slate-600 hover:text-cyan-600 transition-colors">How It Works</a>
        <a href="#contact" className="text-slate-600 hover:text-cyan-600 transition-colors">Contact</a>
      </nav>
      <button className="hidden md:block bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-cyan-700 transition-all shadow-md hover:shadow-lg">
        Sign In
      </button>
    </div>
  </header>
);

// --- Footer Component ---
// Updated footer with the developer's name.
const Footer = () => (
  <footer className="bg-slate-800 text-slate-300">
    <div className="container mx-auto px-6 py-8 text-center">
      <p>&copy; {new Date().getFullYear()} MedAI. All Rights Reserved.</p>
      <p className="mt-2 text-sm text-slate-400">
        Developed by <span className="font-semibold text-cyan-400">Rahul Gawade</span>
      </p>
    </div>
  </footer>
);

// --- Main Homepage Component ---
// The complete, restyled homepage with a new hero section and color scheme.
const Homepage = () => {
  // In a real app, you'd use useNavigate. For this example, we'll log to the console.
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/diagnosis");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />

      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative bg-gradient-to-br from-cyan-50 to-blue-100 pt-24 pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">
            {/* Left Side: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
                Smarter Medical Decisions with <span className="text-cyan-600">MedAI</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0">
                Leveraging breakthrough AI to assist medical professionals in diagnosing complex cases, saving time and improving patient outcomes.
              </p>
              <button
                onClick={handleGetStartedClick}
                className="bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Get Started
              </button>
            </motion.div>

            {/* Right Side: Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-[450px] h-[450px]">
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-full"></div>
                 <Bot className="absolute w-2/3 h-2/3 text-cyan-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" strokeWidth={1} />
                 <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-12 left-12 bg-white p-4 rounded-full shadow-lg"
                 >
                    <BrainCircuit className="w-10 h-10 text-blue-500" />
                 </motion.div>
                 <motion.div
                    animate={{ y: [8, -8, 8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-16 right-8 bg-white p-4 rounded-full shadow-lg"
                 >
                    <Stethoscope className="w-10 h-10 text-teal-500" />
                 </motion.div>
                 <motion.div
                    animate={{ x: [-6, 6, -6] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-20 left-8 bg-white p-4 rounded-full shadow-lg"
                 >
                    <Hospital className="w-10 h-10 text-indigo-500" />
                 </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <motion.section
          id="features"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-base font-semibold text-cyan-600 tracking-wider uppercase">PAIRS</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Physician Assistant Artificial Intelligence System
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              A state-of-the-art Clinical Decision Support System (CDSS) designed for accuracy and speed.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                { title: "Complex Case Diagnosis", desc: "Get rapid suggestions for probable diagnoses in challenging cases." },
                { title: "Vast Medical Database", desc: "Built on 3 decades of data with over 70K PUBMED cases for unparalleled accuracy." },
                { title: "Prevent Misdiagnosis", desc: "Augments clinical decisions with data-driven pathophysiological reasoning." },
                { title: "Accelerate Diagnosis", desc: "Validate your probable diagnosis faster and more confidently with PAIRS." }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg hover:border-cyan-300 transition-all duration-300"
                >
                  <h4 className="font-bold text-lg mb-3 text-slate-800">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Stats Section --- */}
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-slate-50"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-center text-slate-600 mb-12 max-w-3xl mx-auto">
              MedAI analyzes a vast network of medical data points to provide comprehensive diagnostic support, helping you verify your findings with confidence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              {[
                { num: 28000, label: "Disease-Features" },
                { num: 486, label: "Internal Medicine Diseases" },
                { num: 2000, label: "Medical Features" }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-8 rounded-xl shadow-md border border-slate-100"
                >
                  <div className="text-5xl font-bold text-cyan-600 mb-2">
                    {stat.num.toLocaleString()}+
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Contact Section --- */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
              Contact Us
            </h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-slate-200">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name *" required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  <input type="text" placeholder="Last Name *" required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <input type="email" placeholder="Email *" required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <input type="text" placeholder="Subject *" required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <textarea placeholder="Message *" rows="4" required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-md font-bold w-full shadow-md hover:shadow-lg transition-all"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

// Export the main component for use in your application.
export default Homepage;
