import type { 
  Feeder, Grid, Room, Cable, Overhead, Station, Defect, 
  KeyMetrics, OperationPlan, RiskDimensions, WeatherInfo,
  ActionSuggestion, HistoryEvent 
} from '@/types';

// 关键指标数据
export const keyMetrics: KeyMetrics = {
  feederCount: 128,
  transformerCount: 2456,
  roomCount: 892,
  currentFaults: 3,
  highRiskFeeders: 12,
  pendingDefects: 420,
  emergencyDefects: 0,
  majorDefects: 2,
  generalDefects: 418,
  defectEliminationRate: 92,
  pendingHazards: 15,
  riskAlerts: 72,
  deviceHealthCount: 35601,
  keyDeviceCount: 36328,
};

// 馈线列表
export const feeders: Feeder[] = [
  {
    id: 'F18',
    name: '大基头F18',
    voltageLevel: '10kV',
    length: 15.6,
    operationYears: 8,
    lineType: 'mixed',
    userCount: 1140,
    importantUserCount: 23,
    riskLevel: 'high',
    riskScore: 72,
    loadRate: 92,
    defectCount: 5,
    emergencyDefectCount: 2,
  },
  {
    id: 'F23',
    name: '南海F23',
    voltageLevel: '10kV',
    length: 12.3,
    operationYears: 5,
    lineType: 'cable',
    userCount: 890,
    importantUserCount: 15,
    riskLevel: 'medium',
    riskScore: 58,
    loadRate: 78,
    defectCount: 3,
    emergencyDefectCount: 0,
  },
  {
    id: 'F35',
    name: '西樵F35',
    voltageLevel: '10kV',
    length: 18.5,
    operationYears: 12,
    lineType: 'overhead',
    userCount: 1560,
    importantUserCount: 8,
    riskLevel: 'extreme',
    riskScore: 85,
    loadRate: 95,
    defectCount: 8,
    emergencyDefectCount: 3,
  },
  {
    id: 'F42',
    name: '桂城F42',
    voltageLevel: '10kV',
    length: 9.8,
    operationYears: 3,
    lineType: 'cable',
    userCount: 720,
    importantUserCount: 45,
    riskLevel: 'low',
    riskScore: 35,
    loadRate: 65,
    defectCount: 1,
    emergencyDefectCount: 0,
  },
  {
    id: 'F56',
    name: '狮山F56',
    voltageLevel: '10kV',
    length: 22.1,
    operationYears: 15,
    lineType: 'mixed',
    userCount: 1890,
    importantUserCount: 12,
    riskLevel: 'high',
    riskScore: 68,
    loadRate: 88,
    defectCount: 6,
    emergencyDefectCount: 1,
  },
];

// 网格列表
export const grids: Grid[] = [
  {
    id: 'G01',
    name: '桂城网格01',
    area: '桂城片区',
    owner: '张三',
    areaSize: 12.5,
    feederCount: 8,
    deviceCount: 1256,
    riskScore: 72,
    riskLevel: 'medium',
    riskTrend: [68, 70, 71, 73, 72, 72],
    riskReason: '接头温度异常',
  },
  {
    id: 'G02',
    name: '狮山网格02',
    area: '狮山片区',
    owner: '李四',
    areaSize: 18.3,
    feederCount: 12,
    deviceCount: 1890,
    riskScore: 85,
    riskLevel: 'high',
    riskTrend: [78, 80, 82, 84, 85, 85],
    riskReason: '绝缘老化严重',
  },
  {
    id: 'G03',
    name: '西樵网格03',
    area: '西樵片区',
    owner: '王五',
    areaSize: 25.6,
    feederCount: 15,
    deviceCount: 2234,
    riskScore: 58,
    riskLevel: 'medium',
    riskTrend: [62, 60, 59, 58, 58, 58],
    riskReason: '树障隐患',
  },
  {
    id: 'G04',
    name: '大沥网格04',
    area: '大沥片区',
    owner: '赵六',
    areaSize: 15.2,
    feederCount: 10,
    deviceCount: 1567,
    riskScore: 45,
    riskLevel: 'low',
    riskTrend: [50, 48, 46, 45, 45, 45],
    riskReason: '运行正常',
  },
];

// 电房列表
export const rooms: Room[] = [
  {
    id: 'R001',
    name: '桂城#1电房',
    type: 'room',
    feederId: 'F42',
    feederName: '桂城F42',
    gridId: 'G01',
    riskScore: 78,
    riskLevel: 'high',
    operationDate: '2018-03-15',
    lastInspectionDate: '2026-01-20',
    roomType: 'distribution',
    capacity: 800,
    lowVoltageLines: 4,
    hasImportantUser: true,
  },
  {
    id: 'R002',
    name: '狮山#2箱变',
    type: 'room',
    feederId: 'F56',
    feederName: '狮山F56',
    gridId: 'G02',
    riskScore: 65,
    riskLevel: 'medium',
    operationDate: '2019-06-20',
    lastInspectionDate: '2026-02-01',
    roomType: 'box',
    capacity: 400,
    lowVoltageLines: 2,
    hasImportantUser: false,
  },
  {
    id: 'R003',
    name: '西樵#3开关站',
    type: 'room',
    feederId: 'F35',
    feederName: '西樵F35',
    gridId: 'G03',
    riskScore: 82,
    riskLevel: 'high',
    operationDate: '2015-11-10',
    lastInspectionDate: '2025-12-15',
    roomType: 'switch',
    capacity: 1200,
    lowVoltageLines: 6,
    hasImportantUser: true,
  },
];

