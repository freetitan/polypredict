'use client';

import { useStore } from '@/store/store';
import { Wallet, LogOut, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/types';

export default function Navbar() {
  const { isWalletConnected, walletAddress, userBalance, connectWallet, disconnectWallet } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-white">PolyPredict</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              市场
            </Link>
            <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
              投资组合
            </Link>
            <Link href="/create" className="text-gray-300 hover:text-white transition-colors">
              创建市场
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {isWalletConnected ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary rounded-lg border border-border">
                  <span className="text-success text-sm font-medium">{formatCurrency(userBalance)}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg border border-border">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300">{walletAddress}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="p-2 hover:bg-primary rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-400" />
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors glow-accent"
              >
                <Wallet className="w-5 h-5" />
                <span>连接钱包</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
