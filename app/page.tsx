'use client';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--airbnb-white)] text-[var(--airbnb-charcoal)]">
      <Header />
      <div className="container mx-auto p-5 pt-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Casaamigo</h1>
        <p className="text-muted text-lg mb-8">Invest in real estate like never before—fractional ownership made simple.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <button className="btn-primary w-full sm:w-auto">Login</button>
          </Link>
          <Link href="/properties">
            <button className="btn-secondary w-full sm:w-auto">Check Properties</button>
          </Link>
        </div>
      </div>
    </div>
  );
}