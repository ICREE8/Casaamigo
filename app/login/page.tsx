'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function Login() {
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    try {
      setError(null);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      console.log('Connected Wallet:', walletAddress);
      setAddress(walletAddress);
      router.push('/dashboard');
    } catch (error) {
      console.error('Wallet connect failed:', error);
      setError('Failed to connect—check MetaMask and try again!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-[var(--background-color)] text-[var(--text-color)] p-6 rounded-lg max-w-md w-full text-center border border-[var(--dark-accent)]">
        <h1 className="text-3xl font-bold mb-6">Login to Casaamigo</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={connectWallet}
            className="btn-secondary w-full"
          >
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
          </button>
          {error && (
            <div className="text-red-500 mb-4">
              <p>{error}</p>
              <button
                onClick={connectWallet}
                className="mt-2 bg-[var(--accent-color)] text-[var(--text-color)] px-4 py-1 rounded text-sm hover:bg-[var(--dark-accent)] hover:text-white"
              >
                Retry
              </button>
            </div>
          )}
        </div>
        <Link href="/" className="block text-center mt-4">
          <button className="btn-primary w-full">Return Home</button>
        </Link>
      </div>
    </div>
  );
}