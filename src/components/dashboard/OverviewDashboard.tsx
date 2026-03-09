import { useState } from 'react';
import { 
  Zap, 
  Settings, 
  AlertTriangle, 
  Activity,
  ClipboardList,
  AlertCircle,
  Sun,
  CloudRain,
  Shield,
  Gauge,
  Umbrella,
  Wind,
  Users,
  Calendar,
  ChevronDown,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// 饼图组件
function PieChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  if (total === 0) return (
    <div className="h-32 flex items-center justify-center text-slate-400 text-sm">
      暂无数据
    </div>
  );

  return (
    <div className="relative h-32 flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {data.map((item, index) => {
          const percentage = item.value / total;
          const angle = percentage * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          const endAngle = currentAngle;
          
          const startRad = (startAngle - 90) * Math.PI / 180;
          const endRad = (endAngle - 90) * Math.PI / 180;
          
          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          return (
            <path
              key={index}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="50" cy="50" r="20" fill="white" />
        <text x="50" y="48" textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold fill-slate-600">
          {total}
        </text>
        <text x="50" y="60" textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-slate-400">
          总计
        </text>
      </svg>
      <div className="ml-3 space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-slate-500">{item.name}</span>
            <span className="font-medium text-slate-700">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 供电局树形选择组件
function AreaSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const areaTree = {
    guangzhou: {
      label: '广州供电局',
      children: {
        haizhu: {
          label: '海珠供电局',
          children: {
            haizhuwan: '海珠湾片区',
            zhongda: '中大片区',
            pazhou: '琶洲片区'
          }
        },
        liwan: { label: '荔湾供电局' },
        yuexiu: { label: '越秀供电局' },
        tianhe: { label: '天河供电局' },
        zengcheng: { label: '增城供电局' },
        nansha: { label: '南沙供电局' },
        conghua: { label: '从化供电局' },
        panyu: { label: '番禺供电局' },
        huadu: { label: '花都供电局' }
      }
    }
  };

  const getDisplayLabel = (val: string) => {
    const labels: Record<string, string> = {
      guangzhou: '广州供电局',
      haizhu: '海珠供电局',
      liwan: '荔湾供电局',
      yuexiu: '越秀供电局',
      tianhe: '天河供电局',
      zengcheng: '增城供电局',
      nansha: '南沙供电局',
      conghua: '从化供电局',
      panyu: '番禺供电局',
      huadu: '花都供电局',
      haizhuwan: '海珠湾片区',
      zhongda: '中大片区',
      pazhou: '琶洲片区'
    };
    return labels[val] || val;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-200 transition-colors"
      >
        <MapPin className="w-3.5 h-3.5 text-slate-500" />
        <span>{getDisplayLabel(value)}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50 p-3">
            <div className="flex gap-2">
              {/* 第一列 - 市级 */}
              <div className="flex-1">
                <div 
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer flex items-center justify-between ${value === 'guangzhou' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50'}`}
                  onClick={() => { onChange('guangzhou'); setIsOpen(false); }}
                >
                  <span>广州供电局</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
              
              {/* 第二列 - 区级 */}
              <div className="flex-1 border-l border-slate-100 pl-2">
                {Object.entries(areaTree.guangzhou.children).map(([key, item]: [string, any]) => (
                  <div 
                    key={key}
                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer flex items-center justify-between text-slate-700 ${value === key ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50'}`}
                    onClick={() => { 
                      if (!item.children) {
                        onChange(key); 
                        setIsOpen(false);
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                ))}
              </div>
              
              {/* 第三列 - 片区 */}
              <div className="flex-1 border-l border-slate-100 pl-2">
                {(value === 'haizhu' || value.startsWith('haizhu')) && Object.entries(areaTree.guangzhou.children.haizhu.children || {}).map(([key, label]: [string, any]) => (
                  <div 
                    key={key}
                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer text-slate-700 ${value === key ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50'}`}
                    onClick={() => { onChange(key); setIsOpen(false); }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button 
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                onClick={() => setIsOpen(false)}
              >
                关闭
              </button>
              <button 
                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                确定
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function OverviewDashboard() {
  const [selectedArea, setSelectedArea] = useState('guangzhou');
  const [selectedDevice, setSelectedDevice] = useState<string>('all');

  // 设备风险数据
  const deviceRiskData: Record<string, { name: string; value: number; color: string }[]> = {
    all: [
      { name: '高风险', value: 28, color: '#dc2626' },
      { name: '中风险', value: 93, color: '#f59e0b' },
      { name: '低风险', value: 278, color: '#22c55e' },
      { name: '无风险', value: 7427, color: '#cbd5e1' },
    ],
    switch: [
      { name: '高风险', value: 12, color: '#dc2626' },
      { name: '中风险', value: 28, color: '#f59e0b' },
      { name: '低风险', value: 45, color: '#22c55e' },
      { name: '无风险', value: 1254, color: '#cbd5e1' },
    ],
    transformer: [
      { name: '高风险', value: 8, color: '#dc2626' },
      { name: '中风险', value: 35, color: '#f59e0b' },
      { name: '低风险', value: 120, color: '#22c55e' },
      { name: '无风险', value: 2684, color: '#cbd5e1' },
    ],
    overhead: [
      { name: '高风险', value: 5, color: '#dc2626' },
      { name: '中风险', value: 18, color: '#f59e0b' },
      { name: '低风险', value: 65, color: '#22c55e' },
      { name: '无风险', value: 3420, color: '#cbd5e1' },
    ],
    cable: [
      { name: '高风险', value: 3, color: '#dc2626' },
      { name: '中风险', value: 12, color: '#f59e0b' },
      { name: '低风险', value: 48, color: '#22c55e' },
      { name: '无风险', value: 1560, color: '#cbd5e1' },
    ],
  };

  // 投运年限数据
  const yearDistribution: Record<string, { range: string; count: number; color: string }[]> = {
    all: [
      { range: '0-5年', count: 12456, color: '#3b82f6' },
      { range: '5-10年', count: 15678, color: '#60a5fa' },
      { range: '10-20年', count: 8923, color: '#93c5fd' },
      { range: '20年以上', count: 1567, color: '#bfdbfe' },
    ],
    switch: [
      { range: '0-5年', count: 456, color: '#3b82f6' },
      { range: '5-10年', count: 523, color: '#60a5fa' },
      { range: '10-20年', count: 289, color: '#93c5fd' },
      { range: '20年以上', count: 71, color: '#bfdbfe' },
    ],
    transformer: [
      { range: '0-5年', count: 892, color: '#3b82f6' },
      { range: '5-10年', count: 1123, color: '#60a5fa' },
      { range: '10-20年', count: 678, color: '#93c5fd' },
      { range: '20年以上', count: 154, color: '#bfdbfe' },
    ],
    overhead: [
      { range: '0-5年', count: 8923, color: '#3b82f6' },
      { range: '5-10年', count: 11234, color: '#60a5fa' },
      { range: '10-20年', count: 6789, color: '#93c5fd' },
      { range: '20年以上', count: 1562, color: '#bfdbfe' },
    ],
    cable: [
      { range: '0-5年', count: 2185, color: '#3b82f6' },
      { range: '5-10年', count: 2798, color: '#60a5fa' },
      { range: '10-20年', count: 1167, color: '#93c5fd' },
      { range: '20年以上', count: 780, color: '#bfdbfe' },
    ],
  };

  // 每月跳闸数据
  const monthlyTrips = [
    { month: '1月', count: 12 },
    { month: '2月', count: 8 },
    { month: '3月', count: 15 },
    { month: '4月', count: 10 },
    { month: '5月', count: 18 },
    { month: '6月', count: 22 },
    { month: '7月', count: 25 },
    { month: '8月', count: 20 },
    { month: '9月', count: 16 },
    { month: '10月', count: 14 },
    { month: '11月', count: 11 },
    { month: '12月', count: 9 },
  ];

  const maxTrip = Math.max(...monthlyTrips.map(d => d.count));
  const currentYearData = yearDistribution[selectedDevice] || yearDistribution.all;
  const maxCount = Math.max(...currentYearData.map(d => d.count));

  return (
    <div className="p-5 space-y-5 bg-slate-50/50 min-h-screen">
      {/* 顶部标题栏 - 商务风格 */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold text-slate-800">XX供电局配电网风险及差异化运维看板</h1>
                <AreaSelector value={selectedArea} onChange={setSelectedArea} />
              </div>
              <p className="text-xs text-slate-500">全景监控 · 精准运维 · 风险预警</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* 今日天气 */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded border border-slate-200">
              <Sun className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-xs text-slate-700">晴 26°C</p>
                <p className="text-[10px] text-slate-400">今日天气</p>
              </div>
            </div>
            {/* 明日天气 */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded border border-slate-200">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-slate-700">小雨 22°C</p>
                <p className="text-[10px] text-slate-400">明日天气</p>
              </div>
            </div>
            {/* 重要保供电事件 */}
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded border border-red-100">
              <Shield className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-xs text-red-700">高考</p>
                <p className="text-[10px] text-red-400">重要保供电</p>
              </div>
            </div>
            {/* 日期时间 */}
            <div className="text-right">
              <p className="text-base font-semibold text-slate-800">2026/3/9</p>
              <p className="text-xs text-slate-500">21:46:44</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区 - 三列布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* 左侧面板 */}
        <div className="lg:col-span-1 space-y-5">
          {/* 设备状态风险评估 - 修改为带扇形图和投运年限 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                设备状态风险评估
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            
            {/* 设备数量统计 */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                onClick={() => setSelectedDevice('switch')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedDevice === 'switch' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-600">开关（柜）</span>
                </div>
                <p className="text-lg font-bold text-slate-800">1,339</p>
              </button>
              <button 
                onClick={() => setSelectedDevice('transformer')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedDevice === 'transformer' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-600">变压器</span>
                </div>
                <p className="text-lg font-bold text-slate-800">2,847</p>
              </button>
              <button 
                onClick={() => setSelectedDevice('overhead')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedDevice === 'overhead' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-600">架空线</span>
                </div>
                <p className="text-lg font-bold text-slate-800">3,508</p>
              </button>
              <button 
                onClick={() => setSelectedDevice('cable')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedDevice === 'cable' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-600">电缆</span>
                </div>
                <p className="text-lg font-bold text-slate-800">1,623</p>
              </button>
            </div>

            {/* 扇形图展示风险分布 */}
            <div className="border-t border-slate-100 pt-3 mb-3">
              <p className="text-xs text-slate-500 mb-2">风险层级分布</p>
              <PieChart data={deviceRiskData[selectedDevice] || deviceRiskData.all} />
            </div>

            {/* 投运年限分布 */}
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500 mb-2">投运年限分布</p>
              <div className="space-y-1.5">
                {currentYearData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-12">{item.range}</span>
                    <div className="flex-1 h-3 bg-slate-100 rounded overflow-hidden">
                      <div 
                        className="h-full rounded"
                        style={{ 
                          width: `${(item.count / maxCount * 100)}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-600 w-10 text-right">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 运维风险与缺陷 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                运维风险与缺陷
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            
            <div className="space-y-2">
              {/* 今日中高风险作业 */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-700">今日中高风险作业</span>
                  </div>
                  <span className="text-xl font-bold text-amber-500">526个</span>
                </div>
                <div className="flex gap-3 text-xs ml-6">
                  <span className="text-red-500">高风险: 9个</span>
                  <span className="text-amber-500">中风险: 517个</span>
                </div>
              </div>
              
              {/* 本周停电计划 */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-700">本周停电计划</span>
                  </div>
                  <span className="text-xl font-bold text-blue-500">33个</span>
                </div>
                <div className="flex gap-3 text-xs ml-6">
                  <span className="text-slate-500">Ⅰ级: 6个</span>
                  <span className="text-slate-500">Ⅱ级: 27个</span>
                  <span className="text-slate-400">Ⅲ级: 0个</span>
                  <span className="text-slate-400">Ⅳ级: 0个</span>
                </div>
              </div>
              
              {/* 未消缺缺陷 */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700">未消缺缺陷</span>
                  </div>
                  <span className="text-xl font-bold text-amber-500">420个</span>
                </div>
                <div className="flex gap-3 text-xs ml-6">
                  <span className="text-red-500">紧急: 0个</span>
                  <span className="text-amber-500">重大: 2个</span>
                  <span className="text-slate-400">一般: 418个</span>
                </div>
              </div>
              
              {/* 未处理隐患 */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700">未处理隐患</span>
                  </div>
                  <span className="text-xl font-bold text-green-500">1个</span>
                </div>
                <div className="flex gap-3 text-xs ml-6">
                  <span className="text-slate-500">Ⅰ级重大: 0个</span>
                  <span className="text-slate-500">Ⅱ级重大: 0个</span>
                  <span className="text-slate-400">一般: 1个</span>
                </div>
              </div>
            </div>
          </div>

          {/* 用户服务风险 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              用户服务风险
            </h3>
            <div className="space-y-3">
              {/* 用户总数 */}
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">用户总数</span>
                  </div>
                  <span className="text-xl font-bold text-slate-800">36,094户</span>
                </div>
              </div>
              {/* 居民/工商业用户 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                  <p className="text-xs text-slate-500">居民用户</p>
                  <p className="text-lg font-bold text-slate-800">32,456<span className="text-xs font-normal">户</span></p>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                  <p className="text-xs text-slate-500">工商业用户</p>
                  <p className="text-lg font-bold text-slate-800">3,638<span className="text-xs font-normal">户</span></p>
                </div>
              </div>
              {/* 重要用户等级 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <p className="text-xs text-red-600">特级重要用户</p>
                  <p className="text-lg font-bold text-red-700">1<span className="text-xs font-normal">户</span></p>
                </div>
                <div className="p-2 bg-orange-50 rounded border border-orange-100">
                  <p className="text-xs text-orange-600">一级重要用户</p>
                  <p className="text-lg font-bold text-orange-700">3<span className="text-xs font-normal">户</span></p>
                </div>
                <div className="p-2 bg-cyan-50 rounded border border-cyan-100">
                  <p className="text-xs text-cyan-600">二级重要用户</p>
                  <p className="text-lg font-bold text-cyan-700">12<span className="text-xs font-normal">户</span></p>
                </div>
                <div className="p-2 bg-green-50 rounded border border-green-100">
                  <p className="text-xs text-green-600">三级重要用户</p>
                  <p className="text-lg font-bold text-green-700">45<span className="text-xs font-normal">户</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* 网架风险 - 添加专变用户问题 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                网架风险
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            
            <div className="p-2 bg-blue-50 border border-blue-100 rounded mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">理论自愈率</span>
                <span className="text-xl font-bold text-blue-600">92.3%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">大分段</span>
                <span className="float-right font-medium text-slate-800">5个</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">大分支</span>
                <span className="float-right font-medium text-slate-800">6个</span>
              </div>
              <div className="p-2 bg-orange-50 rounded border border-orange-100">
                <span className="text-orange-600">三遥开关不足</span>
                <span className="float-right font-medium text-orange-600">12个</span>
              </div>
            </div>

            {/* 专变用户问题 */}
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500 mb-2">专变用户问题</p>
              <div className="space-y-2">
                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-600">非双电源</span>
                    <span className="text-base font-bold text-red-600">23个</span>
                  </div>
                </div>
                <div className="p-2 bg-orange-50 rounded border border-orange-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600">用户分界点保护配置不合理</span>
                    <span className="text-base font-bold text-orange-600">15个</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中间面板 */}
        <div className="lg:col-span-2 space-y-5">
          {/* 基本信息 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              基本信息
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="text-xl font-bold text-slate-800">156</p>
                <p className="text-xs text-slate-500">馈线(条)</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="text-xl font-bold text-slate-800">2,847</p>
                <p className="text-xs text-slate-500">变压器(台)</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="text-xl font-bold text-slate-800">846</p>
                <p className="text-xs text-slate-500">电房(座)</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="text-xl font-bold text-slate-800">34.6</p>
                <p className="text-xs text-slate-500">电缆(km)</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="text-xl font-bold text-slate-800">128</p>
                <p className="text-xs text-slate-500">架空线(km)</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded border border-red-100">
                <p className="text-xl font-bold text-red-600">36.3k</p>
                <p className="text-xs text-red-500">关键设备</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded border border-red-100">
                <p className="text-xl font-bold text-red-600">12</p>
                <p className="text-xs text-red-500">高风险(条)</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="text-xl font-bold text-slate-800">36.1k</p>
                <p className="text-xs text-slate-500">用户数</p>
              </div>
            </div>
          </div>

          {/* 馈线风险评分排序 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                馈线风险评分排序
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-slate-50 px-3 py-2 flex items-center gap-3 border-b border-slate-200 text-xs">
                <span className="font-medium text-slate-600 w-8">排名</span>
                <span className="font-medium text-slate-600 flex-1">馈线名称</span>
                <span className="font-medium text-slate-600 w-14">评分</span>
                <span className="font-medium text-slate-600 w-28">风险原因</span>
                <span className="font-medium text-slate-600 w-16">班组</span>
                <span className="font-medium text-slate-600 w-12">等级</span>
              </div>
              <ScrollArea className="h-40">
                <div className="divide-y divide-slate-100">
                  {[
                    { name: '西樵F35', score: 95, reason: '负载95%, 设备老化', team: '运维一班', level: 'extreme' },
                    { name: '大基头F18', score: 72, reason: '负载92%, 网架薄弱', team: '运维二班', level: 'high' },
                    { name: '狮山F56', score: 68, reason: '负载89%, 历史跳闸', team: '运维一班', level: 'high' },
                    { name: '桂城F12', score: 61, reason: '负载85%, 电压偏低', team: '运维三班', level: 'medium' },
                    { name: '九江F08', score: 54, reason: '负载78%, 设备注意', team: '运维二班', level: 'medium' },
                    { name: '大沥F22', score: 48, reason: '负载75%, 树障风险', team: '运维一班', level: 'medium' },
                    { name: '里水F15', score: 42, reason: '负载72%, 外力破坏', team: '运维三班', level: 'low' },
                  ].map((feeder, index) => (
                    <div key={index} className="px-3 py-2 flex items-center gap-3 hover:bg-slate-50 text-xs">
                      <span className="w-8 text-center">
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded font-medium ${
                          index === 0 ? 'bg-red-100 text-red-600' :
                          index === 1 ? 'bg-orange-100 text-orange-600' :
                          index === 2 ? 'bg-yellow-100 text-yellow-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {index + 1}
                        </span>
                      </span>
                      <span className="flex-1 font-medium text-slate-700">{feeder.name}</span>
                      <span className="w-14 font-bold text-slate-800">{feeder.score}分</span>
                      <span className="w-28 text-slate-500">{feeder.reason}</span>
                      <span className="w-16 text-slate-500">{feeder.team}</span>
                      <span className="w-12">
                        <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          feeder.level === 'extreme' ? 'bg-red-100 text-red-700' :
                          feeder.level === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {feeder.level === 'extreme' ? '极高' :
                           feeder.level === 'high' ? '高' : '中'}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* 情景风险监控 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              情景风险监控（天气&保供电）
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-xs text-slate-600">雷击</span>
                </div>
                <p className="text-lg font-bold text-slate-800">3<span className="text-xs font-normal text-slate-500">处</span></p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Wind className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-slate-600">树障</span>
                </div>
                <p className="text-lg font-bold text-slate-800">12<span className="text-xs font-normal text-slate-500">处</span></p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Activity className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-xs text-slate-600">外力破坏</span>
                </div>
                <p className="text-lg font-bold text-slate-800">5<span className="text-xs font-normal text-slate-500">处</span></p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Umbrella className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs text-slate-600">水浸</span>
                </div>
                <p className="text-lg font-bold text-slate-800">2<span className="text-xs font-normal text-slate-500">处</span></p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">点击数字可在地图打点风险位置</p>
          </div>

          {/* 风险地图分布 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                风险地图分布
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">图层:</span>
                <div className="flex gap-1">
                  <button className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded border border-red-100">高风险馈线</button>
                  <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded border border-blue-100">情景风险</button>
                </div>
              </div>
            </div>
            
            {/* 模拟地图 */}
            <div className="relative bg-slate-50 rounded overflow-hidden" style={{ height: '320px' }}>
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="absolute inset-4">
                {/* 片区标记 */}
                <div className="absolute top-[20%] left-[30%] w-[25%] h-[30%] bg-green-50 border border-green-200 rounded flex items-center justify-center cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="text-center">
                    <p className="text-sm text-slate-700">桂城片区</p>
                    <span className="text-xs text-green-600">低风险</span>
                  </div>
                </div>
                
                <div className="absolute top-[15%] right-[20%] w-[28%] h-[35%] bg-orange-50 border border-orange-200 rounded flex items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="text-center">
                    <p className="text-sm text-slate-700">狮山片区</p>
                    <span className="text-xs text-orange-600">高风险</span>
                  </div>
                </div>
                
                <div className="absolute bottom-[20%] left-[15%] w-[30%] h-[32%] bg-red-50 border border-red-200 rounded flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors">
                  <div className="text-center">
                    <p className="text-sm text-slate-700">西樵片区</p>
                    <span className="text-xs text-red-600">超高风险</span>
                  </div>
                </div>
                
                <div className="absolute bottom-[25%] right-[25%] w-[22%] h-[28%] bg-yellow-50 border border-yellow-200 rounded flex items-center justify-center cursor-pointer hover:bg-yellow-100 transition-colors">
                  <div className="text-center">
                    <p className="text-sm text-slate-700">大沥片区</p>
                    <span className="text-xs text-yellow-600">中风险</span>
                  </div>
                </div>
                
                {/* 故障点标记 */}
                <div className="absolute top-[35%] right-[30%]">
                  <div className="relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-xs px-2 py-0.5 rounded">故障:西樵F35</div>
                </div>
                
                <div className="absolute top-[25%] right-[35%]">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-orange-500 text-white text-xs px-2 py-0.5 rounded">高负载:狮山F56</div>
                </div>
              </div>
              
              {/* 图例 */}
              <div className="absolute bottom-3 left-3 bg-white p-2 rounded border border-slate-200 shadow-sm">
                <p className="text-xs font-medium mb-1.5 text-slate-700">风险等级</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded" />
                    <span className="text-xs text-slate-600">超高风险</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded" />
                    <span className="text-xs text-slate-600">高风险</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded" />
                    <span className="text-xs text-slate-600">中风险</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded" />
                    <span className="text-xs text-slate-600">低风险</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 问题库执行情况 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              问题库执行情况
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: '技改问题库', completed: 62, total: 100 },
                { name: '网架改造问题库', completed: 41, total: 100 },
                { name: '自动化改造问题库', completed: 80, total: 100 },
                { name: '预防性试验计划', completed: 52, total: 100 },
              ].map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-xs text-slate-600 mb-2">{item.name}</p>
                  <div className="flex items-end justify-between mb-2">
                    <p className="text-xl font-bold text-slate-800">{Math.round(item.completed / item.total * 100)}%</p>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${item.completed / item.total * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
                    <span>已完成: {item.completed}</span>
                    <span>总计: {item.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="lg:col-span-1 space-y-5">
          {/* 关键指标 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              关键指标
              <span className="text-xs text-slate-400 font-normal">不可下钻</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <p className="text-xs text-slate-500">供电可靠率</p>
                <p className="text-lg font-bold text-green-600">99.95%</p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <p className="text-xs text-slate-500">故障定位时间</p>
                <p className="text-lg font-bold text-blue-600">3.2<span className="text-xs font-normal">分</span></p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <p className="text-xs text-slate-500">本月停电时户数</p>
                <p className="text-lg font-bold text-orange-600">128</p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                <p className="text-xs text-slate-500">跳闸总次数</p>
                <p className="text-lg font-bold text-red-600">45<span className="text-xs font-normal">次</span></p>
              </div>
            </div>
          </div>

          {/* 跳闸统计 - 添加折线图 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                跳闸统计
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            
            {/* 每月跳闸折线图 */}
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-2">每月跳闸统计</p>
              <div className="h-20 bg-slate-50 rounded border border-slate-200 p-2">
                <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <line x1="0" y1="15" x2="300" y2="15" stroke="#e2e8f0" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#e2e8f0" strokeWidth="0.5" />
                  <line x1="0" y1="45" x2="300" y2="45" stroke="#e2e8f0" strokeWidth="0.5" />
                  
                  {monthlyTrips.map((item, i) => {
                    const x = (i / (monthlyTrips.length - 1)) * 280 + 10;
                    const y = 55 - (item.count / maxTrip) * 45;
                    return (
                      <g key={i}>
                        {i < monthlyTrips.length - 1 && (
                          <line
                            x1={x}
                            y1={y}
                            x2={((i + 1) / (monthlyTrips.length - 1)) * 280 + 10}
                            y2={55 - (monthlyTrips[i + 1].count / maxTrip) * 45}
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                          />
                        )}
                        <circle cx={x} cy={y} r="2.5" fill="#3b82f6" />
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1月</span>
                <span>6月</span>
                <span>12月</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                { name: '西樵F35', time: '14:32', type: '故障跳闸', team: '运维一班' },
                { name: '大基头F18', time: '13:15', type: '过载跳闸', team: '运维二班' },
                { name: '狮山F56', time: '昨日', type: '雷击跳闸', team: '运维一班' },
              ].map((item, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">{item.name}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      item.type === '故障跳闸' ? 'bg-red-100 text-red-600' :
                      item.type === '过载跳闸' ? 'bg-orange-100 text-orange-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>{item.type}</span>
                    <span className="text-[10px] text-slate-400">{item.team}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 年度重复跳闸馈线 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                年度重复跳闸馈线
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-slate-50 px-2 py-1.5 flex items-center gap-2 border-b border-slate-200 text-xs">
                <span className="font-medium text-slate-600 flex-1">馈线名称</span>
                <span className="font-medium text-slate-600 w-8">次数</span>
                <span className="font-medium text-slate-600 w-14">运维班组</span>
                <span className="font-medium text-slate-600 w-12">原因</span>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: '西樵F35', count: 8, team: '运维一班', reason: '雷击' },
                  { name: '大基头F18', count: 6, team: '运维二班', reason: '树障' },
                  { name: '狮山F56', count: 5, team: '运维三班', reason: '外破' },
                  { name: '桂城F12', count: 4, team: '运维一班', reason: '故障' },
                ].map((item, index) => (
                  <div key={index} className="px-2 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-xs">
                    <span className="flex-1 text-slate-700">{item.name}</span>
                    <span className="w-8 font-bold text-red-600">{item.count}次</span>
                    <span className="w-14 text-[10px] text-slate-600">{item.team}</span>
                    <span className="w-12 text-[10px] text-slate-500 truncate" title={item.reason}>{item.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 年度重复跳闸台区 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                年度重复跳闸台区
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-slate-50 px-2 py-1.5 flex items-center gap-2 border-b border-slate-200 text-xs">
                <span className="font-medium text-slate-600 flex-1">台区名称</span>
                <span className="font-medium text-slate-600 w-8">次数</span>
                <span className="font-medium text-slate-600 w-14">运维班组</span>
                <span className="font-medium text-slate-600 w-12">原因</span>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: '西樵#1变', count: 8, team: '运维一班', reason: '雷击' },
                  { name: '大基头#2变', count: 6, team: '运维二班', reason: '树障' },
                  { name: '狮山#3变', count: 5, team: '运维三班', reason: '外破' },
                  { name: '桂城#1变', count: 4, team: '运维一班', reason: '故障' },
                ].map((item, index) => (
                  <div key={index} className="px-2 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-xs">
                    <span className="flex-1 text-slate-700">{item.name}</span>
                    <span className="w-8 font-bold text-red-600">{item.count}次</span>
                    <span className="w-14 text-[10px] text-slate-600">{item.team}</span>
                    <span className="w-12 text-[10px] text-slate-500 truncate" title={item.reason}>{item.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 高负载台区 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                高负载台区
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-slate-50 px-2 py-1.5 flex items-center gap-2 border-b border-slate-200 text-xs">
                <span className="font-medium text-slate-600 flex-1">台区名称</span>
                <span className="font-medium text-slate-600 w-12">负载率</span>
                <span className="font-medium text-slate-600 w-14">运维班组</span>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: '西樵#1变', rate: 98, team: '运维一班' },
                  { name: '大基头#2变', rate: 95, team: '运维二班' },
                  { name: '狮山#3变', rate: 93, team: '运维三班' },
                  { name: '桂城#1变', rate: 91, team: '运维一班' },
                ].map((item, index) => (
                  <div key={index} className="px-2 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-xs">
                    <span className="flex-1 text-slate-700">{item.name}</span>
                    <span className="w-12 font-bold text-orange-600">{item.rate}%</span>
                    <span className="w-14 text-[10px] text-slate-600">{item.team}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 低电压台区 */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                低电压台区
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">下钻详情</button>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-slate-50 px-2 py-1.5 flex items-center gap-2 border-b border-slate-200 text-xs">
                <span className="font-medium text-slate-600 flex-1">台区名称</span>
                <span className="font-medium text-slate-600 w-12">电压</span>
                <span className="font-medium text-slate-600 w-14">运维班组</span>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: '西樵#5变', voltage: 198, team: '运维一班' },
                  { name: '大基头#3变', voltage: 201, team: '运维二班' },
                  { name: '狮山#7变', voltage: 204, team: '运维三班' },
                  { name: '桂城#4变', voltage: 206, team: '运维一班' },
                ].map((item, index) => (
                  <div key={index} className="px-2 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-xs">
                    <span className="flex-1 text-slate-700">{item.name}</span>
                    <span className="w-12 font-bold text-red-600">{item.voltage}V</span>
                    <span className="w-14 text-[10px] text-slate-600">{item.team}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
