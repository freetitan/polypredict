import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PolyPredict - 预测市场',
  description: '交易预测事件结果，释放集体智慧的力量',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="bg-primary min-h-screen">{children}</body>
    </html>
  )
}
