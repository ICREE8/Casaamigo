'use client';
import Link from 'next/link';
import Header from '../components/Header';
import { useState } from 'react';

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Manrope'] tracking-tight">
          Discover Your Next Property
        </h1>
        <p className="text-xl md:text-2xl text-[#717171] mb-8 max-w-2xl mx-auto font-['Inter']">
          Unlock exclusive real estate with fractional ownership—powered by blockchain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-[#FF5A5F] text-white px-8 py-4 rounded-lg text-lg font-bold shadow-md hover:bg-[#E00B41] transition-all w-full sm:w-48"
          >
            {showMap ? 'Hide Map' : 'See the Map'}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-[#FF5A5F] border border-[#FF5A5F] px-8 py-4 rounded-lg text-lg font-bold shadow-md hover:bg-[#FF5A5F] hover:text-white transition-all w-full sm:w-48"
          >
            Get More Info
          </button>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="mb-12">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=25.7617,-80.1918&zoom=10&size=800x400&key=YOUR_GOOGLE_MAPS_API_KEY"
              alt="Property Map"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg animate-fade-in"
            />
          </div>
        )}

        {/* Lead Capture Form (Modal) */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-[#222222]">Get More Info</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-[#717171] mb-2 font-['Inter']">Name</label>
                  <input type="text" className="w-full p-2 rounded border border-[#D3D3D3] text-[#222222]" />
                </div>
                <div className="mb-4">
                  <label className="block text-[#717171] mb-2 font-['Inter']">Email</label>
                  <input type="email" className="w-full p-2 rounded border border-[#D3D3D3] text-[#222222]" required />
                </div>
                <div className="mb-4">
                  <label className="block text-[#717171] mb-2 font-['Inter']">Budget Range</label>
                  <select className="w-full p-2 rounded border border-[#D3D3D3] text-[#222222]">
                    <option>$500k - $1M</option>
                    <option>$1M - $2M</option>
                    <option>$2M+</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#717171] mb-2 font-['Inter']">Location Preference</label>
                  <input type="text" className="w-full p-2 rounded border border-[#D3D3D3] text-[#222222]" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <button type="submit" className="bg-[#FF5A5F] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#E00B41] transition-all w-full sm:w-auto">
                    Send Info
                  </button>
                  <Link href="/properties" onClick={() => setShowForm(false)}>
                    <button className="bg-white text-[#FF5A5F] border border-[#FF5A5F] px-6 py-2 rounded-lg font-bold hover:bg-[#FF5A5F] hover:text-white transition-all w-full sm:w-auto">
                      Check Properties
                    </button>
                  </Link>
                </div>
                <button type="button" onClick={() => setShowForm(false)} className="mt-4 text-[#717171] hover:text-[#222222] w-full text-center">
                  Close
                </button>
              </form>
              <p className="text-[#717171] text-sm mt-4">Your data is safe—no spam, ever.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}