import { useState } from 'react';
import { 
  Zap, 
  AlertTriangle,
  Activity,
  Lightbulb,
  Wrench,
  Gauge,
  Cpu,
  GitBranch,
  Settings,
  Cable,
  Building2,
  Layers,
  Eye,
  ShieldAlert,
  Sun,
  Calendar,
  Network,
  BarChart3,
  Search,
  FileDown,
  ClipboardCheck,
  MapPin
} from 'lucide-react';
import { RadarChart } from './RadarChart';
import { 
  feeders, 
  riskDimensions
} from '@/data/mockData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// 馈线详细信息数据
const feederDetailData = {
  lineInfo: {
    property: '公线',
    lineType: '架空/电缆混合',
    operationYears: 8,
    length: 10.12,
    capacity: 500,
    linkFeeder: '大基头F23',
    mediumVoltageUsers: 22,
    lowVoltageUsers: 1118,
    stationRoomCount: 21,
    cableCount: 15,
    overheadLength: 6.8,
    switchCount: 66,
    transformerCount: 23,
    meterCount: 13,
    specialImportantUser: '苹果公司',
    level1ImportantUser: '无',
    level2ImportantUser: '广州日报',
    level3ImportantUser: '无',
    importantUserCount: 23
  },
  userSide: {
    chargingPile: { userCount: 133, contractCapacity: 2.30, penetrationRate: 24.00 },
    photovoltaic: { userCount: 30, installedCapacity: 0.48, annualGeneration: 2.91, penetrationRate: 5.04 },
    userAccess: { reportedCapacity: 22.01, accessRate: 229.37, usageRate: 15.93, dualPowerUsers: 0 }
  },
  loadStatus: {
    overload: { hasHeavyLoad: false, hasOverload: false },
    maxCurrent: { daily: 136, monthly: 170, yearly: 202 },
    supplyCapacity: { canTransferOnce: true, canTransferTwice: true, canTransferDirect: true, canTransferIndirect: true }
  },
  outageEvents: { totalOutages: 2, transferSupplyCount: 0, faultTrips: 0, reclosingOperations: 1 },
  automation: {
    selfHealingRateByTransformer: 39.113,
    selfHealingRateByUser: 37.11,
    remoteControlRate: 100,
    terminalOnlineRate: 100,
    terminalEncryptionRate: 100,
    annualRemoteSuccessRate: 100,
    isSelfHealingLine: true,
    autoSwitchCount: 8,
    monitoredSwitchCount: 8,
    remoteStationRate: 80,
    threeRemoteSwitchRate: 45,
    hasSinglePowerUser: true
  },
  networkStructure: {
    feederGroup: { lineCount: 3, connectionMode: '其他典型接线', isWholeFeederGroup: false, fromSameSubstation: false },
    samePole: { length: 0, lineCount: 0, sectionCount: 0, onlySamePoleConnection: false },
    mainLine: { minSection: 240, hasBottleneck: false, maxTransformersAtT: 0, hasLantern: false, length: 4.2 },
    switchSections: { autoSectionCount: 4, avgLowVoltageUsers: 283, hasExcessiveUsers: true, atUserAsset: false },
    branchLine: { maxLength: 956, maxTransformers: 4, maxUsers: 216, hasLargeBranch: false },
    connection: { loopPointCount: 2, autoLoopPointCount: 2, remoteLoopPointCount: 2, sameBusConnection: false }
  }
};

const deviceRiskData = {
  rooms: [
    { id: 1, name: '#1电房', riskScore: 85, riskLevel: 'high', reason: '设备老旧，运行超10年' },
    { id: 2, name: '#2电房', riskScore: 72, riskLevel: 'medium', reason: '负载率偏高，夏季易过载' },
    { id: 3, name: '#3电房', riskScore: 45, riskLevel: 'low', reason: '运行正常，状态良好' },
    { id: 4, name: '#4电房', riskScore: 38, riskLevel: 'low', reason: '新投运设备，状态良好' },
  ],
  cables: [
    { id: 1, name: '电缆段A', riskScore: 68, riskLevel: 'medium', reason: '运行5年，绝缘需关注' },
    { id: 2, name: '电缆段B', riskScore: 42, riskLevel: 'low', reason: '运行正常，状态良好' },
  ],
  overheads: [
    { id: 1, name: '架空段#15-#35', riskScore: 88, riskLevel: 'high', reason: '树障风险高，雷击多发区' },
    { id: 2, name: '架空段#08-#22', riskScore: 65, riskLevel: 'medium', reason: '部分绝缘子老化' },
  ],
  stations: [
    { id: 1, name: '台区T1', riskScore: 78, riskLevel: 'medium', reason: '负载率85%，夏季高峰可能过载' },
    { id: 2, name: '台区T2', riskScore: 92, riskLevel: 'high', reason: '负载率92%，需负荷转移' },
    { id: 3, name: '台区T3', riskScore: 52, riskLevel: 'low', reason: '运行正常，状态良好' },
  ]
};

