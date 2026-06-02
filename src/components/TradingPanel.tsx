'use client';

import { useState } from 'react';
import { useStore } from '@/store/store';
import { formatCurrency } from '@/lib/types';
import { ArrowUpDown, AlertCircle } from 'lucide-react';

interface TradingPanelProps {
  marketId: string;
  outcomes: string[];
  probabilities: number[];
}

export default function TradingPanel({ marketId, outcomes, probabilities }: TradingPanelProps) {
  const { placeTrade, userBalance, isWalletConnected, connectWallet } = useStore();
  const [selectedOutcome, setSelectedOutcome] = useState(0);
  const [shares, setShares] = useState(10);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [showSuccess, setShowSuccess] = useState(false);

  const currentProb = probabilities[selectedOutcome];
  const currentPrice = currentProb / 100;
  const totalCost = shares * currentPrice;

  const handleTrade = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    const success = placeTrade(marketId, selectedOutcome, shares, currentPrice, tradeType);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="bg-secondary rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-white mb-6">交易面板</h3>

      {/* Trade Type Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            tradeType === 'buy'
              ? 'bg-success text-primary'
              : 'bg-primary text-gray-400 hover:text-white'
          }`}
        >
          买入
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            tradeType === 'sell'
              ? 'bg-danger text-white'
              : 'bg-primary text-gray-400 hover:text-white'
          }`}
        >
          卖出
        </button>
      </div>

      {/* Outcome Selection */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">选择结果</label>
        <div className="flex gap-2">
          {outcomes.map((outcome, index) => (
            <button
              key={index}
              onClick={() => setSelectedOutcome(index)}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                selectedOutcome === index
                  ? 'bg-accent text-primary'
                  : 'bg-primary text-gray-400 hover:text-white border border-border hover:border-accent/50'
              }`}
            >
              {outcome}
              <span className="block text-sm mt-1">{probabilities[index]}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shares Input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">份额数量</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShares(Math.max(1, shares - 10))}
            className="p-2 bg-primary rounded-lg text-gray-400 hover:text-white"
          >
            -
          </button>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
            className="flex-1 px-4 py-2 bg-primary rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={() => setShares(shares + 10)}
            className="p-2 bg-primary rounded-lg text-gray-400 hover:text-white"
          >
            +
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          {[10, 50, 100, 500].map((amt) => (
            <button
              key={amt}
              onClick={() => setShares(amt)}
              className={`flex-1 py-1 text-sm rounded transition-colors ${
                shares === amt
                  ? 'bg-accent/20 text-accent'
                  : 'bg-primary text-gray-500 hover:text-gray-300'
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-primary rounded-lg p-4 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">当前价格</span>
          <span className="text-white">{formatCurrency(currentPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">份额数量</span>
          <span className="text-white">{shares}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">手续费 (1%)</span>
          <span className="text-white">{formatCurrency(totalCost * 0.01)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="text-white font-medium">
            {tradeType === 'buy' ? '总成本' : '总收入'}
          </span>
          <span className="text-white font-bold">
            {formatCurrency(totalCost * 1.01)}
          </span>
        </div>
      </div>

      {/* Balance Warning */}
      {tradeType === 'buy' && totalCost > userBalance && (
        <div className="flex items-center gap-2 text-danger text-sm mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>余额不足 (余额: {formatCurrency(userBalance)})</span>
        </div>
      )}

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={tradeType === 'buy' && totalCost > userBalance}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          tradeType === 'buy'
            ? 'bg-success hover:bg-success/90 text-primary disabled:bg-gray-600'
            : 'bg-danger hover:bg-danger/90 text-white disabled:bg-gray-600'
        } ${showSuccess ? 'glow-success' : ''}`}
      >
        {isWalletConnected ? (
          showSuccess ? '交易成功!' : (tradeType === 'buy' ? '买入' : '卖出')
        ) : (
          '连接钱包'
        )}
      </button>
    </div>
  );
}
