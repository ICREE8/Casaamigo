'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';

export default function Login() {
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          console.log('Wallet already connected:', accounts[0]);
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Initial wallet check failed:', err);
      }
    };
    checkWallet();
  }, [router]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }
    if (isConnecting) {
      setError('Connection in progress—please wait!');
      return;
    }

    setIsConnecting(true);
    try {
      setError(null);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        console.log('Connected Wallet (already active):', accounts[0]);
        router.push('/dashboard');
      } else {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('MetaMask timed out')), 10000)
        );
        await Promise.race([
          provider.send('eth_requestAccounts', []),
          timeoutPromise
        ]);
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();
        console.log('Connected Wallet:', walletAddress);
        setAddress(walletAddress);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Wallet connect failed:', error);
      if (error.code === -32002) {
        setError('MetaMask request pending—check your wallet and try again!');
      } else if (error.message === 'MetaMask timed out') {
        setError('MetaMask timed out—please retry!');
      } else {
        setError('Failed to connect—check MetaMask and try again!');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Login:', result.user.email);
      router.push('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Failed to sign in with Google—try again!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-[var(--airbnb-white)] w-full max-w-md rounded-2xl border border-[var(--airbnb-grey)] shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6 border-b border-[var(--airbnb-grey)] pb-4">Log in</h1>
          <div className="space-y-4">
            <button 
              onClick={connectWallet}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm h-12" // Fixed height for alignment
              disabled={isConnecting}
            >
              <img 
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png" 
                alt="ETH" 
                className="w-5 h-5 object-contain" // Ensure consistent size and scaling
              />
              Continue with Ethereum
            </button>
            <button 
              onClick={signInWithGoogle}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm h-12" // Fixed height for alignment
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5 object-contain" // Ensure consistent size and scaling
              />
              Continue with Google
            </button>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </div>
          <p className="text-center text-muted text-sm mt-6">
            Don’t have an account?{' '}
            <Link href="/" className="text-[var(--airbnb-red)] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}