// 电缆列表
export const cables: Cable[] = [
  {
    id: 'C001',
    name: 'DL-2024-015',
    type: 'cable',
    feederId: 'F42',
    feederName: '桂城F42',
    gridId: 'G01',
    riskScore: 45,
    riskLevel: 'low',
    operationDate: '2019-06-20',
    lastTestDate: '2024-06-15',
    model: 'YJV22-3×240',
    length: 850,
    startPoint: '桂城#1电房',
    endPoint: '桂城#2电房',
    layingMethod: 'cableTray',
    jointCount: 2,
    riskReason: '运行正常，绝缘良好',
    team: '运维一班',
  },
  {
    id: 'C002',
    name: 'DL-2024-089',
    type: 'cable',
    feederId: 'F56',
    feederName: '狮山F56',
    gridId: 'G02',
    riskScore: 68,
    riskLevel: 'medium',
    operationDate: '2017-03-15',
    lastTestDate: '2024-03-10',
    model: 'YJV22-3×185',
    length: 1200,
    startPoint: '狮山#1电房',
    endPoint: '狮山#3电房',
    layingMethod: 'direct',
    jointCount: 3,
    riskReason: '设备老化，绝缘下降',
    team: '运维二班',
  },
];

// 架空线列表
export const overheads: Overhead[] = [
  {
    id: 'O001',
    name: '西樵F35-#15~#35杆',
    type: 'overhead',
    feederId: 'F35',
    feederName: '西樵F35',
    gridId: 'G03',
    riskScore: 85,
    riskLevel: 'extreme',
    operationDate: '2017-11-10',
    conductorModel: 'JKLYJ-240',
    length: 1200,
    poleCount: 21,
    treeObstructionRisk: 'high',
    externalDamageRisk: 'medium',
    lightningRisk: 'high',
  },
  {
    id: 'O002',
    name: '狮山F56-#08~#22杆',
    type: 'overhead',
    feederId: 'F56',
    feederName: '狮山F56',
    gridId: 'G02',
    riskScore: 72,
    riskLevel: 'high',
    operationDate: '2018-05-20',
    conductorModel: 'JKLYJ-185',
    length: 800,
    poleCount: 15,
    treeObstructionRisk: 'medium',
    externalDamageRisk: 'low',
    lightningRisk: 'medium',
  },
];

// 台区列表
export const stations: Station[] = [
  {
    id: 'S001',
    name: '桂城村#1台区',
    type: 'station',
    feederId: 'F42',
    feederName: '桂城F42',
    gridId: 'G01',
    riskScore: 52,
    riskLevel: 'medium',
    operationDate: '2019-08-15',
    transformerModel: 'S13-M-400/10',
    capacity: 400,
    userCount: 156,
    importantUserCount: 1,
    loadRate: 78,
    voltageQualifiedRate: 98.5,
    lowVoltageUserCount: 3,
  },
  {
    id: 'S002',
    name: '狮山村#2台区',
    type: 'station',
    feederId: 'F56',
    feederName: '狮山F56',
    gridId: 'G02',
    riskScore: 88,
    riskLevel: 'high',
    operationDate: '2016-04-20',
    transformerModel: 'S11-M-315/10',
    capacity: 315,
    userCount: 189,
    importantUserCount: 0,
    loadRate: 92,
    voltageQualifiedRate: 95.2,
    lowVoltageUserCount: 12,
  },
];

// 缺陷列表
export const defects: Defect[] = [
  {
    id: 'D001',
    deviceId: 'R001',
    deviceName: '桂城#1电房',
    deviceType: 'room',
    level: 'major',
    description: '变压器油位偏低',
    discoveryDate: '2026-02-10',
    status: 'pending',
  },
  {
    id: 'D002',
    deviceId: 'F35',
    deviceName: '西樵F35',
    deviceType: 'overhead',
    level: 'emergency',
    description: '#23杆绝缘子击穿',
    discoveryDate: '2026-02-14',
    status: 'processing',
  },
  {
    id: 'D003',
    deviceId: 'S002',
    deviceName: '狮山村#2台区',
    deviceType: 'station',
    level: 'major',
    description: '低压出线端子发热',
    discoveryDate: '2026-02-12',
    status: 'pending',
  },
];

