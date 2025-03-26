import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

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
          <NavLink to="/" label="Home" />
          <NavLink to="/products" label="Products" />
          <NavLink to="/about" label="About Us" />
          <NavLink to="/contact" label="Contact Us" />
          <NavLink to="/cart" label="Cart" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col">
            <button
              className="self-end text-3xl text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </button>

            <nav className="mt-6 space-y-4">
              <NavLink to="/" label="Home" onClick={() => setIsOpen(false)} />
              <NavLink to="/products" label="Products" onClick={() => setIsOpen(false)} />
              <NavLink to="/about" label="About Us" onClick={() => setIsOpen(false)} />
              <NavLink to="/contact" label="Contact Us" onClick={() => setIsOpen(false)} />
              <NavLink to="/cart" label="Cart" onClick={() => setIsOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

// Reusable Navigation Link Component
const NavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="text-lg font-medium text-gray-700 hover:text-accent transition"
    onClick={onClick}
  >
    {label}
  </Link>
);
