'use client';
import { ConnectButton } from 'thirdweb/react';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen bg-white text-navy font-body flex items-center justify-center p-5">
      <div className="bg-navy text-white p-6 rounded-lg max-w-md w-full font-sans">
        <h1 className="text-3xl font-display font-bold text-center mb-6">Login to Casaamigo</h1>
        <div className="flex flex-col gap-4">
          <ConnectButton
            client={{ id: 'YOUR_THIRDWEB_CLIENT_ID' }} // Replace with your Client ID
            theme="dark" // Matches Navy Blue vibe
            connectModal={{
              size: 'compact', // Lean and clean
              title: 'Connect to Invest',
              showThirdwebBranding: false, // Casaamigo-first
            }}
            connectButton={{
              label: 'Connect Wallet', // Simple and clear
              className: 'bg-teal text-white px-6 py-3 rounded text-lg font-display hover:bg-ochre w-full',
            }}
          />
        </div>
        <Link href="/" className="block text-center mt-4">
          <button className="bg-ochre text-white px-6 py-2 rounded w-full">Return Home</button>
        </Link>
      </div>
    </div>
  );
}