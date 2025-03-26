import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaBoxOpen, FaShippingFast, FaClipboardList, FaPhone } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-800">𝓣𝓝 𝓘𝓷𝓽𝓮𝓻𝓷𝓪𝓽𝓲𝓸𝓷𝓪𝓵</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <NavLink to="/" label="Home" icon={<FaHome />} />
          <NavLink to="/products" label="Products" icon={<FaBoxOpen />} />
          <NavLink to="/shipping" label="Add Order" icon={<FaShippingFast />} />
          <NavLink to="/orders" label="Orders" icon={<FaClipboardList />} />
          <NavLink to="/contact" label="Contact Us" icon={<FaPhone />} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="bg-white w-64 h-full shadow-lg p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="self-end text-3xl text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </button>

            <nav className="mt-4 space-y-5 flex flex-col">
              <NavLink to="/" label="Home" icon={<FaHome />} onClick={() => setIsOpen(false)} />
              <NavLink to="/products" label="Products" icon={<FaBoxOpen />} onClick={() => setIsOpen(false)} />
              <NavLink to="/shipping" label="Add Order" icon={<FaShippingFast />} onClick={() => setIsOpen(false)} />
              <NavLink to="/orders" label="Orders" icon={<FaClipboardList />} onClick={() => setIsOpen(false)} />
              <NavLink to="/contact" label="Contact Us" icon={<FaPhone />} onClick={() => setIsOpen(false)} />
            </nav>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}

// Reusable Navigation Link Component
const NavLink = ({ to, label, icon, onClick }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-accent transition"
    onClick={onClick}
  >
    {icon} {label}
  </Link>
);
