// 首页组件

import React from 'react';

interface HomePageProps {
  onStart: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-space-blue to-space-dark">
      <div className="text-center px-6 max-w-2xl">
        {/* 火箭图标 */}
        <div className="mb-8 flex justify-center">
          <svg width="120" height="180" viewBox="0 0 120 180" className="animate-float">
            {/* 整流罩 */}
            <path d="M 60 10 L 40 50 L 80 50 Z" fill="#ff6b35" />
            {/* 箭体 */}
            <rect x="40" y="50" width="40" height="80" fill="#1a3648" rx="4" />
            {/* 窗口 */}
            <circle cx="60" cy="70" r="8" fill="#87ceeb" opacity="0.8" />
            <circle cx="60" cy="90" r="8" fill="#87ceeb" opacity="0.8" />
            <circle cx="60" cy="110" r="8" fill="#87ceeb" opacity="0.8" />
            {/* 尾翼 */}
            <path d="M 40 130 L 20 160 L 40 160 Z" fill="#ff6b35" />
            <path d="M 80 130 L 100 160 L 80 160 Z" fill="#ff6b35" />
            {/* 火焰 */}
            <ellipse cx="60" cy="165" rx="15" ry="10" fill="#ffd700" className="animate-pulse" />
            <ellipse cx="60" cy="170" rx="10" ry="8" fill="#ff6b35" className="animate-pulse" />
          </svg>
        </div>

        {/* 标题 */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide">
          小火箭手
        </h1>
        
        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-orange-light mb-8">
          Little Rocket Builder
        </p>

        {/* 描述 */}
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          欢迎来到太空探索世界！<br />
          拖拽部件组装你的专属火箭，<br />
          发射升空，完成激动人心的太空任务！
        </p>

        {/* 开始按钮 */}
        <button
          onClick={onStart}
          className="px-12 py-4 bg-orange-light hover:bg-orange-600 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
        >
          🚀 开始拼装
        </button>

        {/* 特性列表 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="text-white font-bold mb-2">自由拼装</h3>
            <p className="text-gray-300 text-sm">拖拽各种部件，打造独一无二的火箭</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-2">🎬</div>
            <h3 className="text-white font-bold mb-2">发射动画</h3>
            <p className="text-gray-300 text-sm">观看精彩的火箭发射全过程</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-2">🌟</div>
            <h3 className="text-white font-bold mb-2">太空任务</h3>
            <p className="text-gray-300 text-sm">完成各种有趣的太空探索任务</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
