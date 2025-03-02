'use client';
export default function Header() {
  return (
    <header className="bg-[var(--airbnb-white)] border-b border-[var(--airbnb-grey)] fixed top-0 w-full z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--airbnb-charcoal)]">Casaamigo</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-[var(--airbnb-charcoal)] hover:text-[var(--airbnb-red)]">Home</a>
          <a href="/properties" className="text-[var(--airbnb-charcoal)] hover:text-[var(--airbnb-red)]">Properties</a>
          <a href="/login" className="text-[var(--airbnb-charcoal)] hover:text-[var(--airbnb-red)]">Login</a>
        </nav>
      </div>
    </header>
  );
}