// 树状图卡片组件
function TreeCard({ 
  title, 
  icon: Icon, 
  color,
  children 
}: { 
  title: string; 
  icon: React.ElementType; 
  color: string;
  children: React.ReactNode;
}) {
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-800' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
  };
  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`${colors.bg} rounded-lg border ${colors.border} p-4`}>
      <div className="flex items-center justify-center mb-4">
        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border ${colors.border} shadow-sm`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
          <span className={`font-bold ${colors.text} text-base`}>{title}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// 树状分支项
function TreeItem({ label, value, color = 'slate' }: { label: string; value: string; color?: string }) {
  const colorClasses: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    red: 'bg-red-50 text-red-700 border-red-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-px bg-slate-300"></div>
      <div className={`flex-1 px-2 py-1.5 rounded border text-xs ${colorClasses[color] || colorClasses.slate}`}>
        <span className="text-slate-500">{label}:</span>
        <span className="ml-1 font-medium">{value}</span>
      </div>
    </div>
  );
}

// 树状分支组
function TreeBranch({ title, children, lineColor = 'bg-slate-300' }: { title: string; children: React.ReactNode; lineColor?: string }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-0.5 ${lineColor}`}></div>
        <span className="text-xs font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">{title}</span>
      </div>
      <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-1.5">
        {children}
      </div>
    </div>
  );
}

