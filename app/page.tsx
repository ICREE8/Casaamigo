'use client';
import Link from 'next/link';
import Header from '../components/Header';
import { useState } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      {/* Hero Section */}
      <div className="relative container mx-auto px-6 pt-20 text-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=25.7617,-80.1918&zoom=10&size=1200x800&key=YOUR_GOOGLE_MAPS_API_KEY')] bg-cover bg-center animate-fade-in"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Manrope'] tracking-tight">
            Discover Your Edge in Real Estate
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-['Inter']">
            Unlock exclusive properties with blockchain-powered ownership—anywhere, anytime.
          </p>
          <Link href="#" onClick={() => setShowForm(true)}>
            <button className="bg-[#FF5A5F] text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-[#E00B41] transition-all">
              Find My Next Property
            </button>
          </Link>
        </div>
      </div>

      {/* Lead Capture Form (Modal) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-[#1F2A44] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Find Your Property</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-['Inter']">Name</label>
                <input type="text" className="w-full p-2 rounded bg-[#2E8B57] text-white border-none" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-['Inter']">Email</label>
                <input type="email" className="w-full p-2 rounded bg-[#2E8B57] text-white border-none" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-['Inter']">Budget Range</label>
                <select className="w-full p-2 rounded bg-[#2E8B57] text-white border-none">
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M+</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-['Inter']">Location Preference</label>
                <input type="text" className="w-full p-2 rounded bg-[#2E8B57] text-white border-none" />
              </div>
              <button type="submit" className="bg-[#FF5A5F] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#E00B41] transition-all">
                Show Me Properties
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="ml-4 text-gray-300 hover:text-white">
                Close
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">Your data is safe with us—no spam, ever.</p>
          </div>
        </div>
      )}
    </div>
  );
}