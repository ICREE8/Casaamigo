'use client';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';

export default function Login() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0].address);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } else {
        alert('Please install MetaMask to connect your wallet!');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet—check MetaMask!');
    }
  };

  return (
    <div className="min-h-screen bg-white text-navy font-body flex items-center justify-center p-5">
      <div className="bg-navy text-white p-6 rounded-lg max-w-md w-full font-sans">
        <h1 className="text-3xl font-display font-bold text-center mb-6">Login to Casaamigo</h1>
        <div className="flex flex-col gap-4">
          <button 
            onClick={connectWallet} 
            className="bg-teal text-white px-6 py-3 rounded text-lg font-display hover:bg-ochre"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
        <Link href="/" className="block text-center mt-4">
          <button className="bg-ochre text-white px-6 py-2 rounded w-full">Return Home</button>
        </Link>
      </div>
    </div>
  );
}