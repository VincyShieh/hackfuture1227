// 装配车间组件

import React, { useState } from 'react';
import type { RocketPart, RocketConfig, PartType } from '../types/game';
import { ROCKET_PARTS } from '../data/gameData';
import RocketPartItem from './RocketPartItem';
import AssemblyRocket from './AssemblyRocket';
import { soundManager } from '../utils/soundManager';

interface WorkshopPageProps {
  initialConfig?: RocketConfig;
  onLaunch: (config: RocketConfig) => void;
  onBack: () => void;
}

const WorkshopPage: React.FC<WorkshopPageProps> = ({ initialConfig, onLaunch, onBack }) => {
  const [rocketConfig, setRocketConfig] = useState<RocketConfig>(initialConfig || {});
  const [draggedPart, setDraggedPart] = useState<RocketPart | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (part: RocketPart) => {
    setDraggedPart(part);
    soundManager.play('drag', 0.5);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    if (!draggedPart) return;

    // 更新火箭配置
    setRocketConfig(prev => ({
      ...prev,
      [draggedPart.type]: {
        partType: draggedPart.type,
        color: draggedPart.color
      }
    }));

    soundManager.play('drop', 0.7);
    setDraggedPart(null);
  };

  const handleRemovePart = (partType: PartType) => {
    setRocketConfig(prev => {
      const newConfig = { ...prev };
      delete newConfig[partType];
      return newConfig;
    });
  };

  const isRocketComplete = () => {
    return rocketConfig.body && rocketConfig.nosecone && rocketConfig.fins;
  };

  const handleLaunch = () => {
    if (isRocketComplete()) {
      soundManager.play('launch', 0.8);
      onLaunch(rocketConfig);
    }
  };

  // 按类型分组部件
  const partsByType = ROCKET_PARTS.reduce((acc, part) => {
    if (!acc[part.type]) {
      acc[part.type] = [];
    }
    acc[part.type].push(part);
    return acc;
  }, {} as Record<PartType, RocketPart[]>);

  const typeNames: Record<PartType, string> = {
    nosecone: '整流罩',
    body: '箭体',
    booster: '助推器',
    fins: '尾翼'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* 顶部工具栏 */}
      <div className="bg-space-blue text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            ← 返回首页
          </button>
          <h2 className="text-2xl font-bold">🔧 火箭装配车间</h2>
          <button
            onClick={handleLaunch}
            disabled={!isRocketComplete()}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              isRocketComplete()
                ? 'bg-orange-light hover:bg-orange-600 text-white shadow-lg hover:scale-105'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            🚀 发射火箭
          </button>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 gap-4">
        {/* 左侧部件列表 */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-space-blue mb-4">可用部件</h3>
          <p className="text-sm text-gray-600 mb-6">拖拽部件到右侧装配区</p>
          
          {Object.entries(partsByType).map(([type, parts]) => (
            <div key={type} className="mb-6">
              <h4 className="font-bold text-space-blue mb-3 flex items-center">
                <span className="w-2 h-2 bg-orange-light rounded-full mr-2"></span>
                {typeNames[type as PartType]}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {parts.map(part => (
                  <RocketPartItem
                    key={part.id}
                    part={part}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 右侧装配区 */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-bold text-space-blue mb-4">装配区</h3>
          
          {/* 装配状态提示 */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${rocketConfig.nosecone ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  整流罩 {rocketConfig.nosecone ? '✓' : '○'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${rocketConfig.body ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  箭体 {rocketConfig.body ? '✓' : '○'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${rocketConfig.fins ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  尾翼 {rocketConfig.fins ? '✓' : '○'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${rocketConfig.booster ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  助推器 {rocketConfig.booster ? '✓' : '(可选)'}
                </span>
              </div>
            </div>
          </div>

          {/* 火箭装配显示区 */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 relative border-4 border-dashed rounded-xl transition-all ${
              isDraggingOver
                ? 'border-orange-light bg-orange-50'
                : 'border-gray-300 bg-gradient-to-b from-blue-50 to-blue-100'
            }`}
            style={{ minHeight: '500px' }}
          >
            {Object.keys(rocketConfig).length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p>拖拽部件到这里开始组装</p>
                </div>
              </div>
            ) : (
              <AssemblyRocket config={rocketConfig} />
            )}
          </div>

          {/* 已装配部件列表 */}
          {Object.keys(rocketConfig).length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-sm text-gray-700 mb-2">已装配部件：</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(rocketConfig).map(([type]) => (
                  <button
                    key={type}
                    onClick={() => handleRemovePart(type as PartType)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-sm transition-colors"
                  >
                    {typeNames[type as PartType]} ✕
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;
