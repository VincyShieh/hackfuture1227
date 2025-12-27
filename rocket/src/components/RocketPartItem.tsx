// 火箭部件组件

import React from 'react';
import type { RocketPart } from '../types/game';

interface RocketPartItemProps {
  part: RocketPart;
  onDragStart: (part: RocketPart) => void;
}

const RocketPartItem: React.FC<RocketPartItemProps> = ({ part, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(part));
    onDragStart(part);
  };

  // 根据部件类型渲染不同的SVG图标
  const renderPartIcon = () => {
    switch (part.type) {
      case 'nosecone':
        return (
          <svg width="60" height="40" viewBox="0 0 60 40">
            <path d="M 30 5 L 10 35 L 50 35 Z" fill={part.color} />
          </svg>
        );
      case 'body':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60">
            <rect x="15" y="5" width="30" height="50" fill={part.color} rx="3" />
            <circle cx="30" cy="20" r="5" fill="white" opacity="0.6" />
            <circle cx="30" cy="35" r="5" fill="white" opacity="0.6" />
          </svg>
        );
      case 'fins':
        return (
          <svg width="60" height="40" viewBox="0 0 60 40">
            <path d="M 15 5 L 5 35 L 15 35 Z" fill={part.color} />
            <rect x="15" y="5" width="30" height="30" fill={part.color} opacity="0.3" />
            <path d="M 45 5 L 55 35 L 45 35 Z" fill={part.color} />
          </svg>
        );
      case 'booster':
        return (
          <svg width="60" height="50" viewBox="0 0 60 50">
            <rect x="10" y="5" width="15" height="40" fill={part.color} rx="2" />
            <rect x="35" y="5" width="15" height="40" fill={part.color} rx="2" />
            <ellipse cx="17.5" cy="45" rx="7" ry="4" fill="#ffd700" opacity="0.7" />
            <ellipse cx="42.5" cy="45" rx="7" ry="4" fill="#ffd700" opacity="0.7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg p-4 shadow-md cursor-move hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-transparent hover:border-orange-light"
    >
      <div className="flex flex-col items-center">
        <div className="mb-2">{renderPartIcon()}</div>
        <h3 className="font-bold text-sm text-space-blue mb-1">{part.name}</h3>
        <p className="text-xs text-gray-600 text-center">{part.description}</p>
      </div>
    </div>
  );
};

export default RocketPartItem;
