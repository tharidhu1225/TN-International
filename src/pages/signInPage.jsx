import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signup() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
      firstName,
      lastName,
      email,
      password
    }).then((res) => {
      if (res.data.success) {
        toast.success("Signup successful! You can now login.");
        window.location.href = "/login";
      } else {
        toast.error(res.data.message);
      }
    });
  }

  return (
    <div 
      className='flex justify-center items-center w-full h-screen bg-gray-100 bg-cover bg-center'
      style={{ backgroundImage: "url('https://img.freepik.com/free-vector/overlapping-forms-wallpaper_23-2148652537.jpg')" }}
    >
      <div className='w-[400px] bg-[#f3eeee53] p-8 rounded-lg shadow-lg text-center bg-opacity-90'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Create an Account</h2>
        
        <div className='mb-4'>
          <label className='block text-left text-gray-600 font-medium'>First Name</label>
          <input 
            type='text' 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Enter your first name' 
          />
        </div>

        <div className='mb-4'>
          <label className='block text-left text-gray-600 font-medium'>Last Name</label>
          <input 
            type='text' 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Enter your last name' 
          />
        </div>
        
        <div className='mb-4'>
          <label className='block text-left text-gray-600 font-medium'>Email</label>
          <input 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Enter your email' 
          />
        </div>
        
        <div className='mb-6'>
          <label className='block text-left text-gray-600 font-medium'>Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Enter your password' 
          />
        </div>
        
        <button onClick={signup} className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition'>
          Sign Up
        </button>
        
        <p className='text-gray-600 mt-4'>
          Already have an account? <Link to='/login' className='text-blue-600 hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  );
}
