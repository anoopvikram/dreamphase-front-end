import React, { useState } from 'react';

export const AuthPage = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  
const [keepSignedIn, setKeepSignedIn] = useState(true);

  return (
    <div className="flex items-center flex-col justify-center min-h-screen  bg-transparent text-black">
      {onClose && (
        <button
          onClick={onClose}
          className=" text-white font-black self-end bg-[#00000090] rounded-full w-8 h-8 z-50"
        >
          ✕
        </button>
      )}
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-transparent rounded-[30px] overflow-hidden">
        {/* Sign Up Form */}
        {/* Sign Up Form */}
<div className={`absolute top-0 left-0 w-1/2 h-full z-30 transition-all duration-700 ${isActive ? 'translate-x-full opacity-100' : 'opacity-100 pointer-events-none'}`}>
  <form className="h-full flex flex-col justify-center items-start rounded-3xl  px-10 text-center bg-gradient-to-r from-[#4A83AD] to-[#01475F]">
    
    {/* Top switch buttons*/}
    {/* <div className="absolute top-5 left-5 flex gap-4">
      <button type="button" onClick={() => setIsActive(false)} className="text-white cursor-pointer">Sign In</button>
      <button type="button" onClick={() => setIsActive(true)} className="text-white underline cursor-pointer">Sign Up</button>
    </div>  */}

    <Input label='FULL NAME' />
    <Input label='EMAIL' type="email" />
    <Input label='PASSWORD' type="password" />
    <Input label='CONFIRM PASSWORD' type="password"/>

    <label className="text-white text-sm my-4 flex items-center gap-3 cursor-pointer">
    <div
        className={`w-18 h-8 flex items-center gap-1 px-1 rounded-full transition-all duration-300 ${
        keepSignedIn ? 'bg-[#0068A3] justify-end' : 'bg-gray-500 justify-start'
        }`}
        onClick={() => setKeepSignedIn(!keepSignedIn)}
    ><p>{keepSignedIn ? 'YES' : ''}</p>
        <div className="w-6 h-6 bg-white rounded-full shadow-md ">
        </div>
        <p>{keepSignedIn ? '' : 'NO'}</p>
    </div>
    <span className="text-xs tracking-wide">KEEP ME SIGNED IN</span>
    </label>

    <Button>Sign Up</Button>
  </form>
</div>

{/* Sign In Form */}
<div className={`absolute top-0 left-0 w-1/2 h-full z-40 transition-all duration-700 ${isActive ? 'translate-x-full opacity-0 pointer-events-none' : 'opacity-100'}`}>
  <form className="h-full flex flex-col justify-center rounded-3xl items-start px-10 text-center bg-gradient-to-r from-[#4A83AD] to-[#01475F]">
    
    {/* Top switch buttons */}
    {/* <div className="absolute top-5 left-5 flex gap-4">
      <button type="button" onClick={() => setIsActive(false)} className="text-white underline cursor-pointer">Sign In</button>
      <button type="button" onClick={() => setIsActive(true)} className="text-white cursor-pointer">Sign Up</button>
    </div> */}

    <Input label='USERNAME' type="email" />
    <Input label='PASSWORD' type="password" />

<label className="text-white text-sm my-4 flex items-center gap-3 cursor-pointer">
    <div
        className={`w-18 h-8 flex items-center gap-1 px-1 rounded-full transition-all duration-300 ${
        keepSignedIn ? 'bg-[#0068A3] justify-end' : 'bg-gray-500 justify-start'
        }`}
        onClick={() => setKeepSignedIn(!keepSignedIn)}
    ><p>{keepSignedIn ? 'YES' : ''}</p>
        <div className="w-6 h-6 bg-white rounded-full shadow-md ">
        </div>
        <p>{keepSignedIn ? '' : 'NO'}</p>
    </div>
    <span className="text-xs tracking-wide">KEEP ME SIGNED IN</span>
    </label>

    <Button>Sign In</Button>
    <a href="#" className="text-sm my-2 self-center text-white">Forgot your password?</a>
  </form>
</div>

        {/* Overlay Panel */}
        <div className='absolute top-0 h-full w-full z-0 overflow-hidden  transition-all duration-700'>
          <div className="relative w-full h-full  overflow-hidden">
  <div className='flex w-full h-full  transition-all  duration-700 ease-in-out' >
    
    {/* Left Panel */}
    <div className='w-full flex flex-col justify-center items-center text-center px-8 h-7/8 rounded-l-xl  my-auto  bg-[#164B71] text-white' >
      <h1 className="text-2xl font-bold">Hello, Friend!</h1>
      <p className="my-4">Register with your personal details to use all of site features</p>   
      <button
        onClick={() => setIsActive(false)}
        className="border border-white bg-transparent hover:bg-white hover:text-indigo-800 transition px-6 py-2 mt-2 rounded-full"
      >
        Sign Up
      </button>
    </div>

    {/* Right Panel */}
    <div className='w-full flex flex-col justify-center items-center text-center px-8 h-7/8 rounded-r-xl my-auto bg-[#164B71] text-white' >
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      <p className="my-4">Enter your personal details to use all of site features</p>
      <button
        onClick={() => setIsActive(true)}
        className="border border-white bg-transparent hover:bg-white hover:text-indigo-800 transition px-6 py-2 mt-2 rounded-full"
      >
        Sign In
      </button>
    </div>

  </div>
</div>

        </div>
        
      </div>
    </div>
  );
};

// Reusable Components
const SocialIcon = ({ icon }) => (
  <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center mx-1">
    <i className={icon}></i>
  </a>
);

const Input = ({ type = 'text', label }) => (
    <div className='flex w-full mb-2 items-start flex-col'>
        <label className='text-sm text-white'>{label}</label>
         <input
            type={type}
            className="w-full px-4 py-1 my-1 bg-[#FFFFFF4D] rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
  
    </div>
 
);

const Button = ({ children }) => (
  <button className="mt-3 px-6 py-1 w-full bg-[#0068A3] text-white rounded-full hover:bg-indigo-600 transition">
    {children}
  </button>
);
