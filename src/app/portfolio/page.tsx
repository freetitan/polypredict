'use client';

import Navbar from '@/components/Navbar';
import { useStore } from '@/store/store';
import { formatCurrency } from '@/lib/types';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const { userPositions, userBalance, isWalletConnected, connectWallet } = useStore();

  const totalValue = userBalance + userPositions.reduce((acc, pos) => acc + pos.currentValue, 0);
  const totalPnl = userPositions.reduce((acc, pos) => acc + pos.pnl, 0);

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="pt-24 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <Wallet className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">连接钱包</h1>
            <p className="text-gray-400 mb-6">
              连接您的钱包以查看投资组合和交易历史
            </p>
            <button
              onClick={connectWallet}
              className="px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors glow-accent"
            >
              连接钱包
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 px-4 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-white mb-6">我的投资组合</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Wallet className="w-4 h-4 text-accent" />
                <span className="text-sm">总价值</span>
              </div>
              <p className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</p>
            </div>
            <div className="bg-secondary rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <PieChart className="w-4 h-4 text-success" />
                <span className="text-sm">可用余额</span>
              </div>
              <p className="text-3xl font-bold text-white">{formatCurrency(userBalance)}</p>
            </div>
            <div className="bg-secondary rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                {totalPnl >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-danger" />
                )}
                <span className="text-sm">总盈亏</span>
              </div>
              <p className={`text-3xl font-bold ${totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Positions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold text-white mb-4">当前持仓</h2>
        
        {userPositions.length === 0 ? (
          <div className="bg-secondary rounded-xl p-12 text-center border border-border">
            <PieChart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">暂无持仓</h3>
            <p className="text-gray-400 mb-6">开始在市场上交易以构建您的投资组合</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors"
            >
              浏览市场
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userPositions.map((position) => (
              <Link
                key={`${position.marketId}-${position.outcomeIndex}`}
                href={`/market/${position.marketId}`}
                className="block bg-secondary rounded-xl p-5 border border-border hover:border-accent/50 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-2 truncate">
                      {position.marketQuestion}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>份额: {position.shares}</span>
                      <span>均价: {formatCurrency(position.avgPrice)}</span>
                      <span>当前: {formatCurrency(position.currentValue / position.shares)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">
                      {formatCurrency(position.currentValue)}
                    </p>
                    <p className={`text-sm ${position.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
