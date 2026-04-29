'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/types';

interface MarketChartProps {
  initialProbability: number;
  question: string;
}

// Generate mock price history
const generatePriceHistory = (basePrice: number) => {
  const history = [];
  let price = basePrice * 0.6;
  
  for (let i = 0; i < 30; i++) {
    price += (Math.random() - 0.48) * 0.02;
    price = Math.max(0.01, Math.min(0.99, price));
    history.push({
      day: i,
      price: price * 100,
      volume: Math.floor(Math.random() * 1000) + 500
    });
  }
  // End at the current price
  history[history.length - 1].price = basePrice * 100;
  
  return history;
};

export default function MarketChart({ initialProbability, question }: MarketChartProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('30d');
  const priceHistory = generatePriceHistory(initialProbability / 100);

  const minPrice = Math.min(...priceHistory.map(p => p.price));
  const maxPrice = Math.max(...priceHistory.map(p => p.price));
  const range = maxPrice - minPrice;

  const getY = (price: number) => {
    return 100 - ((price - minPrice) / range) * 80 - 10;
  };

  const pathData = priceHistory
    .map((p, i) => {
      const x = (i / (priceHistory.length - 1)) * 100;
      const y = getY(p.price);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = pathData + ` L 100 100 L 0 100 Z`;

  const priceChange = priceHistory[priceHistory.length - 1].price - priceHistory[0].price;
  const percentChange = (priceChange / priceHistory[0].price) * 100;

  return (
    <div className="bg-secondary rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">价格历史</h3>
          <p className="text-sm text-gray-500 truncate max-w-xs">{question}</p>
        </div>
        <div className="flex gap-1 bg-primary rounded-lg p-1">
          {(['24h', '7d', '30d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                timeRange === range
                  ? 'bg-accent text-primary'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {range === '24h' ? '24小时' : range === '7d' ? '7天' : range === '30d' ? '30天' : '全部'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#2D2D2D"
              strokeWidth="0.2"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#gradient)"
            opacity="0.3"
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#00C2CB"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Current price dot */}
          <circle
            cx="100"
            cy={getY(priceHistory[priceHistory.length - 1].price)}
            r="1.5"
            fill="#00C2CB"
          />
          
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C2CB" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00C2CB" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 -ml-2">
          <span>{maxPrice.toFixed(0)}%</span>
          <span>{minPrice.toFixed(0)}%</span>
        </div>
      </div>

      {/* Current price */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-500 text-sm">当前价格</span>
          <p className="text-2xl font-bold text-white">
            {priceHistory[priceHistory.length - 1].price.toFixed(1)}%
          </p>
        </div>
        <div className="text-right">
          <span className="text-gray-500 text-sm">30天变化</span>
          <p className={`text-lg font-semibold ${percentChange >= 0 ? 'text-success' : 'text-danger'}`}>
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
