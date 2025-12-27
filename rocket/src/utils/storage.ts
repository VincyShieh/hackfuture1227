// 火箭配置存储和URL分享工具

import type { RocketConfig } from '../types/game';

const STORAGE_KEY = 'rocket_config';

// 保存配置到localStorage
export const saveRocketConfig = (config: RocketConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.warn('Failed to save rocket config:', error);
  }
};

// 从localStorage加载配置
export const loadRocketConfig = (): RocketConfig | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load rocket config:', error);
    return null;
  }
};

// 将配置编码为URL参数
export const encodeConfigToUrl = (config: RocketConfig): string => {
  const params = new URLSearchParams();
  
  if (config.body) {
    params.set('body', config.body.color);
  }
  if (config.nosecone) {
    params.set('nosecone', config.nosecone.color);
  }
  if (config.fins) {
    params.set('fins', config.fins.color);
  }
  if (config.booster) {
    params.set('booster', config.booster.color);
  }
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};

// 从URL参数解码配置
export const decodeConfigFromUrl = (): RocketConfig | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const config: RocketConfig = {};
    
    const body = params.get('body');
    if (body) {
      config.body = { partType: 'body', color: body };
    }
    
    const nosecone = params.get('nosecone');
    if (nosecone) {
      config.nosecone = { partType: 'nosecone', color: nosecone };
    }
    
    const fins = params.get('fins');
    if (fins) {
      config.fins = { partType: 'fins', color: fins };
    }
    
    const booster = params.get('booster');
    if (booster) {
      config.booster = { partType: 'booster', color: booster };
    }
    
    return Object.keys(config).length > 0 ? config : null;
  } catch (error) {
    console.warn('Failed to decode config from URL:', error);
    return null;
  }
};

// 复制到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn('Failed to copy to clipboard:', error);
    return false;
  }
};
