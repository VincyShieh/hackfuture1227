import React, { useState, useEffect } from 'react';
import type { GamePage, RocketConfig } from './types/game';
import HomePage from './components/HomePage';
import WorkshopPage from './components/WorkshopPage';
import LaunchAnimation from './components/LaunchAnimation';
import ReportPage from './components/ReportPage';
import { soundManager } from './utils/soundManager';
import { saveRocketConfig, loadRocketConfig, decodeConfigFromUrl } from './utils/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<GamePage>('home');
  const [rocketConfig, setRocketConfig] = useState<RocketConfig>({});

  useEffect(() => {
    // 初始化音效系统
    soundManager.init();

    // 尝试从URL参数加载配置
    const urlConfig = decodeConfigFromUrl();
    if (urlConfig) {
      setRocketConfig(urlConfig);
      return;
    }

    // 否则从localStorage加载
    const savedConfig = loadRocketConfig();
    if (savedConfig) {
      setRocketConfig(savedConfig);
    }
  }, []);

  // 用户交互时恢复音频上下文
  useEffect(() => {
    const handleUserInteraction = () => {
      soundManager.resume();
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    return () => document.removeEventListener('click', handleUserInteraction);
  }, []);

  const handleStart = () => {
    setCurrentPage('workshop');
  };

  const handleLaunch = (config: RocketConfig) => {
    setRocketConfig(config);
    saveRocketConfig(config);
    setCurrentPage('launch');
  };

  const handleLaunchComplete = () => {
    setCurrentPage('report');
  };

  const handlePlayAgain = () => {
    setCurrentPage('workshop');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="app">
      {currentPage === 'home' && <HomePage onStart={handleStart} />}
      
      {currentPage === 'workshop' && (
        <WorkshopPage
          initialConfig={rocketConfig}
          onLaunch={handleLaunch}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === 'launch' && (
        <LaunchAnimation
          config={rocketConfig}
          onComplete={handleLaunchComplete}
        />
      )}
      
      {currentPage === 'report' && (
        <ReportPage
          config={rocketConfig}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
};

export default App;
