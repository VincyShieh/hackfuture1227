// 发射动画组件

import React, { useEffect, useState } from 'react';
import type { RocketConfig } from '../types/game';

interface LaunchAnimationProps {
  config: RocketConfig;
  onComplete: () => void;
}

const LaunchAnimation: React.FC<LaunchAnimationProps> = ({ config, onComplete }) => {
  const [phase, setPhase] = useState<'countdown' | 'liftoff' | 'booster-sep' | 'fairing-sep' | 'orbit'>('countdown');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 倒计时阶段
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'countdown' && countdown === 0) {
      setTimeout(() => setPhase('liftoff'), 500);
      return;
    }

    // 发射阶段时间线
    const timers: NodeJS.Timeout[] = [];

    if (phase === 'liftoff') {
      // 3秒后助推器分离
      timers.push(setTimeout(() => setPhase('booster-sep'), 3000));
    } else if (phase === 'booster-sep') {
      // 2秒后整流罩打开
      timers.push(setTimeout(() => setPhase('fairing-sep'), 2000));
    } else if (phase === 'fairing-sep') {
      // 3秒后进入轨道
      timers.push(setTimeout(() => setPhase('orbit'), 3000));
    } else if (phase === 'orbit') {
      // 显示成功信息后完成
      timers.push(setTimeout(onComplete, 2000));
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [phase, countdown, onComplete]);

  const renderRocket = () => {
    const showBooster = (phase === 'liftoff' || phase === 'booster-sep') && config.booster;
    const showFairing = phase !== 'orbit';

    return (
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          phase === 'countdown' ? 'bottom-10' : ''
        } ${
          phase === 'liftoff' ? 'bottom-1/3 animate-shake' : ''
        } ${
          phase === 'booster-sep' ? 'bottom-1/2' : ''
        } ${
          phase === 'fairing-sep' ? 'bottom-2/3' : ''
        } ${
          phase === 'orbit' ? 'bottom-full' : ''
        }`}
        style={{
          animation: phase !== 'countdown' ? 'rocketFly 8s ease-in forwards' : 'none'
        }}
      >
        <div className="relative">
          {/* 整流罩 */}
          {showFairing && config.nosecone && (
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                phase === 'fairing-sep' ? 'opacity-0 scale-150' : 'opacity-100'
              }`}
              style={{ top: '-40px' }}
            >
              <svg width="60" height="50" viewBox="0 0 60 50">
                <path d="M 30 5 L 10 45 L 50 45 Z" fill={config.nosecone.color} />
              </svg>
            </div>
          )}

          {/* 箭体 */}
          {config.body && (
            <div className="relative">
              <svg width="60" height="100" viewBox="0 0 60 100">
                <rect x="15" y="0" width="30" height="100" fill={config.body.color} rx="3" />
                <circle cx="30" cy="25" r="6" fill="white" opacity="0.5" />
                <circle cx="30" cy="50" r="6" fill="white" opacity="0.5" />
                <circle cx="30" cy="75" r="6" fill="white" opacity="0.5" />
              </svg>
            </div>
          )}

          {/* 尾翼 */}
          {config.fins && (
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '80px' }}>
              <svg width="80" height="40" viewBox="0 0 80 40">
                <path d="M 15 0 L 5 35 L 15 35 Z" fill={config.fins.color} />
                <path d="M 65 0 L 75 35 L 65 35 Z" fill={config.fins.color} />
              </svg>
            </div>
          )}

          {/* 助推器 */}
          {showBooster && (
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                phase === 'booster-sep' ? 'opacity-0 translate-y-20 scale-75' : 'opacity-100'
              }`}
              style={{ top: '90px' }}
            >
              <svg width="80" height="40" viewBox="0 0 80 40">
                <rect x="5" y="0" width="12" height="35" fill={config.booster!.color} rx="2" />
                <rect x="63" y="0" width="12" height="35" fill={config.booster!.color} rx="2" />
              </svg>
            </div>
          )}

          {/* 火焰效果 */}
          {phase !== 'countdown' && (
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '120px' }}>
              <div className="relative">
                {/* 主火焰 */}
                <div className="animate-pulse">
                  <svg width="40" height="60" viewBox="0 0 40 60">
                    <ellipse cx="20" cy="10" rx="15" ry="20" fill="#ffd700" opacity="0.9" />
                    <ellipse cx="20" cy="20" rx="12" ry="25" fill="#ff6b35" opacity="0.8" />
                    <ellipse cx="20" cy="30" rx="8" ry="20" fill="#ff4500" opacity="0.7" />
                  </svg>
                </div>
                {/* 粒子效果 */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-particle"
                      style={{
                        left: `${20 + Math.sin(i) * 15}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.8s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-2000 ${
        phase === 'countdown' || phase === 'liftoff'
          ? 'bg-gradient-to-b from-blue-400 to-blue-200'
          : phase === 'booster-sep'
          ? 'bg-gradient-to-b from-blue-600 to-blue-400'
          : 'bg-gradient-to-b from-indigo-900 to-black'
      }`}
    >
      {/* 星星（轨道阶段） */}
      {(phase === 'fairing-sep' || phase === 'orbit') && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 地面 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-700">
        <div className="absolute top-0 left-0 right-0 h-2 bg-green-600" />
        {/* 发射台 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0">
          <svg width="100" height="80" viewBox="0 0 100 80">
            <rect x="10" y="60" width="80" height="20" fill="#666" />
            <rect x="20" y="40" width="10" height="40" fill="#888" />
            <rect x="70" y="40" width="10" height="40" fill="#888" />
            <rect x="45" y="50" width="10" height="30" fill="#888" />
          </svg>
        </div>
      </div>

      {/* 火箭 */}
      {renderRocket()}

      {/* 倒计时显示 */}
      {phase === 'countdown' && countdown > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-9xl font-bold text-white animate-ping-once">
            {countdown}
          </div>
        </div>
      )}

      {/* 发射提示 */}
      {phase === 'liftoff' && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold animate-bounce">
          🚀 点火发射！
        </div>
      )}

      {/* 助推器分离提示 */}
      {phase === 'booster-sep' && config.booster && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
          助推器分离 ✓
        </div>
      )}

      {/* 整流罩分离提示 */}
      {phase === 'fairing-sep' && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
          整流罩打开 ✓
        </div>
      )}

      {/* 成功提示 */}
      {phase === 'orbit' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl font-bold text-yellow-400 mb-4 animate-bounce">
            🎉 Mission Success! 🎉
          </div>
          <div className="text-2xl text-white">
            火箭成功进入轨道！
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchAnimation;
