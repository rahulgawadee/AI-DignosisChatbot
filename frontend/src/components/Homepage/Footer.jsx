import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-400">AI-MED.IN</span>
            </div>
            <p className="text-gray-400 mb-4">
              Where AI meets Medicine to leverage Smarter Medical Decisions & eventually save lives when it matters.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Career</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Copyright Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Medical Indemnity Form</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe to newsletter</h4>
            <div className="flex mb-4">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-md w-full text-gray-800 focus:outline-none" />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
            
            <h4 className="text-lg font-semibold mb-2">Get in Touch</h4>
            <p className="text-gray-400 mb-1">+(91) 97033 14548</p>
            <p className="text-gray-400">mohan@ai-med.in</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2023 Proudly made in 🇮🇳 by AI-MED.IN</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
