import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating form submission (replace with API call)
    setSuccessMessage("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
          <div className="flex flex-col items-center">
            <FaPhone className="text-accent text-3xl" />
            <p className="mt-2 font-medium text-gray-700">+1 234 567 890</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-accent text-3xl" />
            <p className="mt-2 font-medium text-gray-700">contact@yourdomain.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-accent text-3xl" />
            <p className="mt-2 font-medium text-gray-700">123 Main Street, City, Country</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-accent text-white font-medium py-3 rounded-lg hover:bg-accent-dark transition"
          >
            Send Message
          </button>
        </form>

        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
      </div>

      {/* Google Map (Optional) */}
      <div className="mt-12 w-full max-w-4xl">
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094375!2d144.95592381531858!3d-37.81720997975165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1c5d7b1%3A0x2a23e3d5a1478e1!2s123%20Main%20Street%2C%20Melbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1632903111233"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
