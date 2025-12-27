// 装配区火箭预览组件

import React from 'react';
import type { RocketConfig } from '../types/game';
import { PART_POSITIONS } from '../data/gameData';

interface AssemblyRocketProps {
  config: RocketConfig;
  scale?: number;
}

const AssemblyRocket: React.FC<AssemblyRocketProps> = ({ config, scale = 1 }) => {
  const renderPart = (partType: keyof RocketConfig) => {
    const part = config[partType];
    if (!part) return null;

    const position = PART_POSITIONS[partType];
    const color = part.color;

    switch (partType) {
      case 'nosecone':
        return (
          <div
            key={partType}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: position.top, height: position.height }}
          >
            <svg width={80 * scale} height={80 * scale} viewBox="0 0 80 80" className="w-full h-full">
              <path d="M 40 5 L 15 75 L 65 75 Z" fill={color} />
              <path d="M 40 5 L 15 75 L 65 75 Z" fill="white" opacity="0.2" />
            </svg>
          </div>
        );
      case 'body':
        return (
          <div
            key={partType}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: position.top, height: position.height }}
          >
            <svg width={80 * scale} height={160 * scale} viewBox="0 0 80 160" className="w-full h-full">
              <rect x="15" y="0" width="50" height="160" fill={color} rx="5" />
              <circle cx="40" cy="40" r="12" fill="white" opacity="0.5" />
              <circle cx="40" cy="80" r="12" fill="white" opacity="0.5" />
              <circle cx="40" cy="120" r="12" fill="white" opacity="0.5" />
              <rect x="15" y="0" width="50" height="160" fill="white" opacity="0.1" rx="5" />
            </svg>
          </div>
        );
      case 'booster':
        return (
          <div
            key={partType}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: position.top, height: position.height }}
          >
            <svg width={100 * scale} height={80 * scale} viewBox="0 0 100 80" className="w-full h-full">
              <rect x="10" y="0" width="20" height="70" fill={color} rx="3" />
              <rect x="70" y="0" width="20" height="70" fill={color} rx="3" />
              <ellipse cx="20" cy="70" rx="10" ry="6" fill="#ffd700" opacity="0.6" />
              <ellipse cx="80" cy="70" rx="10" ry="6" fill="#ffd700" opacity="0.6" />
            </svg>
          </div>
        );
      case 'fins':
        return (
          <div
            key={partType}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: position.top, height: position.height }}
          >
            <svg width={120 * scale} height={80 * scale} viewBox="0 0 120 80" className="w-full h-full">
              <path d="M 20 0 L 5 70 L 20 70 Z" fill={color} />
              <rect x="20" y="0" width="80" height="70" fill={color} opacity="0.2" />
              <path d="M 100 0 L 115 70 L 100 70 Z" fill={color} />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full">
      {renderPart('nosecone')}
      {renderPart('body')}
      {renderPart('booster')}
      {renderPart('fins')}
    </div>
  );
};

export default AssemblyRocket;
