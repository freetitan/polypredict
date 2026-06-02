import { mockMarkets } from '@/lib/types';
import MarketPageClient from './MarketPageClient';

export async function generateStaticParams() {
  return mockMarkets.map((market) => ({
    id: market.id,
  }));
}

export default function MarketPage() {
  return <MarketPageClient />;
}
