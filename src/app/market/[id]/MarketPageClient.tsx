'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TradingPanel from '@/components/TradingPanel';
import OrderBook from '@/components/OrderBook';
import MarketChart from '@/components/MarketChart';
import { mockMarkets, formatNumber, formatCurrency } from '@/lib/types';
import { ArrowLeft, Clock, BarChart2, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function MarketPageClient() {
  const params = useParams();
  const router = useRouter();
  const marketId = params.id as string;
  
  const market = mockMarkets.find(m => m.id === marketId);

  if (!market) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">市场未找到</h1>
          <Link href="/" className="text-accent hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const primaryProb = market.probability[0];
  const secondaryProb = market.probability[1] || 0;

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 px-4 bg-secondary/50 border-b border-border">
        <div className="max-w-7xl mx-auto py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </button>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-3 inline-block">
                {market.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {market.question}
              </h1>
              <p className="text-gray-400 max-w-2xl">{market.description}</p>
            </div>
            <div className="flex gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>结束: {new Date(market.endDate).toLocaleDateString('zh-CN')}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart2 className="w-4 h-4" />
                <span>{formatNumber(market.trades)} 交易</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Display */}
            <div className="bg-secondary rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">当前概率</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span>{formatCurrency(market.volume)} 交易量</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {market.outcomes.map((outcome, index) => {
                  const prob = market.probability[index];
                  const isHigher = prob >= 50;
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        index === 0
                          ? 'border-success bg-success/5'
                          : 'border-danger bg-danger/5'
                      }`}
                    >
                      <p className="text-gray-400 mb-2">{outcome}</p>
                      <p className={`text-4xl font-bold ${isHigher ? 'text-success' : 'text-danger'}`}>
                        {prob}%
                      </p>
                      <div className="mt-3 h-2 bg-primary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${index === 0 ? 'bg-success' : 'bg-danger'}`}
                          style={{ width: `${prob}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart */}
            <MarketChart 
              initialProbability={primaryProb} 
              question={market.question}
            />

            {/* Market Info */}
            <div className="bg-secondary rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-white mb-4">市场详情</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">流动性</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{formatCurrency(market.liquidity)}</p>
                </div>
                <div className="bg-primary rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <BarChart2 className="w-4 h-4" />
                    <span className="text-sm">总交易</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{formatNumber(market.trades)}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-gray-400 mb-2">市场 ID</p>
                <div className="flex items-center gap-2">
                  <code className="text-accent text-sm bg-primary px-3 py-1 rounded">
                    {market.id}
                  </code>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trading */}
          <div className="space-y-6">
            <TradingPanel
              marketId={market.id}
              outcomes={market.outcomes}
              probabilities={market.probability}
            />
            <OrderBook market={market} />
          </div>
        </div>
      </div>
    </div>
  );
}