export function FeederDashboard() {
  const [selectedFeeder] = useState(feeders[0]);
  const [activeView, setActiveView] = useState<'default' | 'risk' | 'realtime' | 'action'>('default');
  const [showLayers, setShowLayers] = useState({ risk: false, realtime: false, action: false });
  const [diagramType, setDiagramType] = useState<'single' | 'geographic'>('single');

  const toggleLayer = (layer: keyof typeof showLayers) => {
    setShowLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  // 散点图数据
  const scatterData = [
    { time: '00:00', load: 45 },
    { time: '02:00', load: 38 },
    { time: '04:00', load: 35 },
    { time: '06:00', load: 52 },
    { time: '08:00', load: 68 },
    { time: '10:00', load: 75 },
    { time: '12:00', load: 82 },
    { time: '14:00', load: 78 },
    { time: '16:00', load: 72 },
    { time: '18:00', load: 85 },
    { time: '20:00', load: 70 },
    { time: '22:00', load: 55 },
  ];

  return (
    <div className="p-5 space-y-5 bg-slate-50/50 min-h-screen">
      {/* 1. 馈线基本信息 - 重新排布两排 */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        {/* 第一排 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6 flex-wrap">
            {/* 馈线名称 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">馈线名称</p>
              <p className="text-2xl font-bold text-slate-800">{selectedFeeder.name}</p>
            </div>
            {/* 所属片区 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">所属片区/网格</p>
              <p className="text-sm text-slate-700">桂城片区/桂城网格01</p>
            </div>
            {/* 线路属性 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">线路属性</p>
              <p className="text-sm text-slate-700">{feederDetailData.lineInfo.property}</p>
            </div>
            {/* 线路类型 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">线路类型</p>
              <p className="text-sm text-slate-700">{feederDetailData.lineInfo.lineType}</p>
            </div>
            {/* 投运年限 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">投运年限</p>
              <p className="text-sm text-slate-700">{feederDetailData.lineInfo.operationYears}年</p>
            </div>
            {/* 线路总长度 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">线路总长度</p>
              <p className="text-sm text-slate-700">{feederDetailData.lineInfo.length}km</p>
            </div>
            {/* 额定载流量 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">额定载流量</p>
              <p className="text-sm text-slate-700">{feederDetailData.lineInfo.capacity}A</p>
            </div>
            {/* 联络馈线名 */}
            <div>
              <p className="text-xs text-slate-500 mb-1">联络馈线名</p>
              <p className="text-sm text-blue-600 font-medium">{feederDetailData.lineInfo.linkFeeder}</p>
            </div>
          </div>
          {/* 今日风险 */}
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-slate-500 mb-1">今日风险</p>
            <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100">
              高风险
            </span>
          </div>
        </div>
        
        {/* 分隔线 */}
        <div className="border-t border-slate-100 my-4"></div>
        
        {/* 第二排 */}
        <div className="grid grid-cols-10 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-500 mb-1">总中压用户数</p>
            <p className="text-sm font-semibold text-slate-800">{feederDetailData.lineInfo.mediumVoltageUsers}户</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">总低压用户数</p>
            <p className="text-sm font-semibold text-slate-800">{feederDetailData.lineInfo.lowVoltageUsers}户</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">总站房数</p>
            <p className="text-sm font-semibold text-slate-800">{feederDetailData.lineInfo.stationRoomCount}座</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">总电缆数</p>
            <p className="text-sm font-semibold text-slate-800">{feederDetailData.lineInfo.cableCount}段</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">总架空长度</p>
            <p className="text-sm font-semibold text-slate-800">{feederDetailData.lineInfo.overheadLength}km</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">总开关数</p>
            <p className="text-sm font-semibold text-slate-800">{feederDetailData.lineInfo.switchCount}个</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">特级重要用户</p>
            <p className="text-sm font-semibold text-red-600">{feederDetailData.lineInfo.specialImportantUser}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">一级重要用户</p>
            <p className="text-sm font-semibold text-orange-600">{feederDetailData.lineInfo.level1ImportantUser}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">二级重要用户</p>
            <p className="text-sm font-semibold text-cyan-600">{feederDetailData.lineInfo.level2ImportantUser}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">三级重要用户</p>
            <p className="text-sm font-semibold text-green-600">{feederDetailData.lineInfo.level3ImportantUser}</p>
          </div>
        </div>
      </div>

      {/* 2. 视图切换标签 */}
      <div className="flex items-center gap-3">
        <Button 
          variant={activeView === 'default' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => { setActiveView('default'); setShowLayers({ risk: false, realtime: false, action: false }); }} 
          className={`flex items-center gap-2 ${activeView === 'default' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          <Eye className="w-4 h-4" />默认视图
        </Button>
        <Button 
          variant={activeView === 'risk' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => { setActiveView('risk'); setShowLayers({ risk: true, realtime: false, action: false }); }} 
          className={`flex items-center gap-2 ${activeView === 'risk' ? 'bg-red-600 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          <ShieldAlert className="w-4 h-4" />风险情况
        </Button>
        <Button 
          variant={activeView === 'realtime' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => { setActiveView('realtime'); setShowLayers({ risk: false, realtime: true, action: false }); }} 
          className={`flex items-center gap-2 ${activeView === 'realtime' ? 'bg-green-600 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          <Activity className="w-4 h-4" />实时情况
        </Button>
        <Button 
          variant={activeView === 'action' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => { setActiveView('action'); setShowLayers({ risk: false, realtime: false, action: true }); }} 
          className={`flex items-center gap-2 ${activeView === 'action' ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          <Wrench className="w-4 h-4" />运维建议
        </Button>
        
        <div className="h-6 w-px bg-slate-300 mx-2" />
        
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Layers className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-500">叠加图层:</span>
          <label className="flex items-center gap-1 text-xs cursor-pointer">
            <input type="checkbox" checked={showLayers.risk} onChange={() => toggleLayer('risk')} className="rounded text-red-600" />
            <span className="text-red-600">风险</span>
          </label>
          <label className="flex items-center gap-1 text-xs cursor-pointer">
            <input type="checkbox" checked={showLayers.realtime} onChange={() => toggleLayer('realtime')} className="rounded text-green-600" />
            <span className="text-green-600">实时</span>
          </label>
          <label className="flex items-center gap-1 text-xs cursor-pointer">
            <input type="checkbox" checked={showLayers.action} onChange={() => toggleLayer('action')} className="rounded text-amber-600" />
            <span className="text-amber-600">建议</span>
          </label>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 单线图/沿布图 */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <Tabs value={diagramType} onValueChange={(v) => setDiagramType(v as any)} className="w-auto">
              <TabsList className="bg-slate-100">
                <TabsTrigger value="single" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">单线图</TabsTrigger>
                <TabsTrigger value="geographic" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">沿布图</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">当前视图:</span>
              <span className="text-xs font-medium text-blue-600">
                {activeView === 'default' ? '默认视图' : activeView === 'risk' ? '风险情况' : activeView === 'realtime' ? '实时情况' : '运维建议'}
              </span>
            </div>
          </div>
          
          {diagramType === 'single' && (
            <div className="relative bg-slate-50 rounded-lg overflow-hidden" style={{ height: '450px' }}>
              <svg width="100%" height="100%" viewBox="0 0 1000 450">
                <rect x="30" y="205" width="80" height="40" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="4" />
                <text x="70" y="230" textAnchor="middle" fill="#0369a1" fontSize="12">变电站</text>
                <line x1="110" y1="225" x2="950" y2="225" stroke="#0284c7" strokeWidth="3" />
                
                {[{ x: 220, y: 225 }, { x: 420, y: 225 }, { x: 620, y: 225 }, { x: 820, y: 225 }].map((pos, i) => (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r="10" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
                    <text x={pos.x} y={pos.y + 25} textAnchor="middle" fill="#64748b" fontSize="10">开关{i+1}</text>
                  </g>
                ))}
                
                {[
                  { x: 320, y: 120, name: '#1电房', risk: 'high', score: 85 },
                  { x: 520, y: 330, name: '#2电房', risk: 'medium', score: 72 },
                  { x: 720, y: 120, name: '#3电房', risk: 'low', score: 45 },
                  { x: 920, y: 330, name: '#4电房', risk: 'low', score: 38 },
                ].map((pos, i) => {
                  const isRiskVisible = activeView === 'risk' || showLayers.risk;
                  const bgColor = pos.risk === 'high' ? '#fef2f2' : pos.risk === 'medium' ? '#fffbeb' : '#f0fdf4';
                  const strokeColor = pos.risk === 'high' ? '#dc2626' : pos.risk === 'medium' ? '#eab308' : '#22c55e';
                  return (
                    <g key={i}>
                      <rect x={pos.x - 40} y={pos.y - 25} width="80" height="50" fill={bgColor} stroke={isRiskVisible ? strokeColor : '#94a3b8'} strokeWidth={isRiskVisible ? 2 : 1} rx="4" />
                      <text x={pos.x} y={pos.y - 8} textAnchor="middle" fill="#334155" fontSize="11">{pos.name}</text>
                      {(isRiskVisible || activeView === 'default') && <text x={pos.x} y={pos.y + 10} textAnchor="middle" fill={strokeColor} fontSize="10" fontWeight="bold">{pos.score}分</text>}
                      <line x1={pos.x} y1={pos.y > 225 ? pos.y - 25 : pos.y + 25} x2={pos.x} y2="225" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
                    </g>
                  );
                })}
                
                {[
                  { x: 165, y: 350, name: 'T1', load: 85, voltage: 99.2, unbalance: 2.1 },
                  { x: 365, y: 100, name: 'T2', load: 92, voltage: 98.5, unbalance: 3.5 },
                  { x: 565, y: 350, name: 'T3', load: 65, voltage: 99.8, unbalance: 1.8 },
                  { x: 765, y: 100, name: 'T4', load: 78, voltage: 99.1, unbalance: 2.5 },
                ].map((pos, i) => {
                  const isRealtimeVisible = activeView === 'realtime' || showLayers.realtime;
                  const strokeColor = pos.load > 90 ? '#dc2626' : pos.load > 75 ? '#eab308' : '#22c55e';
                  return (
                    <g key={i}>
                      <circle cx={pos.x} cy={pos.y} r="18" fill="#fff" stroke={isRealtimeVisible ? strokeColor : '#94a3b8'} strokeWidth={isRealtimeVisible ? 2 : 1} />
                      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="#334155" fontSize="11">{pos.name}</text>
                      <line x1={pos.x} y1={pos.y > 225 ? pos.y - 18 : pos.y + 18} x2={pos.x} y2="225" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
                      {isRealtimeVisible && (
                        <g>
                          <rect x={pos.x - 45} y={pos.y + 28} width="90" height="55" fill="rgba(255,255,255,0.98)" stroke="#e2e8f0" strokeWidth="1" rx="4" />
                          <text x={pos.x} y={pos.y + 45} textAnchor="middle" fill={strokeColor} fontSize="10" fontWeight="bold">负载:{pos.load}%</text>
                          <text x={pos.x} y={pos.y + 58} textAnchor="middle" fill="#22c55e" fontSize="9">电压:{pos.voltage}%</text>
                          <text x={pos.x} y={pos.y + 71} textAnchor="middle" fill="#64748b" fontSize="9">不平衡:{pos.unbalance}%</text>
                        </g>
                      )}
                      {!isRealtimeVisible && <text x={pos.x} y={pos.y + 35} textAnchor="middle" fill={strokeColor} fontSize="9">{pos.load}%</text>}
                    </g>
                  );
                })}
                
                {(activeView === 'risk' || showLayers.risk) && (
                  <g>
                    <circle cx="480" cy="225" r="10" fill="#dc2626" opacity="0.8">
                      <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <rect x="440" y="180" width="80" height="22" fill="#dc2626" rx="4" />
                    <text x="480" y="196" textAnchor="middle" fill="#fff" fontSize="10">树障风险</text>
                  </g>
                )}
                
                {(activeView === 'action' || showLayers.action) && (
                  <g>
                    <g>
                      <circle cx="480" cy="160" r="14" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                      <rect x="440" y="130" width="120" height="22" fill="#f59e0b" rx="4" />
                      <text x="500" y="146" textAnchor="middle" fill="#fff" fontSize="9">建议：清理树障</text>
                    </g>
                    <g>
                      <circle cx="620" cy="190" r="14" fill="#8b5cf6" stroke="#fff" strokeWidth="2" />
                      <rect x="560" y="160" width="120" height="22" fill="#8b5cf6" rx="4" />
                      <text x="620" y="176" textAnchor="middle" fill="#fff" fontSize="9">建议：拆分母排</text>
                    </g>
                    <g>
                      <circle cx="320" cy="100" r="14" fill="#ec4899" stroke="#fff" strokeWidth="2" />
                      <rect x="260" y="70" width="120" height="22" fill="#ec4899" rx="4" />
                      <text x="320" y="86" textAnchor="middle" fill="#fff" fontSize="9">建议：设备更新</text>
                    </g>
                  </g>
                )}
              </svg>
              
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-sm">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-sky-600 rounded bg-sky-50" /><span className="text-slate-600">变电站</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-sky-500 rounded-full bg-white" /><span className="text-slate-600">开关</span></div>
                  {(activeView === 'risk' || showLayers.risk) && (<><div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-red-500 rounded bg-red-50" /><span className="text-slate-600">高风险</span></div><div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-yellow-500 rounded bg-yellow-50" /><span className="text-slate-600">中风险</span></div></>)}
                  {(activeView === 'action' || showLayers.action) && (<><div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-amber-500" /><span className="text-slate-600">树障清理</span></div><div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-violet-500" /><span className="text-slate-600">分段优化</span></div><div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-pink-500" /><span className="text-slate-600">设备更新</span></div></>)}
                </div>
              </div>
            </div>
          )}
          
          {diagramType === 'geographic' && (
            <div className="relative bg-slate-50 rounded-lg overflow-hidden" style={{ height: '450px' }}>
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%"><defs><pattern id="gridGeo" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#gridGeo)" /></svg>
              </div>
              <div className="absolute inset-4">
                <div className="absolute top-[30%] left-0 right-0 h-8 bg-slate-300/50 rounded" />
                <div className="absolute top-0 bottom-0 left-[40%] w-8 bg-slate-300/50 rounded" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute" style={{ top: `${25 + (i % 2) * 10}%`, left: `${10 + i * 10}%` }}>
                    <div className="w-2 h-8 bg-slate-400 rounded" />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 border-2 border-sky-500 rounded bg-white" />
                  </div>
                ))}
                <div className="absolute top-[20%] left-[35%] w-16 h-12 bg-red-50 border-2 border-red-400 rounded flex items-center justify-center"><span className="text-xs text-red-600">#1电房</span></div>
                <div className="absolute top-[60%] left-[55%] w-16 h-12 bg-yellow-50 border-2 border-yellow-400 rounded flex items-center justify-center"><span className="text-xs text-yellow-600">#2电房</span></div>
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  <path d="M 50 150 Q 200 180 350 160 T 600 200" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
                {(activeView === 'risk' || showLayers.risk) && (
                  <div className="absolute top-[35%] left-[45%]">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                    </div>
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-xs px-2 py-1 rounded">树障风险</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 实时监测 + 历史事件 */}
        <div className="space-y-5">
          {/* 实时监测 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              实时监测
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500">年度最大负载率</span>
                </div>
                <p className="text-xl font-bold text-orange-600">85%</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Gauge className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500">功率因数</span>
                </div>
                <p className="text-xl font-bold text-blue-600">0.96</p>
              </div>
            </div>

            <div className="mb-2">
              <p className="text-sm font-medium text-slate-700 mb-2">今日负载趋势</p>
              <div className="relative h-28 bg-slate-50 rounded border border-slate-200 p-2">
                <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {[0, 25, 50, 75, 100].map((y, i) => (
                    <line key={i} x1="0" y1={100 - y} x2="300" y2={100 - y} stroke="#e2e8f0" strokeWidth="1" />
                  ))}
                  {scatterData.map((point, i) => {
                    const x = (i / (scatterData.length - 1)) * 280 + 10;
                    const y = 100 - point.load;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="3" fill="#3b82f6" />
                        {i < scatterData.length - 1 && (
                          <line 
                            x1={x} 
                            y1={y} 
                            x2={((i + 1) / (scatterData.length - 1)) * 280 + 10} 
                            y2={100 - scatterData[i + 1].load} 
                            stroke="#93c5fd" 
                            strokeWidth="1" 
                            strokeDasharray="2,2"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>22:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* 历史事件 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              历史事件
            </h3>
            <ScrollArea className="h-36">
              <div className="space-y-2">
                {[
                  { date: '2026-02-14', type: 'fault', description: '绝缘子击穿导致线路跳闸', impact: '影响用户156户，停电2小时' },
                  { date: '2026-01-20', type: 'outage', description: '计划检修停电', impact: '影响用户89户，停电4小时' },
                  { date: '2025-12-15', type: 'defect', description: '发现树障隐患', impact: '已安排清理' },
                  { date: '2025-11-10', type: 'fault', description: '雷击导致保护动作', impact: '自动重合成功' },
                ].map((event, index) => (
                  <div key={index} className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500">{event.date}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${event.type === 'fault' ? 'bg-red-100 text-red-600' : event.type === 'outage' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {event.type === 'fault' ? '故障' : event.type === 'outage' ? '停电' : '缺陷'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">{event.description}</p>
                    {event.impact && <p className="text-[10px] text-slate-400 mt-0.5">{event.impact}</p>}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* 馈线知识图谱 */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-blue-600" />
          馈线知识图谱
        </h3>
        
        <div className="grid grid-cols-4 gap-5">
          <TreeCard title="网架结构" icon={Network} color="violet">
            <div className="space-y-3">
              <TreeBranch title="联络情况" lineColor="bg-violet-300">
                <TreeItem label="联络馈线数" value="2" />
                <TreeItem label="是否是同母联络" value="否" />
                <TreeItem label="联络点可三遥数" value="2" />
              </TreeBranch>
              <TreeBranch title="主干线分析" lineColor="bg-violet-300">
                <TreeItem label="主干线电缆最小截面积" value="240" />
                <TreeItem label="主干线架空最小截面积" value="240" />
                <TreeItem label="是否存在主干线卡脖子" value="否" />
                <TreeItem label="是否存在主干线分段过大" value="否" />
                <TreeItem label="主干线分段最多中压用户数" value="5" />
                <TreeItem label="主干线分段最多低压用户数" value="365" />
              </TreeBranch>
              <TreeBranch title="分支线分析" lineColor="bg-violet-300">
                <TreeItem label="分支线最多配变数" value="3" />
                <TreeItem label="分支线最多供电用户数" value="216" />
                <TreeItem label="是否存在大分支" value="否" />
                <TreeItem label="用户分界点是否存在无遥控功能的负荷开关柜" value="是" />
                <TreeItem label="用户分界点是否存在不合理熔丝柜" value="是" />
              </TreeBranch>
              <TreeBranch title="同杆（塔）架设情况" lineColor="bg-violet-300">
                <TreeItem label="同杆架设长度" value="0m" />
                <TreeItem label="同杆架设馈线数" value="3" />
                <TreeItem label="是否只能同杆（塔）线路联络" value="否" />
              </TreeBranch>
            </div>
          </TreeCard>

          <TreeCard title="配电自动化" icon={Cpu} color="orange">
            <div className="space-y-3">
              <TreeBranch title="自动化" lineColor="bg-orange-300">
                <TreeItem label="自动化终端在线率" value="100%" />
                <TreeItem label="可三遥开关占比" value="45%" />
                <TreeItem label="可遥控站房占比" value="80%" />
                <TreeItem label="是否存在专变用户无双电源" value="是" color="red" />
              </TreeBranch>
              <TreeBranch title="分段故障后自愈情况" lineColor="bg-orange-300">
                <TreeItem label="A分段故障理论后自愈率" value="39.3%" />
                <TreeItem label="B分段故障理论后自愈率" value="39.3%" />
                <TreeItem label="C分段故障理论后自愈率" value="39.3%" />
                <TreeItem label="C分段故障理论后自愈率" value="39.3%" />
              </TreeBranch>
            </div>
          </TreeCard>

          <TreeCard title="日常运行" icon={BarChart3} color="green">
            <div className="space-y-3">
              <TreeBranch title="年度停电事件" lineColor="bg-green-300">
                <TreeItem label="综合停电数量" value="2" />
                <TreeItem label="故障跳闸数量" value="0" />
                <TreeItem label="当年永久故障数量" value="1" />
                <TreeItem label="当年瞬时故障数量" value="2" />
                <TreeItem label="是否出现频繁停电用户" value="是" color="amber" />
              </TreeBranch>
              <TreeBranch title="供电能力" lineColor="bg-green-300">
                <TreeItem label="月最高电流" value="120A" />
                <TreeItem label="年最高电流" value="202A" />
                <TreeItem label="上年最高电流" value="300A" />
                <TreeItem label="按年负荷全口径是否可转供电" value="是" color="green" />
              </TreeBranch>
              <TreeBranch title="台区治理" lineColor="bg-green-300">
                <TreeItem label="出现低电压台区" value="河涌变压器" color="amber" />
                <TreeItem label="出现过负载台区" value="大基头#1变" color="amber" />
                <TreeItem label="出现三相不平衡台区" value="大基头#3变" color="amber" />
                <TreeItem label="出现重复跳闸台区" value="无" color="green" />
              </TreeBranch>
            </div>
          </TreeCard>

          <TreeCard title="新能源" icon={Sun} color="amber">
            <div className="space-y-3">
              <TreeBranch title="充电桩（站）接入" lineColor="bg-amber-300">
                <TreeItem label="充电桩（站）用户数" value="133" />
                <TreeItem label="充电桩（站）合同容量" value="2.30MVA" />
                <TreeItem label="充电桩（站）渗透率" value="24.00%" />
              </TreeBranch>
              <TreeBranch title="光伏接入" lineColor="bg-amber-300">
                <TreeItem label="光伏用户数量" value="30" />
                <TreeItem label="光伏装机容量" value="0.48MVA" />
                <TreeItem label="年光伏发电量" value="2.91万kWh" />
                <TreeItem label="光伏渗透率" value="5.04%" />
              </TreeBranch>
            </div>
          </TreeCard>
        </div>
      </div>

      {/* 馈线风险画像 */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          馈线风险画像
        </h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="flex justify-center">
            <RadarChart data={riskDimensions} height={200} />
          </div>
          
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-700 text-sm">电房风险</span>
            </div>
            <div className="space-y-1.5">
              {deviceRiskData.rooms.slice(0, 3).map((room) => (
                <div key={room.id} className={`text-xs p-1.5 rounded border ${getRiskColor(room.riskLevel)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{room.name}</span>
                    <span className="font-bold">{room.riskScore}分</span>
                  </div>
                  <p className="text-[10px] opacity-80 truncate" title={room.reason}>{room.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold text-slate-700 text-sm">电缆风险</span>
            </div>
            <div className="space-y-1.5">
              {deviceRiskData.cables.map((cable) => (
                <div key={cable.id} className={`text-xs p-1.5 rounded border ${getRiskColor(cable.riskLevel)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{cable.name}</span>
                    <span className="font-bold">{cable.riskScore}分</span>
                  </div>
                  <p className="text-[10px] opacity-80 truncate" title={cable.reason}>{cable.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="font-semibold text-slate-700 text-sm">架空风险</span>
            </div>
            <div className="space-y-1.5">
              {deviceRiskData.overheads.map((overhead) => (
                <div key={overhead.id} className={`text-xs p-1.5 rounded border ${getRiskColor(overhead.riskLevel)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate max-w-[70px]">{overhead.name}</span>
                    <span className="font-bold">{overhead.riskScore}分</span>
                  </div>
                  <p className="text-[10px] opacity-80 truncate" title={overhead.reason}>{overhead.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-slate-700 text-sm">台区风险</span>
            </div>
            <div className="space-y-1.5">
              {deviceRiskData.stations.slice(0, 3).map((station) => (
                <div key={station.id} className={`text-xs p-1.5 rounded border ${getRiskColor(station.riskLevel)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{station.name}</span>
                    <span className="font-bold">{station.riskScore}分</span>
                  </div>
                  <p className="text-[10px] opacity-80 truncate" title={station.reason}>{station.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 运维建议 */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            运维建议
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1">
              <FileDown className="w-4 h-4" />
              导出建议清单
            </Button>
            <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 px-4">
              <ClipboardCheck className="w-4 h-4" />
              生成运维计划
            </Button>
          </div>
        </div>

        {/* 分类标签 */}
        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Search className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">巡视建议</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">4</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ClipboardCheck className="w-4 h-4 text-cyan-600" />
            <span className="font-medium text-slate-700">试验建议</span>
            <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full text-xs">2</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Settings className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-slate-700">改造建议</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">2</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="font-medium text-slate-700">紧急缺陷</span>
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">2</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-orange-600" />
            <span className="font-medium text-slate-700">负荷转移</span>
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">1</span>
          </div>
        </div>

        {/* 建议卡片网格 */}
        <div className="grid grid-cols-5 gap-4">
          {/* 巡视建议 */}
          <div className="space-y-3">
            {/* 防雷特巡 */}
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-amber-800 mb-2 pr-12">防雷特巡</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">未来3天有雷暴天气，建议开展防雷特巡</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-23</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>架空段#15-#35杆</span>
              </div>
            </div>
            {/* 故障后特巡 */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-blue-800 mb-2 pr-12">故障后特巡</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">#2电房曾发生过负荷异常，建议开展故障特巡</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-20</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>#2电房</span>
              </div>
            </div>
            {/* 定期巡视 */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-blue-800 mb-2 pr-12">定期巡视</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">按照月度巡视计划开展常规设备巡视</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-25</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>全线</span>
              </div>
            </div>
            {/* 重要用户保电巡视 */}
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-amber-800 mb-2 pr-12">重要用户保电巡视</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">特级重要用户XX公司生产高峰期，建议加强保电巡视</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-20</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>XX公司专线</span>
              </div>
            </div>
          </div>

          {/* 试验建议 */}
          <div className="space-y-3">
            {/* 电缆绝缘试验 */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-blue-800 mb-2 pr-12">电缆绝缘试验</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">电缆段A运行5年，建议进行绝缘电阻测试</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-03-01</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>电缆段A</span>
              </div>
            </div>
            {/* 接头红外测温 */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-blue-800 mb-2 pr-12">接头红外测温</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">夏季高温前对电缆接头进行红外测温检查</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-04-15</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>全线电缆接头</span>
              </div>
            </div>
          </div>

          {/* 改造建议 */}
          <div className="space-y-3">
            {/* 自动化开关改造 */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-blue-800 mb-2 pr-12">自动化开关改造</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">建议将手动开关改造为自动化开关，提升自愈能力</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-06-01</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>开关#3、#4</span>
              </div>
            </div>
            {/* 分段优化改造 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-slate-700 mb-2 pr-12">分段优化改造</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">自动化分段用户数过多，建议优化分段方案</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-07-01</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>第二分段</span>
              </div>
            </div>
          </div>

          {/* 紧急缺陷 */}
          <div className="space-y-3">
            {/* 树障紧急清理 */}
            <div className="p-3 bg-red-50 rounded-lg border border-red-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-red-800 mb-2 pr-12">树障紧急清理</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">架空段#15-#35杆通道内树木距离导线不足安全距离</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-22</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>架空段#15-#35杆</span>
              </div>
            </div>
            {/* 台区T2重载处理 */}
            <div className="p-3 bg-red-50 rounded-lg border border-red-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-red-800 mb-2 pr-12">台区T2重载处理</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">负载率92%，需紧急进行负荷转移或增容</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-22</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>台区T2</span>
              </div>
            </div>
          </div>

          {/* 负荷转移 */}
          <div className="space-y-3">
            {/* 负荷转移方案执行 */}
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 relative">
              <div className="absolute top-3 right-3">
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <h4 className="text-sm font-medium text-orange-800 mb-2 pr-12">负荷转移方案执行</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">当前负载率持续&gt;90%，建议启动负荷转移</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026-02-23</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>大基头F18全线</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
