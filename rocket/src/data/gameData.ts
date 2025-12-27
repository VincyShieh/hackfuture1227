// 游戏数据配置

import type { RocketPart, MissionStory } from '../types/game';

export const ROCKET_PARTS: RocketPart[] = [
  {
    id: 'body-1',
    type: 'body',
    name: '标准箭体',
    color: '#e74c3c',
    description: '经典红色箭体，稳定可靠'
  },
  {
    id: 'body-2',
    type: 'body',
    name: '蓝色箭体',
    color: '#3498db',
    description: '蓝色箭体，速度优先'
  },
  {
    id: 'nosecone-1',
    type: 'nosecone',
    name: '尖锐整流罩',
    color: '#f39c12',
    description: '橙色整流罩，减少阻力'
  },
  {
    id: 'nosecone-2',
    type: 'nosecone',
    name: '圆润整流罩',
    color: '#9b59b6',
    description: '紫色整流罩，平稳飞行'
  },
  {
    id: 'fins-1',
    type: 'fins',
    name: '三角尾翼',
    color: '#2ecc71',
    description: '绿色尾翼，方向稳定'
  },
  {
    id: 'fins-2',
    type: 'fins',
    name: '梯形尾翼',
    color: '#e67e22',
    description: '橙色尾翼，灵活转向'
  },
  {
    id: 'booster-1',
    type: 'booster',
    name: '标准助推器',
    color: '#95a5a6',
    description: '灰色助推器，强劲动力'
  },
  {
    id: 'booster-2',
    type: 'booster',
    name: '涡轮助推器',
    color: '#34495e',
    description: '深灰助推器，超强推力'
  }
];

export const MISSION_STORIES: MissionStory[] = [
  {
    title: '国际空间站补给任务',
    description: '你的火箭成功将食物和科学实验设备送到了国际空间站，宇航员们非常感谢你！',
    achievement: '太空快递员'
  },
  {
    title: '月球探测任务',
    description: '火箭携带月球车成功登陆月球表面，开始探索神秘的月球背面！',
    achievement: '月球探险家'
  },
  {
    title: '卫星部署任务',
    description: '你的火箭将通信卫星精准送入轨道，现在全世界的人都能打电话和上网了！',
    achievement: '通信英雄'
  },
  {
    title: '火星探索任务',
    description: '火箭成功飞向火星，将在那里寻找生命的痕迹和水的存在！',
    achievement: '火星先锋'
  },
  {
    title: '太空望远镜任务',
    description: '你的火箭将新型太空望远镜送入太空，科学家们将用它观测遥远的星系！',
    achievement: '宇宙观察者'
  },
  {
    title: '气象卫星任务',
    description: '火箭成功部署气象卫星，现在我们能更准确地预测天气，保护大家的安全！',
    achievement: '天气守护者'
  }
];

export const PART_POSITIONS = {
  nosecone: { top: '0%', height: '20%' },
  body: { top: '20%', height: '40%' },
  booster: { top: '60%', height: '20%' },
  fins: { top: '80%', height: '20%' }
};
