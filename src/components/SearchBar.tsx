'use client';

import { Search } from 'lucide-react';
import { useStore } from '@/store/store';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative mb-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="搜索市场..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl border border-border text-white placeholder:text-gray-500 focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
