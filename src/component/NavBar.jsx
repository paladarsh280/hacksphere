
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from "../assets/logo.png";

export default function EnhancedNav() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="min-h-screen bg-transparent from-purple-900 via-blue-900 to-indigo-900">
            <nav className="flex items-center justify-between p-4 relative">
                
              
                <div className="flex-shrink-0 z-50">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-8 md:h-10 cursor-pointer" />
                    </Link>
                </div>

        
                <button
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

               
                <div className="hidden md:flex md:space-x-3">
                    <Link 
                        to="/login" 
                      
                        className="inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        Login
                    </Link>

                    <Link 
                        to="/signup" 
                       
                        className="inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold text-white  rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 "
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            
            <div
                className={`
                    md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsOpen(false)}
            />

     
            <div
                className={`
                    md:hidden fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 
                    shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex flex-col h-full p-6 pt-20">

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Welcome!</h3>
                        <p className="text-gray-400 text-sm">Sign in to continue</p>
                    </div>

                    <div className="space-y-4">
                        <Link 
                            to="/login" 
                            className="w-full px-6 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 transition duration-300 transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg flex items-center justify-center space-x-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Login</span>
                        </Link>

                        <Link 
                            to="/signup" 
                            className="w-full px-6 py-4 text-lg font-semibold text-white  rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center justify-center space-x-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span>Sign Up</span>
                        </Link>
                    </div>

                    <div className="my-8 border-t border-gray-700"></div>

                    <div className="space-y-3 text-sm">
                        <a href="/about" className="block text-gray-400 hover:text-white transition duration-200">About Us</a>
                        <a href="/contact" className="block text-gray-400 hover:text-white transition duration-200">Contact</a>
                        <a href="/help" className="block text-gray-400 hover:text-white transition duration-200">Help Center</a>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-700">
                        <p className="text-xs text-gray-500 text-center">
                            © 2024 Your Company. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
           
        </div>
    );
}