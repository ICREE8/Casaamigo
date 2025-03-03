'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#121212] border-b border-gray-800 fixed top-0 w-full z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white font-['Manrope']">Casaamigo</h1>
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1F2A44] rounded-lg shadow-lg">
              <Link href="/" className="block px-4 py-2 text-white hover:bg-[#FF5A5F] font-['Inter']">Home</Link>
              <Link href="/properties" className="block px-4 py-2 text-white hover:bg-[#FF5A5F] font-['Inter']">Properties</Link>
              <Link href="/luxury" className="block px-4 py-2 text-white hover:bg-[#FF5A5F] font-['Inter']">Luxury Homes</Link>
              <Link href="/urban" className="block px-4 py-2 text-white hover:bg-[#FF5A5F] font-['Inter']">Urban Living</Link>
              <Link href="/about" className="block px-4 py-2 text-white hover:bg-[#FF5A5F] font-['Inter']">About Us</Link>
              <Link href="/contact" className="block px-4 py-2 text-white hover:bg-[#FF5A5F] font-['Inter']">Contact</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}