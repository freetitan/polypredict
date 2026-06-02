'use client';

import { Market, formatNumber, formatCurrency } from '@/lib/types';
import { TrendingUp, Clock, BarChart2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  const primaryProb = market.probability[0];
  const secondaryProb = market.probability[1] || 0;
  const primaryOutcome = market.outcomes[0];
  const secondaryOutcome = market.outcomes[1];

  return (
    <Link href={`/market/${market.id}`}>
      <div className="bg-secondary rounded-xl p-5 border border-border hover:border-accent/50 transition-all cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            {market.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3 h-3" />
              {formatNumber(market.trades)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(market.endDate).toLocaleDateString('zh-CN')}
            </span>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-white mb-4 line-clamp-2 group-hover:text-accent transition-colors">
          {market.question}
        </h3>

        {/* Probability Display */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{primaryOutcome}</span>
            <span className={`text-lg font-bold ${primaryProb >= 50 ? 'text-success' : 'text-danger'}`}>
              {primaryProb}%
            </span>
          </div>
          {/* Probability Bar */}
          <div className="h-2 bg-primary rounded-full overflow-hidden">
            <div
              className="h-full probability-gradient rounded-full transition-all duration-500"
              style={{ width: `${primaryProb}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-400">{secondaryOutcome}</span>
            <span className={`text-sm font-medium ${secondaryProb >= 50 ? 'text-success' : 'text-danger'}`}>
              {secondaryProb}%
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span>{formatCurrency(market.volume)} 交易量</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-accent group-hover:translate-x-1 transition-transform">
            <span>交易</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
