import { create } from 'zustand';
import { Market, UserPosition, Trade, mockMarkets, mockUserPositions } from '../lib/types';

interface AppState {
  markets: Market[];
  userPositions: UserPosition[];
  userBalance: number;
  selectedCategory: string;
  searchQuery: string;
  isWalletConnected: boolean;
  walletAddress: string | null;
  
  // Actions
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  placeTrade: (marketId: string, outcomeIndex: number, shares: number, price: number, type: 'buy' | 'sell') => boolean;
  getFilteredMarkets: () => Market[];
}

export const useStore = create<AppState>((set, get) => ({
  markets: mockMarkets,
  userPositions: mockUserPositions,
  userBalance: 1000,
  selectedCategory: '全部',
  searchQuery: '',
  isWalletConnected: false,
  walletAddress: null,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  connectWallet: () => set({ 
    isWalletConnected: true, 
    walletAddress: '0x742d35Cc6634C0532F...8F21' 
  }),

  disconnectWallet: () => set({ 
    isWalletConnected: false, 
    walletAddress: null 
  }),

  placeTrade: (marketId, outcomeIndex, shares, price, type) => {
    const state = get();
    const cost = shares * price;
    
    if (type === 'buy' && cost > state.userBalance) {
      return false;
    }

    set((state) => ({
      userBalance: type === 'buy' 
        ? state.userBalance - cost 
        : state.userBalance + cost,
      userPositions: state.userPositions.map(pos => {
        if (pos.marketId === marketId && pos.outcomeIndex === outcomeIndex) {
          const newShares = type === 'buy' 
            ? pos.shares + shares 
            : pos.shares - shares;
          const newAvgPrice = type === 'buy'
            ? (pos.avgPrice * pos.shares + price * shares) / newShares
            : pos.avgPrice;
          return {
            ...pos,
            shares: newShares,
            avgPrice: newAvgPrice,
            currentValue: newShares * price,
            pnl: newShares * price - newShares * newAvgPrice
          };
        }
        return pos;
      }).filter(pos => pos.shares > 0)
    }));

    return true;
  },

  getFilteredMarkets: () => {
    const state = get();
    return state.markets.filter(market => {
      const matchesCategory = state.selectedCategory === '全部' || market.category === state.selectedCategory;
      const matchesSearch = state.searchQuery === '' || 
        market.question.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}));
