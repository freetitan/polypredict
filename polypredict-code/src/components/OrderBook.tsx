'use client';

import { useState } from 'react';
import { Market, formatCurrency, formatNumber } from '@/lib/types';
import { ArrowUp, ArrowDown, Clock, BarChart2 } from 'lucide-react';

interface OrderBookProps {
  market: Market;
}

export default function OrderBook({ market }: OrderBookProps) {
  const [selectedOutcome, setSelectedOutcome] = useState(0);

  // Generate mock order book data
  const generateOrders = (basePrice: number, outcome: number) => {
    const orders = [];
    for (let i = 0; i < 5; i++) {
      orders.push({
        price: basePrice - (i * 0.01) + (Math.random() * 0.02),
        shares: Math.floor(Math.random() * 500) + 100,
        type: outcome === 0 ? 'buy' : 'sell'
      });
    }
    return orders;
  };

  const primaryOrders = generateOrders(market.probability[0] / 100, 0);
  const secondaryOrders = generateOrders(market.probability[1] / 100, 1);

  return (
    <div className="bg-secondary rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-white mb-4">订单簿</h3>

      {/* Outcome Tabs */}
      <div className="flex gap-2 mb-4">
        {market.outcomes.map((outcome, index) => (
          <button
            key={index}
            onClick={() => setSelectedOutcome(index)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedOutcome === index
                ? 'bg-accent text-primary'
                : 'bg-primary text-gray-400 hover:text-white'
            }`}
          >
            {outcome}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>价格</span>
          <span>份额</span>
        </div>
        {(selectedOutcome === 0 ? primaryOrders : secondaryOrders).map((order, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-2 px-3 rounded-lg ${
              order.type === 'buy' ? 'bg-success/10' : 'bg-danger/10'
            }`}
          >
            <div className="flex items-center gap-2">
              {order.type === 'buy' ? (
                <ArrowUp className="w-4 h-4 text-success" />
              ) : (
                <ArrowDown className="w-4 h-4 text-danger" />
              )}
              <span className={order.type === 'buy' ? 'text-success' : 'text-danger'}>
                ${order.price.toFixed(4)}
              </span>
            </div>
            <span className="text-white font-medium">{order.shares}</span>
          </div>
        ))}
      </div>

      {/* Spread Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">买卖价差</span>
          <span className="text-white">
            {(
              Math.abs(
                primaryOrders[0].price - secondaryOrders[0].price
              ) * 100
            ).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
