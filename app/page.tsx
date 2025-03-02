'use client';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--airbnb-white)] text-[var(--airbnb-charcoal)]">
      <Header />
      <div className="container mx-auto p-6 pt-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Own Your Piece of Paradise</h1>
        <p className="text-muted text-xl mb-8 max-w-2xl mx-auto">
          Invest in real estate with blockchain-powered ease—fractional ownership, global access, zero hassle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <button className="btn-primary w-full sm:w-48 text-lg py-3 shadow-md hover:shadow-lg transition-shadow">
              Get Started
            </button>
          </Link>
          <Link href="/properties">
            <button className="btn-secondary w-full sm:w-48 text-lg py-3 border-[var(--airbnb-red)] text-[var(--airbnb-red)] shadow-md hover:bg-[var(--airbnb-red)] hover:text-white transition-all">
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}