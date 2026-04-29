'use client';

import Navbar from '@/components/Navbar';
import MarketCard from '@/components/MarketCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { useStore } from '@/store/store';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { formatNumber } from '@/lib/types';

export default function HomePage() {
  const { markets, getFilteredMarkets, isWalletConnected, connectWallet } = useStore();
  const filteredMarkets = getFilteredMarkets();

  // Calculate stats
  const totalVolume = markets.reduce((acc, m) => acc + m.volume, 0);
  const totalTrades = markets.reduce((acc, m) => acc + m.trades, 0);
  const totalLiquidity = markets.reduce((acc, m) => acc + m.liquidity, 0);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              预测市场
              <span className="text-accent"> 交易</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              在这里，你可以交易任何事件的结果概率。释放集体智慧的力量，做出更准确的预测。
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <DollarSign className="w-4 h-4 text-success" />
                <span className="text-sm">总交易量</span>
              </div>
              <p className="text-2xl font-bold text-white">${formatNumber(totalVolume)}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm">活跃市场</span>
              </div>
              <p className="text-2xl font-bold text-white">{markets.length}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Users className="w-4 h-4 text-warning" />
                <span className="text-sm">交易次数</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatNumber(totalTrades)}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm">流动性</span>
              </div>
              <p className="text-2xl font-bold text-white">${formatNumber(totalLiquidity)}</p>
            </div>
          </div>

          {/* Connect Wallet CTA */}
          {!isWalletConnected && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">开始交易</h3>
              <p className="text-gray-400 mb-4">连接钱包以开始在预测市场上进行交易</p>
              <button
                onClick={connectWallet}
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors glow-accent"
              >
                连接钱包
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Markets Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6">热门市场</h2>
        
        <SearchBar />
        <CategoryFilter />

        {filteredMarkets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">没有找到匹配的市场</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
