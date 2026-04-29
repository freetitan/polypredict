export interface Market {
  id: string;
  question: string;
  description: string;
  outcomes: string[];
  probability: number[];
  volume: number;
  liquidity: number;
  endDate: string;
  category: string;
  createdAt: string;
  trades: number;
}

export interface UserPosition {
  marketId: string;
  marketQuestion: string;
  outcomeIndex: number;
  shares: number;
  avgPrice: number;
  currentValue: number;
  pnl: number;
}

export interface Trade {
  id: string;
  marketId: string;
  outcomeIndex: number;
  shares: number;
  price: number;
  timestamp: string;
  type: 'buy' | 'sell';
}

// Mock data for markets
export const mockMarkets: Market[] = [
  {
    id: '1',
    question: '比特币会在 2024 年底突破 100,000 美元吗?',
    description: '如果 BTC/USD 汇率在 2024 年 12 月 31 日前达到或超过 100,000 美元，则答案为是。',
    outcomes: ['是', '否'],
    probability: [35, 65],
    volume: 1245000,
    liquidity: 890000,
    endDate: '2024-12-31',
    category: 'Crypto',
    createdAt: '2024-01-15',
    trades: 3420
  },
  {
    id: '2',
    question: 'SpaceX 将在 2024 年进行首次载人火星任务?',
    description: '如果 SpaceX 在 2024 年 12 月 31 日前成功完成首次载人火星任务，则答案为是。',
    outcomes: ['是', '否'],
    probability: [12, 88],
    volume: 890000,
    liquidity: 560000,
    endDate: '2024-12-31',
    category: 'Space',
    createdAt: '2024-02-01',
    trades: 2156
  },
  {
    id: '3',
    question: '2024 年美国大选谁将获胜?',
    description: '预测 2024 年美国总统大选的获胜者。',
    outcomes: ['民主党', '共和党'],
    probability: [48, 52],
    volume: 5680000,
    liquidity: 2340000,
    endDate: '2024-11-05',
    category: 'Politics',
    createdAt: '2024-01-01',
    trades: 12450
  },
  {
    id: '4',
    question: '以太坊 ETF 会在 2024 年获批吗?',
    description: '美国 SEC 是否会在 2024 年批准现货以太坊 ETF。',
    outcomes: ['是', '否'],
    probability: [78, 22],
    volume: 2340000,
    liquidity: 1200000,
    endDate: '2024-12-31',
    category: 'Crypto',
    createdAt: '2024-01-20',
    trades: 5678
  },
  {
    id: '5',
    question: '苹果会在 2024 年发布 AR 眼镜吗?',
    description: 'Apple 是否会在 2024 年发布其 AR/MR 眼镜产品。',
    outcomes: ['是', '否'],
    probability: [42, 58],
    volume: 780000,
    liquidity: 450000,
    endDate: '2024-12-31',
    category: 'Technology',
    createdAt: '2024-02-15',
    trades: 1890
  },
  {
    id: '6',
    question: '2024 年奥运会金牌榜第一是哪个国家?',
    description: '预测 2024 年巴黎奥运会金牌榜第一名的国家。',
    outcomes: ['美国', '中国', '其他国家'],
    probability: [38, 45, 17],
    volume: 1560000,
    liquidity: 890000,
    endDate: '2024-08-11',
    category: 'Sports',
    createdAt: '2024-01-10',
    trades: 4567
  },
  {
    id: '7',
    question: 'ChatGPT-5 会在 2024 年发布吗?',
    description: 'OpenAI 是否会在 2024 年发布 GPT-5 模型。',
    outcomes: ['是', '否'],
    probability: [25, 75],
    volume: 890000,
    liquidity: 520000,
    endDate: '2024-12-31',
    category: 'Technology',
    createdAt: '2024-03-01',
    trades: 2345
  },
  {
    id: '8',
    question: '英伟达 2024 年股价会突破 1000 美元吗?',
    description: 'NVDA 股价在 2024 年内是否达到或超过 1000 美元。',
    outcomes: ['是', '否'],
    probability: [85, 15],
    volume: 3450000,
    liquidity: 1800000,
    endDate: '2024-12-31',
    category: 'Stocks',
    createdAt: '2024-01-25',
    trades: 7890
  }
];

export const mockUserPositions: UserPosition[] = [
  {
    marketId: '1',
    marketQuestion: '比特币会在 2024 年底突破 100,000 美元吗?',
    outcomeIndex: 0,
    shares: 100,
    avgPrice: 0.30,
    currentValue: 35,
    pnl: 5
  },
  {
    marketId: '4',
    marketQuestion: '以太坊 ETF 会在 2024 年获批吗?',
    outcomeIndex: 0,
    shares: 200,
    avgPrice: 0.70,
    currentValue: 156,
    pnl: 16
  },
  {
    marketId: '8',
    marketQuestion: '英伟达 2024 年股价会突破 1000 美元吗?',
    outcomeIndex: 0,
    shares: 150,
    avgPrice: 0.80,
    currentValue: 127.5,
    pnl: 7.5
  }
];

export const categories = [
  { name: '全部', icon: 'Grid3X3' },
  { name: 'Crypto', icon: 'Bitcoin' },
  { name: 'Politics', icon: 'Vote' },
  { name: 'Sports', icon: 'Trophy' },
  { name: 'Technology', icon: 'Cpu' },
  { name: 'Space', icon: 'Rocket' },
  { name: 'Stocks', icon: 'TrendingUp' }
];

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function getProbabilityColor(prob: number): string {
  if (prob >= 70) return 'text-success';
  if (prob >= 40) return 'text-warning';
  return 'text-danger';
}
