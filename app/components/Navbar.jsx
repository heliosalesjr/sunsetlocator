'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/">
        <span className="text-xl font-bold text-orange-500 tracking-wide">
          Sunset Locator
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link href="/about">
          <span className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
            About
          </span>
        </Link>
        <Link href="/locations">
          <span className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
            Locations
          </span>
        </Link>
      </div>
    </nav>
  );
}
