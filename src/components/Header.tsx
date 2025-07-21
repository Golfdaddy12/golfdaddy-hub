"use client";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-50 text-white z-30">
      <h1 className="text-xl font-bold">Golfdaddy Hub</h1>
      <nav className="space-x-6 text-sm md:text-base">
        <a href="#" className="hover:text-green-400 transition">Home</a>
        <a href="#" className="hover:text-green-400 transition">About</a>
        <a href="#" className="hover:text-green-400 transition">Contact</a>
      </nav>
    </header>
  );
}
