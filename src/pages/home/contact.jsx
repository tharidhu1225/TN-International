import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSend = () => {
    const whatsappMessage = `Hello, my name is ${encodeURIComponent(name)}. ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/94760340851?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
          <div className="flex flex-col items-center">
            <FaPhone className="text-accent text-3xl" />
            <p className="mt-2 font-medium text-gray-700">+94 760 340 851</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-accent text-3xl" />
            <p className="mt-2 font-medium text-gray-700">101 , Fort Tower Building, Olcott Mawatha, Colombo 00011</p>
          </div>
        </div>

        {/* Contact Form */}
       <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Your Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Enter your name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
              rows="4" 
              placeholder="Enter your message" 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button 
            type="button" 
            onClick={handleWhatsAppSend}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 shadow-md"
          >
            Send Message via WhatsApp
          </button>
        </div>
        </div>

     
      </div>
    
  );
}
