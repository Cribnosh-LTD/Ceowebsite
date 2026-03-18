"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight mb-6">
          Admin Dashboard
        </h1>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 font-inter">
          The previous database-backed content management interface is currently disabled.
        </p>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 font-inter">
          Pieces are now served from local content files in the app. You can update them in
          <code className="mx-1 bg-gray-100 px-2 py-1 rounded">src/content/piecesContent.ts</code>.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/pieces"
            className="px-6 py-3 bg-black text-white rounded-full uppercase tracking-widest text-xs md:text-sm font-oswald hover:bg-gray-800 transition-colors"
          >
            View Pieces
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-black text-black rounded-full uppercase tracking-widest text-xs md:text-sm font-oswald hover:bg-black hover:text-white transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
