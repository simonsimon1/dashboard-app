// 风险等级
export type RiskLevel = 'extreme' | 'high' | 'medium' | 'low' | 'info';

// 设备类型
export type DeviceType = 'transformer' | 'switchgear' | 'cable' | 'overhead' | 'room' | 'station';

// 馈线信息
export interface Feeder {
  id: string;
  name: string;
  voltageLevel: string;
  length: number;
  operationYears: number;
  lineType: 'overhead' | 'cable' | 'mixed';
  userCount: number;
  importantUserCount: number;
  riskLevel: RiskLevel;
  riskScore: number;
  loadRate: number;
  defectCount: number;
  emergencyDefectCount: number;
}

// 网格信息
export interface Grid {
  id: string;
  name: string;
  area: string;
  owner: string;
  areaSize: number;
  feederCount: number;
  deviceCount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  riskTrend: number[];
  riskReason?: string;
}

// 设备信息
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  feederId: string;
  feederName: string;
  gridId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  operationDate: string;
  lastInspectionDate?: string;
  lastTestDate?: string;
}

// 电房
export interface Room extends Device {
  roomType: 'box' | 'distribution' | 'switch';
  capacity: number;
  lowVoltageLines: number;
  hasImportantUser: boolean;
}

// 电缆
export interface Cable extends Device {
  model: string;
  length: number;
  startPoint: string;
  endPoint: string;
  layingMethod: 'direct' | 'cableTray' | 'pipe';
  jointCount: number;
  riskReason?: string;
  team?: string;
}

// 架空线
export interface Overhead extends Device {
  conductorModel: string;
  length: number;
  poleCount: number;
  treeObstructionRisk: RiskLevel;
  externalDamageRisk: RiskLevel;
  lightningRisk: RiskLevel;
}

// 台区
export interface Station extends Device {
  transformerModel: string;
  capacity: number;
  userCount: number;
  importantUserCount: number;
  loadRate: number;
  voltageQualifiedRate: number;
  lowVoltageUserCount: number;
}

// 缺陷
export interface Defect {
  id: string;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  level: 'emergency' | 'major' | 'general';
  description: string;
  discoveryDate: string;
  status: 'pending' | 'processing' | 'completed';
}

// 风险维度
export interface RiskDimensions {
  userRisk: number;
  operationRisk: number;
  networkRisk: number;
  deviceRisk: number;
  newEnergyRisk: number;
  historyRisk: number;
}

// 关键指标
export interface KeyMetrics {
  feederCount: number;
  transformerCount: number;
  roomCount: number;
  currentFaults: number;
  highRiskFeeders: number;
  pendingDefects: number;
  emergencyDefects: number;
  majorDefects: number;
  generalDefects: number;
  defectEliminationRate: number;
  pendingHazards: number;
  riskAlerts: number;
  deviceHealthCount: number;
  keyDeviceCount: number;
}

// 运维计划
export interface OperationPlan {
  id: string;
  type: 'inspection' | 'test' | 'transformation';
  name: string;
  targetCount: number;
  completedCount: number;
  overdueCount: number;
  completionRate: number;
}

// 巡视策略
export interface InspectionStrategy {
  gridId: string;
  gridName: string;
  recommendedDate: string;
  method: 'manual+drone' | 'manual' | 'camera';
  cycle: number;
  focusPoints: string[];
}

// 试验策略
export interface TestStrategy {
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  lastTestDate: string;
  recommendedDate: string;
  recommendedItems: string[];
  priority: RiskLevel;
}

// 改造策略
export interface TransformationStrategy {
  id: string;
  name: string;
  type: string;
  devices: string[];
  riskScore: number;
  priority: RiskLevel;
  estimatedInvestment: number;
  expectedEffect: string;
}

// 天气信息
export interface WeatherInfo {
  current: {
    condition: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    date: string;
    condition: string;
    highTemp: number;
    lowTemp: number;
  }>;
  alerts: string[];
}

// 实时监测数据
export interface RealTimeData {
  loadRate: number;
  voltageQualifiedRate: number;
  threePhaseUnbalance: number;
  timestamp: string;
}

// 历史事件
export interface HistoryEvent {
  date: string;
  type: 'fault' | 'outage' | 'defect';
  description: string;
  duration?: number;
  impact?: string;
}

// 行动建议
export interface ActionSuggestion {
  id: string;
  type: 'load' | 'weather' | 'defect' | 'fault';
  title: string;
  description: string;
  priority: RiskLevel;
  relatedDevice?: string;
  actionButton: {
    text: string;
    link: string;
  };
}
