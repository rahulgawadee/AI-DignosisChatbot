import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Header from "./header";
import Footer from "./Footer";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-animated text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Breakthroughs in AI for Medical Diagnosis
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Where AI meets Medicine to leverage smarter medical decisions
                and save lives when it matters most.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["For Doctors", "For Hospitals", "For Corporates"].map((item) => (
                  <span
                    key={item}
                    className="bg-white/90 px-4 py-2 rounded-full shadow-md text-blue-700 font-medium hover:shadow-xl transition cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate("/diagnosis")}
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
              >
                Get Started
              </button>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="bg-white/10 backdrop-blur-lg h-72 w-full md:h-96 rounded-xl flex items-center justify-center shadow-lg text-white text-xl font-medium">
                AI Illustration / Animation
              </div>
            </motion.div>
          </div>
        </section>

        {/* PAIRS Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              AI-MED proudly introduces
            </h2>
            <h3 className="text-4xl font-extrabold text-blue-600 mb-6">
              PAIRS (Physician Assistant Artificial Intelligence System)
            </h3>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              An Ingenious & State of the Art Clinical Decision Support System
              (CDSS)
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                {
                  title: "Difficult to Diagnosis Cases",
                  desc: "Quick suggestions for probable diagnosis of difficult cases."
                },
                {
                  title: "Vast Medical Database",
                  desc: "Built over 3 decades with 70K PUBMED cases for accuracy."
                },
                {
                  title: "Prevent Misdiagnosis",
                  desc: "Supports doctors with pathophysiological reasoning."
                },
                {
                  title: "Reduce Time for Diagnosis",
                  desc: "Validate probable diagnosis faster with PAIRS."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform"
                >
                  <h4 className="font-bold text-lg mb-3 text-blue-700">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg shadow-md">
              Start Free Trial
            </button>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-br from-gray-100 to-blue-50"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              How It Works
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Using a variety of parameters, AI-MED assists you in verifying
              your diagnosis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              {[
                { num: 28000, label: "Disease-Features" },
                { num: 486, label: "Internal Medicine Diseases" },
                { num: 2000, label: "Medical Features" }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    <CountUp end={stat.num} duration={2} separator="," />
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="bg-gray-200 h-64 w-full max-w-4xl rounded-lg flex items-center justify-center text-gray-500">
                AI Demo Image / Chart
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-gray-100"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Contact Us
            </h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <form className="space-y-6">
                {[
                  { id: "first-name", label: "First Name *", type: "text" },
                  { id: "last-name", label: "Last Name *", type: "text" },
                  { id: "email", label: "Email *", type: "email" },
                  { id: "subject", label: "Subject *", type: "text" }
                ].map((field) => (
                  <div key={field.id} className="relative">
                    <input
                      type={field.type}
                      id={field.id}
                      required
                      className="peer w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <label
                      htmlFor={field.id}
                      className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    id="message"
                    rows="4"
                    required
                    className="peer w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1"
                  >
                    Message *
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium w-full shadow-md"
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

export default Homepage;
