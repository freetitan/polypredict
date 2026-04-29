'use client';

import { categories } from '@/lib/types';
import { useStore } from '@/store/store';
import { 
  Grid3X3, Bitcoin, Vote, Trophy, Cpu, Rocket, TrendingUp 
} from 'lucide-react';
import clsx from 'clsx';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid3X3,
  Bitcoin,
  Vote,
  Trophy,
  Cpu,
  Rocket,
  TrendingUp
};

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Grid3X3;
        const isSelected = selectedCategory === category.name;

        return (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
              isSelected
                ? 'bg-accent text-primary'
                : 'bg-secondary text-gray-400 hover:text-white border border-border hover:border-accent/50'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
