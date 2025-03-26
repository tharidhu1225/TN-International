import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
      email: email,
      password: password
    }).then((res) => {
      if (!res.data.user) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);
      window.location.href = res.data.user.type === "admin" ? "/admin" : "/";
    });
  }

  return (
    <div 
      className='flex justify-center items-center w-full h-screen bg-[#e9e6e629] bg-cover bg-center'
      style={{ backgroundImage: "url('https://miro.medium.com/v2/resize:fit:1400/1*1xzUd1enzX3l-S4S26iKxA.png')" }}
    >
      <div className='w-[400px] bg-[#e9e6e638] p-8 rounded-lg shadow-lg text-center bg-opacity-90'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Login to Your Account</h2>
        
        <div className='mb-4'>
          <label className='block text-left text-gray-800 font-medium'>Email</label>
          <input 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Enter your email' 
          />
        </div>
        
        <div className='mb-6'>
          <label className='block text-left text-gray-800 font-medium'>Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Enter your password' 
          />
        </div>
        
        <button onClick={login} className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition'>
          Login
        </button>
        
        <p className='text-gray-600 mt-4'>
          Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
