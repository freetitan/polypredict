'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store/store';
import { categories } from '@/lib/types';
import { Plus, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CreateMarketPage() {
  const { isWalletConnected, connectWallet } = useStore();
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [outcomes, setOutcomes] = useState(['', '']);
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('Technology');
  const [initialLiquidity, setInitialLiquidity] = useState(1000);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const addOutcome = () => {
    if (outcomes.length < 5) {
      setOutcomes([...outcomes, '']);
    }
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index));
    }
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreating(false);
    setIsCreated(true);
  };

  const isValid = question.trim() && 
    description.trim() && 
    outcomes.every(o => o.trim()) && 
    endDate && 
    initialLiquidity > 0;

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="pt-24 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">连接钱包</h1>
            <p className="text-gray-400 mb-6">
              连接您的钱包以创建新的预测市场
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

  if (isCreated) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="pt-24 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">市场创建成功!</h1>
            <p className="text-gray-400 mb-6">
              您的预测市场已成功创建，现在可以在市场上进行交易了
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/"
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors"
              >
                返回首页
              </a>
              <button
                onClick={() => {
                  setIsCreated(false);
                  setStep(1);
                  setQuestion('');
                  setDescription('');
                  setOutcomes(['', '']);
                  setEndDate('');
                  setCategory('Technology');
                  setInitialLiquidity(1000);
                }}
                className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-white font-medium rounded-lg transition-colors border border-border"
              >
                创建另一个
              </button>
            </div>
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
        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-white mb-2">创建市场</h1>
          <p className="text-gray-400">创建一个新的预测市场，让其他人交易你的问题</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s
                    ? 'bg-accent text-primary'
                    : 'bg-secondary text-gray-400'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    step > s ? 'bg-accent' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-border">
          {/* Step 1: Question */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">市场问题</h2>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  问题描述 *
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例如: 比特币会在 2024 年底突破 100,000 美元吗?"
                  className="w-full px-4 py-3 bg-primary rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  详细说明
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="补充说明问题的细节和判定标准..."
                  className="w-full px-4 py-3 bg-primary rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  类别
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c.name !== '全部').map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        category === cat.name
                          ? 'bg-accent text-primary'
                          : 'bg-primary text-gray-400 hover:text-white border border-border'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  结束日期 *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!question.trim()}
                  className="px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Outcomes */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">结果选项</h2>
              <p className="text-gray-400 text-sm">
                添加2-5个可能的结果选项。交易者将根据他们认为会发生的结果进行交易。
              </p>

              <div className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => updateOutcome(index, e.target.value)}
                      placeholder={`结果 ${index + 1}`}
                      className="flex-1 px-4 py-3 bg-primary rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                    />
                    {outcomes.length > 2 && (
                      <button
                        onClick={() => removeOutcome(index)}
                        className="p-3 text-gray-400 hover:text-danger transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {outcomes.length < 5 && (
                <button
                  onClick={addOutcome}
                  className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加选项</span>
                </button>
              )}

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors border border-border"
                >
                  上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!outcomes.every(o => o.trim())}
                  className="px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Liquidity */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">初始流动性</h2>
              <p className="text-gray-400 text-sm">
                提供初始流动性以启动市场。流动性越高，交易者的体验越好。
              </p>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  初始流动性金额 (USDC)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={initialLiquidity}
                    onChange={(e) => setInitialLiquidity(Math.max(100, parseInt(e.target.value) || 100))}
                    className="w-full pl-8 pr-4 py-3 bg-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[500, 1000, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setInitialLiquidity(amt)}
                      className={`flex-1 py-2 text-sm rounded transition-colors ${
                        initialLiquidity === amt
                          ? 'bg-accent/20 text-accent'
                          : 'bg-primary text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-primary rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-white">市场摘要</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">问题</span>
                    <span className="text-white truncate ml-4">{question}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">选项数量</span>
                    <span className="text-white">{outcomes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">结束日期</span>
                    <span className="text-white">{endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">初始流动性</span>
                    <span className="text-white">${initialLiquidity}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors border border-border"
                >
                  上一步
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isValid || isCreating}
                  className="px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow-accent"
                >
                  {isCreating ? '创建中...' : '创建市场'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
