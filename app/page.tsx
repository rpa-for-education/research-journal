'use client';

import { useEffect, useState } from 'react';

type Journal = {
  _id: string;
  Title: string;
  Rank: number;
};

export default function Page() {
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    fetch('/api/journals')
      .then(res => res.json())
      .then(data => setJournals(data));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách Journals</h1>
      <ul className="space-y-2">
        {journals.map((j) => (
          <li key={j._id} className="border p-2 rounded shadow-sm">
            <strong>{j.Title}</strong> – Rank: {j.Rank}
          </li>
        ))}
      </ul>
    </main>
  );
}
