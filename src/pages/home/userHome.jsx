import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div 
      className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('https://a2ztraders.lk/landing/box.jpg')" }}
    >
      {/* Hero Section */}
      <div className="max-w-4xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to TN International</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your trusted partner for quality products and seamless shipping solutions.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Explore Our Products
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <FeatureCard title="High-Quality Products" description="We provide premium products tailored to your needs." />
        <FeatureCard title="Fast & Reliable Shipping" description="Efficient delivery with real-time tracking." />
        <FeatureCard title="Excellent Customer Support" description="Dedicated support to assist you anytime." />
      </div>
    </div>
  );
}

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center bg-opacity-90">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);
