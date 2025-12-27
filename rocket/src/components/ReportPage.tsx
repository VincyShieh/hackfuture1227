// 任务报告组件

import React, { useState, useEffect } from 'react';
import type { RocketConfig, MissionStory } from '../types/game';
import { MISSION_STORIES } from '../data/gameData';
import AssemblyRocket from './AssemblyRocket';
import { encodeConfigToUrl, copyToClipboard } from '../utils/storage';
import { soundManager } from '../utils/soundManager';

interface ReportPageProps {
  config: RocketConfig;
  onPlayAgain: () => void;
}

const ReportPage: React.FC<ReportPageProps> = ({ config, onPlayAgain }) => {
  const [mission, setMission] = useState<MissionStory | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    // 随机选择一个任务故事
    const randomMission = MISSION_STORIES[Math.floor(Math.random() * MISSION_STORIES.length)];
    setMission(randomMission);
    soundManager.play('success', 0.6);
  }, []);

  const handleShare = async () => {
    const shareUrl = encodeConfigToUrl(config);
    const success = await copyToClipboard(shareUrl);
    
    if (success) {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    }
  };

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-space-blue to-space-dark">
        <div className="text-white text-2xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-blue to-space-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 成功标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            任务成功！
          </h1>
          <p className="text-xl text-orange-light">Mission Accomplished</p>
        </div>

        {/* 任务卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          {/* 任务信息 */}
          <div className="bg-gradient-to-r from-orange-light to-orange-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{mission.title}</h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                🏆 {mission.achievement}
              </span>
            </div>
          </div>

          {/* 任务描述和火箭展示 */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 左侧：任务描述 */}
              <div>
                <h3 className="text-lg font-bold text-space-blue mb-4">任务详情</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {mission.description}
                </p>

                {/* 火箭统计 */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-space-blue mb-3">火箭配置</h4>
                  <div className="space-y-2 text-sm">
                    {config.nosecone && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: config.nosecone.color }} />
                        <span className="text-gray-700">整流罩</span>
                      </div>
                    )}
                    {config.body && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: config.body.color }} />
                        <span className="text-gray-700">箭体</span>
                      </div>
                    )}
                    {config.booster && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: config.booster.color }} />
                        <span className="text-gray-700">助推器</span>
                      </div>
                    )}
                    {config.fins && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: config.fins.color }} />
                        <span className="text-gray-700">尾翼</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 右侧：火箭缩略图 */}
              <div>
                <h3 className="text-lg font-bold text-space-blue mb-4">你的火箭</h3>
                <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-6 h-80 relative">
                  <AssemblyRocket config={config} scale={0.8} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 bg-orange-light hover:bg-orange-600 text-white text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            🔧 再次拼装
          </button>

          <button
            onClick={handleShare}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-space-blue text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-space-blue"
          >
            📤 分享火箭
          </button>

          <button
            onClick={() => window.location.href = '/index.html#level3'}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            🚀 继续探索-宇宙漫游
          </button>
        </div>

        {/* 复制成功提示 */}
        {showCopySuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
            ✓ 链接已复制到剪贴板！
          </div>
        )}

        {/* 成就徽章 */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">获得成就</h3>
            <p className="text-xl text-orange-light">{mission.achievement}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
