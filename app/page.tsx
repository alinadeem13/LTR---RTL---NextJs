'use client';

import { useDirection } from '@/context/DirectionContext';
import type { Language } from '@/context/DirectionContext';

export default function Home() {
  const { direction, language, toggleDirection, setLanguage, translations } = useDirection();

  return (
    <main className="min-h-screen flex flex-col p-6">
      {/* Header with toggle */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          {translations.dashboard} ({direction.toUpperCase()}) - {language.toUpperCase()}
        </h1>
        <div>
          <button
            onClick={toggleDirection}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-4"
          >
            Toggle Direction
          </button>
          {/* Language Selector */}
          <select
  value={language}
  onChange={(e) => setLanguage(e.target.value as Language)}
  className="px-4 py-2 border rounded"
>
  <option value="en">English</option>
  <option value="ar">Arabic</option>
  <option value="fr">French</option>
  <option value="ur">Urdu</option>
</select>

        </div>
      </div>

      {/* 2-column layout */}
      <div className="flex flex-1 border rounded shadow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 rtl:border-l ltr:border-r">
          <ul className="space-y-2">
            <li className="font-semibold">{translations.dashboard}</li>
            <li className="font-semibold">{translations.orders}</li>
            <li className="font-semibold">{translations.settings}</li>
          </ul>
        </aside>

        {/* Main content */}
        <section className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">{translations.welcome}</h2>
          <p className="text-gray-700 rtl:text-right ltr:text-left">{translations.description}</p>
        </section>
      </div>
    </main>
  );
}