// 运维计划
export const operationPlans: OperationPlan[] = [
  {
    id: 'P001',
    type: 'test',
    name: '设备预试计划',
    targetCount: 451,
    completedCount: 406,
    overdueCount: 40,
    completionRate: 90.02,
  },
  {
    id: 'P002',
    type: 'transformation',
    name: '设备反措计划',
    targetCount: 3,
    completedCount: 3,
    overdueCount: 0,
    completionRate: 100,
  },
  {
    id: 'P003',
    type: 'inspection',
    name: '设备定检计划',
    targetCount: 15,
    completedCount: 12,
    overdueCount: 0,
    completionRate: 80,
  },
  {
    id: 'P004',
    type: 'transformation',
    name: '技改项目总数',
    targetCount: 1358,
    completedCount: 892,
    overdueCount: 0,
    completionRate: 65.7,
  },
];

// 风险维度数据
export const riskDimensions: RiskDimensions = {
  userRisk: 32,
  operationRisk: 32,
  deviceRisk: 28,
  networkRisk: 12,
  historyRisk: 15,
  newEnergyRisk: 43,
};

// 天气信息
export const weatherInfo: WeatherInfo = {
  current: {
    condition: '晴',
    temperature: 28,
    humidity: 65,
    windSpeed: 3.5,
  },
  forecast: [
    { date: '今天', condition: '晴', highTemp: 32, lowTemp: 24 },
    { date: '明天', condition: '多云', highTemp: 33, lowTemp: 25 },
    { date: '后天', condition: '雷阵雨', highTemp: 30, lowTemp: 23 },
  ],
  alerts: ['未来3天有雷暴天气，请注意防雷特巡'],
};

// 历史事件
export const historyEvents: HistoryEvent[] = [
  {
    date: '2026-01-15',
    type: 'fault',
    description: '西樵F35线路跳闸',
    duration: 2.5,
    impact: '影响用户1560户',
  },
  {
    date: '2026-01-08',
    type: 'outage',
    description: '计划停电检修',
    duration: 4,
    impact: '影响用户890户',
  },
  {
    date: '2025-12-20',
    type: 'defect',
    description: '发现桂城#1电房变压器油位偏低',
    impact: '已列入消缺计划',
  },
];

// 行动建议
export const actionSuggestions: ActionSuggestion[] = [
  {
    id: 'A001',
    type: 'load',
    title: '负荷转移建议',
    description: '当前负载率持续＞90%，建议启动负荷转移。',
    priority: 'high',
    relatedDevice: '大基头F18',
    actionButton: {
      text: '查看转供方案',
      link: '/transfer-plan',
    },
  },
  {
    id: 'A002',
    type: 'weather',
    title: '防雷特巡建议',
    description: '未来3天有雷暴天气，建议开展防雷特巡。',
    priority: 'medium',
    actionButton: {
      text: '生成特巡工单',
      link: '/inspection-order',
    },
  },
  {
    id: 'A003',
    type: 'defect',
    title: '紧急缺陷处理',
    description: '线路中段有2处紧急缺陷，建议本周内处理。',
    priority: 'extreme',
    relatedDevice: '西樵F35',
    actionButton: {
      text: '查看缺陷详情',
      link: '/defect-detail',
    },
  },
];

// 跳闸次数统计（近12个月）
export const tripStatistics = [
  { month: '1月', count: 5 },
  { month: '2月', count: 3 },
  { month: '3月', count: 4 },
  { month: '4月', count: 2 },
  { month: '5月', count: 6 },
  { month: '6月', count: 8 },
  { month: '7月', count: 7 },
  { month: '8月', count: 5 },
  { month: '9月', count: 4 },
  { month: '10月', count: 3 },
  { month: '11月', count: 2 },
  { month: '12月', count: 4 },
];

// 负载趋势数据
export const loadTrendData = [
  { time: '00:00', load: 45 },
  { time: '02:00', load: 42 },
  { time: '04:00', load: 40 },
  { time: '06:00', load: 55 },
  { time: '08:00', load: 78 },
  { time: '10:00', load: 85 },
  { time: '12:00', load: 88 },
  { time: '14:00', load: 92 },
  { time: '16:00', load: 89 },
  { time: '18:00', load: 95 },
  { time: '20:00', load: 90 },
  { time: '22:00', load: 68 },
];

// 设备类型分布
export const deviceTypeDistribution = [
  { type: '线段', count: 747 },
  { type: '母线', count: 139 },
  { type: '主变', count: 846 },
  { type: '其他', count: 34596 },
];

// 管控等级分布
export const controlLevelDistribution = [
  { level: 'I级', count: 234 },
  { level: 'II级', count: 36094 },
  { level: 'III级', count: 0 },
  { level: 'IV级', count: 0 },
];

// 电压等级分布
export const voltageLevelDistribution = [
  { level: '±800kV', count: 569 },
  { level: '220kV', count: 10488 },
  { level: '500kV', count: 16236 },
  { level: '110kV以下', count: 9035 },
];

// 投运年限统计
export const operationYearStats = [
  { range: '0-5年', count: 4605 },
  { range: '5-10年', count: 9411 },
  { range: '10-20年', count: 17917 },
  { range: '20年以上', count: 4395 },
];
