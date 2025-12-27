// 音效管理工具

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // 生成简单的音效
  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer {
    if (!this.audioContext) {
      throw new Error('AudioContext not available');
    }

    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-3 * t); // 衰减包络
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
    }

    return buffer;
  }

  // 初始化音效
  init() {
    if (!this.audioContext) return;

    // 拖拽音效 - 短促的高音
    this.sounds.set('drag', this.createBeep(800, 0.1, 'sine'));
    
    // 放置音效 - 低沉的确认音
    this.sounds.set('drop', this.createBeep(400, 0.2, 'triangle'));
    
    // 发射音效 - 低频隆隆声
    this.sounds.set('launch', this.createBeep(100, 1.5, 'sawtooth'));
    
    // 成功音效 - 上升的音调
    const successBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.5, this.audioContext.sampleRate);
    const successData = successBuffer.getChannelData(0);
    for (let i = 0; i < successBuffer.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const freq = 400 + t * 400; // 从400Hz上升到800Hz
      successData[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-2 * t) * 0.3;
    }
    this.sounds.set('success', successBuffer);
  }

  // 播放音效
  play(soundName: string, volume = 1) {
    if (!this.audioContext || !this.sounds.has(soundName)) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = this.sounds.get(soundName)!;
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start(0);
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  // 恢复音频上下文（某些浏览器需要用户交互后才能播放）
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

export const soundManager = new SoundManager();
