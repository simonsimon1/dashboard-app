import { useState } from 'react';
import { 
  Building2, Cable, Zap, Settings, Calendar, TrendingUp, AlertTriangle, FileText,
  MapPin, Camera, ClipboardCheck, Wind,
  Activity, Users, MapPinned, Image as ImageIcon, Radio,
  Navigation, Binoculars, Power, Network
} from 'lucide-react';
import { rooms } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadarChart } from './RadarChart';

// 风险维度数据
const riskDimensions = {
  userRisk: 85,
  operationRisk: 72,
  networkRisk: 65,
  deviceRisk: 78,
  environmentRisk: 45,
  historyRisk: 60,
  newEnergyRisk: 30,
};

export function DeviceDashboard() {
  const [activeTab, setActiveTab] = useState('room');

  const getRiskBadge = (level: string) => {
    const styles = { 
      extreme: 'bg-red-100 text-red-700 border-red-200', 
      high: 'bg-orange-100 text-orange-700 border-orange-200', 
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
      low: 'bg-green-100 text-green-700 border-green-200' 
    };
    const labels = { 
      extreme: '超高风险', 
      high: '高风险', 
      medium: '中风险', 
      low: '低风险' 
    };
    return <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium border ${styles[level as keyof typeof styles]}`}>{labels[level as keyof typeof labels]}</span>;
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">设备风险管理</h2>
          <p className="text-sm text-slate-500 mt-1">电房、电缆、架空线、台区设备风险详情与运维记录</p>
        </div>
        <Button variant="outline" size="sm" className="bg-white border-slate-200 hover:bg-slate-50">
          <FileText className="w-4 h-4 mr-2 text-slate-600" />导出报告
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 p-1">
          <TabsTrigger value="room" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Building2 className="w-4 h-4" />电房
          </TabsTrigger>
          <TabsTrigger value="cable" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Cable className="w-4 h-4" />电缆
          </TabsTrigger>
          <TabsTrigger value="overhead" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Zap className="w-4 h-4" />架空线
          </TabsTrigger>
          <TabsTrigger value="station" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Settings className="w-4 h-4" />台区
          </TabsTrigger>
        </TabsList>

        {/* 电房页 */}
        <TabsContent value="room" className="mt-6">
          <div className="space-y-6">
            {/* 电房基本信息 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-slate-500">电房名称</p>
                    <h2 className="text-2xl font-bold text-slate-800">{rooms[0].name}</h2>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div><p className="text-xs text-slate-500">电房编号</p><p className="text-sm text-slate-700">{rooms[0].id}</p></div>
                  <div><p className="text-xs text-slate-500">所属馈线</p><p className="text-sm text-slate-700">{rooms[0].feederName}</p></div>
                  <div><p className="text-xs text-slate-500">投运日期</p><p className="text-sm text-slate-700">{rooms[0].operationDate}</p></div>
                  <div><p className="text-xs text-slate-500">地理位置</p><p className="text-sm text-slate-700">桂城街道XX路XX号</p></div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">风险等级</p>
                  {getRiskBadge(rooms[0].riskLevel)}
                </div>
              </div>
            </div>

            {/* 关键指标 - 添加故障后用户损失数 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">风险评分</p>
                    <p className="text-2xl font-bold text-orange-600 mt-1">{rooms[0].riskScore}</p>
                    <p className="text-xs text-slate-400 mt-1">分</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">变压器容量</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{rooms[0].capacity}</p>
                    <p className="text-xs text-slate-400 mt-1">kVA</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg"><Zap className="w-5 h-5 text-blue-600" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">低压出线</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{rooms[0].lowVoltageLines}</p>
                    <p className="text-xs text-slate-400 mt-1">回</p>
                  </div>
                  <div className="p-2 bg-cyan-100 rounded-lg"><Cable className="w-5 h-5 text-cyan-600" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">重要用户</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{rooms[0].hasImportantUser ? '是' : '否'}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${rooms[0].hasImportantUser ? 'bg-orange-100' : 'bg-green-100'}`}>
                    <Building2 className={`w-5 h-5 ${rooms[0].hasImportantUser ? 'text-orange-600' : 'text-green-600'}`} />
                  </div>
                </div>
              </div>
              {/* 新增：故障后中压用户损失数 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">故障后中压用户损失</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">5</p>
                    <p className="text-xs text-slate-400 mt-1">户</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg"><Users className="w-5 h-5 text-red-600" /></div>
                </div>
              </div>
              {/* 新增：故障后低压用户损失数 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">故障后低压用户损失</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">356</p>
                    <p className="text-xs text-slate-400 mt-1">户</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg"><Users className="w-5 h-5 text-red-600" /></div>
                </div>
              </div>
            </div>

            {/* 风险雷达图 + 设备照片 + GIS地图 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 风险雷达图 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  多维风险画像
                </h3>
                <div className="flex justify-center">
                  <RadarChart data={riskDimensions} height={200} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-slate-600">高风险维度</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-slate-600">中风险维度</span>
                  </div>
                </div>
              </div>

              {/* 设备照片 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-600" />
                  设备照片
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">电房外观</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">内部设备</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">变压器</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">开关柜</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GIS地理位置 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPinned className="w-5 h-5 text-blue-600" />
                  GIS地理位置
                </h3>
                <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden">
                  {/* 模拟地图 */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="gridRoom" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#gridRoom)" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-red-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">#1电房</p>
                      <p className="text-xs text-slate-500">113.2645°E, 23.1291°N</p>
                    </div>
                  </div>
                  {/* 周边标记 */}
                  <div className="absolute top-4 left-4 p-2 bg-white rounded shadow-sm text-xs">
                    <p className="text-slate-500">最近电房</p>
                    <p className="font-medium">#2电房 <span className="text-slate-400">| 320m</span></p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    <Navigation className="w-3 h-3 mr-1" />导航
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    <MapPin className="w-3 h-3 mr-1" />查看周边
                  </Button>
                </div>
              </div>
            </div>

            {/* 设备清单和风险分析 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  设备清单
                </h3>
                <div className="space-y-3">
                  {[
                    { name: '变压器', model: 'S13-M-800/10', status: 'normal', score: 85 },
                    { name: '高压开关柜', model: 'KYN28A-12', status: 'warning', score: 72 },
                    { name: '低压开关柜', model: 'GCK', status: 'normal', score: 88 },
                    { name: '避雷器', model: 'HY5WS-17/50', status: 'normal', score: 90 },
                    { name: '互感器', model: 'LZZBJ9-10', status: 'attention', score: 65 },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{device.name}</p>
                        <p className="text-xs text-slate-500">{device.model}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${device.score}%`, backgroundColor: device.score >= 80 ? '#22c55e' : device.score >= 60 ? '#eab308' : '#f97316' }} />
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${device.status === 'normal' ? 'bg-green-100 text-green-600' : device.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-orange-100 text-orange-600'}`}>{device.score}分</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  风险因素分析
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">设备老化风险</span>
                    </div>
                    <p className="text-sm text-slate-600">运行8年，绝缘老化趋势明显，建议加强监测。</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-700">负载风险</span>
                    </div>
                    <p className="text-sm text-slate-600">当前负载率85%，夏季高峰期可能达到95%以上，存在过载风险。</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">环境风险</span>
                    </div>
                    <p className="text-sm text-slate-600">位于低洼地带，存在水浸风险，建议检查排水设施。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 试验记录和巡视记录 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  试验记录
                </h3>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {[
                      { date: '2024-06-15', item: '绝缘电阻、直流耐压', result: '合格', score: 85 },
                      { date: '2023-06-10', item: '绝缘电阻、变比、直流电阻', result: '合格', score: 88 },
                      { date: '2022-06-08', item: '全面预防性试验', result: '合格', score: 92 },
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <div>
                          <p className="text-sm text-slate-700">{record.date}</p>
                          <p className="text-xs text-slate-500">{record.item}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-600">{record.result}</span>
                          <span className="text-xs text-slate-500">{record.score}分</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700">下次试验日期: 2025-06-15</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  巡视记录
                </h3>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {[
                      { date: '2026-01-20', person: '张三', issue: '无异常' },
                      { date: '2025-12-15', person: '李四', issue: '变压器油位偏低' },
                      { date: '2025-11-10', person: '王五', issue: '无异常' },
                      { date: '2025-10-05', person: '张三', issue: '无异常' },
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <div>
                          <p className="text-sm text-slate-700">{record.date}</p>
                          <p className="text-xs text-slate-500">巡视人: {record.person}</p>
                        </div>
                        <span className={`text-xs ${record.issue === '无异常' ? 'text-green-600' : 'text-yellow-600'}`}>{record.issue}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">下次巡视日期: 2026-02-20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 电缆页 */}
        <TabsContent value="cable" className="mt-6">
          <div className="space-y-6">
            {/* 电缆基本信息 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-slate-500">电缆编号</p>
                    <h2 className="text-2xl font-bold text-slate-800">电缆段A</h2>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div><p className="text-xs text-slate-500">所属馈线</p><p className="text-sm text-slate-700">大基头F18</p></div>
                  <div><p className="text-xs text-slate-500">地区类型</p><p className="text-sm text-slate-700">城中村</p></div>
                  <div><p className="text-xs text-slate-500">电缆长度</p><p className="text-sm text-slate-700">850m</p></div>
                  <div><p className="text-xs text-slate-500">投运年限</p><p className="text-sm text-slate-700">5年</p></div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">风险等级</p>
                  {getRiskBadge('medium')}
                </div>
              </div>
            </div>

            {/* 关键指标 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">电缆截面积</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">240</p>
                <p className="text-xs text-slate-400 mt-1">mm²</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">中间头个数</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">2</p>
                <p className="text-xs text-slate-400 mt-1">个</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">起点电房</p>
                <p className="text-lg font-bold text-slate-800 mt-1">#1电房</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">终点电房</p>
                <p className="text-lg font-bold text-slate-800 mt-1">#2电房</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">起点开关遥控</p>
                <p className="text-2xl font-bold text-green-600 mt-1">可</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">终点开关遥控</p>
                <p className="text-2xl font-bold text-red-600 mt-1">否</p>
              </div>
            </div>

            {/* 敷设方式、联络情况和故障损失数 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">敷设方式</h3>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Cable className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">电缆沟敷设</p>
                      <p className="text-xs text-slate-500">地下敷设，埋深0.8m</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">联络情况</h3>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-sm text-slate-600">非联络电缆（末端电缆）</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">电缆故障后中压损失</h3>
                <div className="p-3 bg-red-50 rounded border border-red-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">中压用户损失</span>
                    <span className="text-2xl font-bold text-red-600">8</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">户</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">电缆故障后低压损失</h3>
                <div className="p-3 bg-red-50 rounded border border-red-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">低压用户损失</span>
                    <span className="text-2xl font-bold text-red-600">486</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">户</p>
                </div>
              </div>
            </div>

            {/* 风险因素分析 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                风险因素分析
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">设备老化</span>
                  </div>
                  <p className="text-sm text-slate-600">投运年限过长，电缆绝缘性能下降，需持续关注。</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">开关遥控受限</span>
                  </div>
                  <p className="text-sm text-slate-600">在主干线上但两端开关均不能三遥，故障定位困难。</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">通信问题</span>
                  </div>
                  <p className="text-sm text-slate-600">电缆02头电房位于地下且采用无线通信，信号不稳定。</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">试验数据需观察</span>
                  </div>
                  <p className="text-sm text-slate-600">上次试验数据需持续观察，建议缩短试验周期。</p>
                </div>
              </div>
            </div>

            {/* 试验记录和中间头记录 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">试验记录</h3>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm font-medium text-blue-800 mb-2">中间头位置信息</p>
                  <p className="text-xs text-slate-600">中间头位置：100米、345米、768米，共3个中间头</p>
                </div>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {[
                      { date: '2024-06-15', insulation: '500MΩ', pd: '2pC', voltage: '合格' },
                      { date: '2023-06-10', insulation: '450MΩ', pd: '3pC', voltage: '合格' },
                      { date: '2022-06-08', insulation: '600MΩ', pd: '1pC', voltage: '合格' },
                    ].map((record, index) => (
                      <div key={index} className="p-2 bg-slate-50 rounded border border-slate-100">
                        <p className="text-sm text-slate-700">{record.date}</p>
                        <div className="flex gap-4 mt-1 text-xs text-slate-500">
                          <span>绝缘电阻: {record.insulation}</span>
                          <span>局放量: {record.pd}</span>
                          <span>耐压: {record.voltage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">中间头制作记录</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">中间头 #1</span>
                      <span className="text-xs text-slate-400">距起点 280m</span>
                    </div>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>制作人员: <span className="text-slate-700">张三（高级技师）</span></p>
                      <p>制作方式: <span className="text-slate-700">冷缩</span></p>
                      <p>制作日期: <span className="text-slate-700">2019-03-15</span></p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">中间头 #2</span>
                      <span className="text-xs text-slate-400">距起点 620m</span>
                    </div>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>制作人员: <span className="text-slate-700">李四（技师）</span></p>
                      <p>制作方式: <span className="text-slate-700">冷缩</span></p>
                      <p>制作日期: <span className="text-slate-700">2019-03-15</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 架空线页 */}
        <TabsContent value="overhead" className="mt-6">
          <div className="space-y-6">
            {/* 架空线基本信息 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-slate-500">线路段名称</p>
                    <h2 className="text-2xl font-bold text-slate-800">架空段#15-#35</h2>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div><p className="text-xs text-slate-500">所属馈线</p><p className="text-sm text-slate-700">大基头F18</p></div>
                  <div><p className="text-xs text-slate-500">位置</p><p className="text-sm text-slate-700">桂城大道-南新三路</p></div>
                  <div><p className="text-xs text-slate-500">长度</p><p className="text-sm text-slate-700">1.2km</p></div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">风险等级</p>
                  {getRiskBadge('high')}
                </div>
              </div>
            </div>

            {/* 关键指标 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">导线截面积</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">120</p>
                <p className="text-xs text-slate-400 mt-1">mm²</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">同杆架设</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">是</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">同杆馈线数</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">3</p>
                <p className="text-xs text-slate-400 mt-1">条</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">中压用户数</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">8</p>
                <p className="text-xs text-slate-400 mt-1">户</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">低压用户数</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">156</p>
                <p className="text-xs text-slate-400 mt-1">户</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">电线杆数量</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">21</p>
                <p className="text-xs text-slate-400 mt-1">基</p>
              </div>
            </div>

            {/* 环境风险因素 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5 text-blue-600" />
                环境风险因素
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Trees className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">树障风险</span>
                  </div>
                  <p className="text-xs text-slate-600">沿线树木茂盛，距离导线不足安全距离</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">雷击频发区</span>
                  </div>
                  <p className="text-xs text-slate-600">位于雷击高发区域，需加强防雷措施</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">临近建筑物</span>
                  </div>
                  <p className="text-xs text-slate-600">#23-#25杆段距离建筑物较近</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Road className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">跨越公路</span>
                  </div>
                  <p className="text-xs text-slate-600">跨越桂城大道，车流量大</p>
                </div>
              </div>
            </div>

            {/* 设备清单 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">设备清单</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">跌落式熔断器</h4>
                  <div className="space-y-2">
                    {[
                      { name: '#15杆熔断器', status: 'normal' },
                      { name: '#22杆熔断器', status: 'warning' },
                      { name: '#28杆熔断器', status: 'normal' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-xs text-slate-700">{item.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${item.status === 'normal' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                          {item.status === 'normal' ? '正常' : '注意'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">刀闸</h4>
                  <div className="space-y-2">
                    {[
                      { name: '#18杆刀闸', status: 'normal' },
                      { name: '#25杆刀闸', status: 'normal' },
                      { name: '#32杆刀闸', status: 'normal' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-xs text-slate-700">{item.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-600">正常</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">电线杆</h4>
                  <div className="space-y-2">
                    {[
                      { name: '#20杆', status: 'attention' },
                      { name: '#24杆', status: 'normal' },
                      { name: '#30杆', status: 'normal' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-xs text-slate-700">{item.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${item.status === 'normal' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {item.status === 'normal' ? '正常' : '倾斜'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 巡视记录和无人机巡检 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Binoculars className="w-5 h-5 text-blue-600" />
                  巡视记录
                </h3>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {[
                      { date: '2026-01-20', person: '张三', content: '树障清理完成，导线距离树木2.5m' },
                      { date: '2025-12-15', person: '李四', content: '#22杆熔断器触头有氧化现象' },
                      { date: '2025-11-10', person: '王五', content: '全线正常，无异常' },
                    ].map((record, index) => (
                      <div key={index} className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">{record.date}</span>
                          <span className="text-xs text-slate-400">{record.person}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{record.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-600" />
                  无人机巡检照片
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">#20杆塔细节</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">树障风险点</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">导线弧垂</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">绝缘子状态</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 台区页 */}
        <TabsContent value="station" className="mt-6">
          <div className="space-y-6">
            {/* 台区基本信息 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-slate-500">台区名称</p>
                    <h2 className="text-2xl font-bold text-slate-800">台区T1</h2>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div><p className="text-xs text-slate-500">所属馈线</p><p className="text-sm text-slate-700">大基头F18</p></div>
                  <div><p className="text-xs text-slate-500">所属街道</p><p className="text-sm text-slate-700">桂城街道</p></div>
                  <div><p className="text-xs text-slate-500">所属社区</p><p className="text-sm text-slate-700">桂雅社区</p></div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">风险等级</p>
                  {getRiskBadge('medium')}
                </div>
              </div>
            </div>

            {/* 可联络台区信息 - 新增 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-600" />
                联络台区信息
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-blue-700">是否有可联络台区</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">是</span>
                  </div>
                  <p className="text-xs text-slate-600">该台区可通过联络开关与周边台区实现负荷转供</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-2">附近可联络台区</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700">台区T2（桂城F18）</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700">台区T5（桂城F20）</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700">台区T8（大基头F19）</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 关键指标 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">昨日最高负载率</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">85%</p>
                <p className="text-xs text-slate-400 mt-1">发生在 19:30</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">额定容量</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">800</p>
                <p className="text-xs text-slate-400 mt-1">kVA</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">供电半径</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">380</p>
                <p className="text-xs text-slate-400 mt-1">m</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">智能台区</p>
                <p className="text-2xl font-bold text-green-600 mt-1">是</p>
                <p className="text-xs text-slate-400 mt-1">含营配2.0</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">可接入容量</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">120</p>
                <p className="text-xs text-slate-400 mt-1">kVA</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <p className="text-sm text-slate-500">配变属性</p>
                <p className="text-xl font-bold text-slate-800 mt-1">干式</p>
              </div>
            </div>

            {/* 配变详情和出线信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">配变详情</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-slate-500">配变型号</p>
                    <p className="text-sm font-medium text-slate-800">SCB13-800/10</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-slate-500">投运日期</p>
                    <p className="text-sm font-medium text-slate-800">2019-06-15</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-slate-500">出厂日期</p>
                    <p className="text-sm font-medium text-slate-800">2019-03-20</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-slate-500">接线方式</p>
                    <p className="text-sm font-medium text-slate-800">Dyn11</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-slate-500">所属村社</p>
                    <p className="text-sm font-medium text-slate-800">桂城村</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-slate-500">供电社区路段</p>
                    <p className="text-sm font-medium text-slate-800">桂城大道西段</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">低压出线信息</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">出线1</span>
                      <span className="text-sm font-bold text-blue-600">400A</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">低压开关额定电流：400A</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">出线2</span>
                      <span className="text-sm font-bold text-blue-600">400A</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">低压开关额定电流：400A</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">出线3</span>
                      <span className="text-sm font-bold text-blue-600">300A</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">低压开关额定电流：300A</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">出线4</span>
                      <span className="text-sm font-bold text-blue-600">300A</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">低压开关额定电流：300A</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 台区照片 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                台区照片
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400">台区全景</span>
                  </div>
                </div>
                <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400">变压器</span>
                  </div>
                </div>
                <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400">低压配电箱</span>
                  </div>
                </div>
                <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400">出线开关</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 用户信息卡片 - 移到基本信息下方 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">用户信息</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">总用户数</p>
                  <p className="text-xl font-bold text-slate-800">156户</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">居民用户</p>
                  <p className="text-xl font-bold text-slate-800">142户</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">工商业用户</p>
                  <p className="text-xl font-bold text-slate-800">14户</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">是否城中村</p>
                  <p className="text-xl font-bold text-orange-600">是</p>
                </div>
              </div>
            </div>

            {/* 近7日负载趋势和风险因素分析 - 并排显示 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">近7日负载趋势</h3>
                <div className="h-48 bg-slate-50 rounded border border-slate-200 p-3">
                  <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
                    {/* 网格线 */}
                    {[0, 25, 50, 75, 100].map((y, i) => (
                      <line key={i} x1="0" y1={150 - y * 1.4} x2="400" y2={150 - y * 1.4} stroke="#e2e8f0" strokeWidth="1" />
                    ))}
                    {/* 负载折线 */}
                    <polyline
                      points="20,90 70,75 120,60 170,45 220,55 270,40 320,35"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                    {/* 数据点 */}
                    {[
                      { x: 20, y: 90 },
                      { x: 70, y: 75 },
                      { x: 120, y: 60 },
                      { x: 170, y: 45 },
                      { x: 220, y: 55 },
                      { x: 270, y: 40 },
                      { x: 320, y: 35 },
                    ].map((point, i) => (
                      <circle key={i} cx={point.x} cy={point.y} r="4" fill="#3b82f6" />
                    ))}
                  </svg>
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>2-26</span>
                    <span>2-27</span>
                    <span>2-28</span>
                    <span>3-1</span>
                    <span>3-2</span>
                    <span>3-3</span>
                    <span>3-4</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">风险因素分析</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">负载过高</span>
                    </div>
                    <p className="text-xs text-slate-600">昨日最高负载率85%，接近重载阈值，需持续关注。</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Power className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-700">低压开关残旧</span>
                    </div>
                    <p className="text-xs text-slate-600">部分低压开关运行超过8年，建议计划更换。</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">用户增长快</span>
                    </div>
                    <p className="text-xs text-slate-600">周边新建小区，预计未来一年用户增长30%。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 补充图标组件
function Trees({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V8" />
      <path d="M12 8L5 16" />
      <path d="M12 8l7 8" />
      <path d="M12 14L8 18" />
      <path d="M12 14l4 4" />
      <path d="M12 2v6" />
    </svg>
  );
}

function Road({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h16" />
      <path d="M4 5h16" />
      <path d="M6 5v14" />
      <path d="M18 5v14" />
      <path d="M12 8v8" />
    </svg>
  );
}
