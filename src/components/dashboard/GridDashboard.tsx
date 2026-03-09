import { useState } from 'react';
import { MapPin, User, Zap, Settings, TrendingUp, TrendingDown, Calendar, ClipboardList, Route, Filter } from 'lucide-react';
import { RadarChart } from './RadarChart';
import { LineChart } from './LineChart';
import { grids, rooms, cables, overheads, stations, riskDimensions } from '@/data/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export function GridDashboard() {
  const [selectedGrid] = useState(grids[0]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const toggleDeviceSelection = (id: string) => {
    setSelectedDevices(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const getRiskBadge = (level: string) => {
    const styles = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    const labels = { high: '高风险', medium: '中风险', low: '低风险' };
    return <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium ${styles[level as keyof typeof styles]}`}>{labels[level as keyof typeof labels]}</span>;
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      {/* 网格基本信息 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div><p className="text-sm text-slate-500">网格名称</p><h2 className="text-xl font-bold text-slate-800">{selectedGrid.name}</h2></div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">{selectedGrid.area}</span></div>
            <div className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">网格主人: {selectedGrid.owner}</span></div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">{selectedGrid.feederCount}条馈线</span></div>
            <div className="flex items-center gap-2"><Settings className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">{selectedGrid.deviceCount}个设备</span></div>
          </div>
          <div className="text-right"><p className="text-sm text-slate-500">网格面积</p><p className="text-lg font-bold text-slate-800">{selectedGrid.areaSize}km²</p></div>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div><p className="text-sm text-slate-500">综合风险评分</p><p className="text-3xl font-bold text-orange-600 mt-1">{selectedGrid.riskScore}</p><p className="text-xs text-green-600 mt-1">↑ 3分 环比</p></div>
            <div className="p-2 bg-orange-100 rounded-lg"><TrendingUp className="w-5 h-5 text-orange-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div><p className="text-sm text-slate-500">馈线数量</p><p className="text-3xl font-bold text-slate-800 mt-1">{selectedGrid.feederCount}</p><p className="text-xs text-slate-400 mt-1">条</p></div>
            <div className="p-2 bg-blue-100 rounded-lg"><Zap className="w-5 h-5 text-blue-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div><p className="text-sm text-slate-500">设备总数</p><p className="text-3xl font-bold text-slate-800 mt-1">{selectedGrid.deviceCount}</p><p className="text-xs text-slate-400 mt-1">个</p></div>
            <div className="p-2 bg-cyan-100 rounded-lg"><Settings className="w-5 h-5 text-cyan-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div><p className="text-sm text-slate-500">高风险设备</p><p className="text-3xl font-bold text-orange-600 mt-1">12</p><p className="text-xs text-slate-400 mt-1">个</p></div>
            <div className="p-2 bg-orange-100 rounded-lg"><TrendingDown className="w-5 h-5 text-orange-600" /></div>
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧 - 风险分析 */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div>风险趋势（近6个月）</h3>
            <LineChart data={[{ label: '1月', value: selectedGrid.riskTrend[0] }, { label: '2月', value: selectedGrid.riskTrend[1] }, { label: '3月', value: selectedGrid.riskTrend[2] }, { label: '4月', value: selectedGrid.riskTrend[3] }, { label: '5月', value: selectedGrid.riskTrend[4] }, { label: '6月', value: selectedGrid.riskTrend[5] }]} height={200} color="#f97316" areaColor="rgba(249, 115, 22, 0.2)" />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div>风险维度分析</h3>
            <RadarChart data={riskDimensions} height={280} />
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100"><span className="text-slate-600">新能源风险</span><span className="text-red-600 font-medium">{riskDimensions.newEnergyRisk}分</span></div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100"><span className="text-slate-600">用户风险</span><span className="text-orange-600 font-medium">{riskDimensions.userRisk}分</span></div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100"><span className="text-slate-600">运维风险</span><span className="text-orange-600 font-medium">{riskDimensions.operationRisk}分</span></div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100"><span className="text-slate-600">设备风险</span><span className="text-yellow-600 font-medium">{riskDimensions.deviceRisk}分</span></div>
            </div>
          </div>
        </div>

        {/* 中间 - 网格地图 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div>网格风险地图</h3>
            <Button variant="outline" size="sm" className="text-xs bg-white"><Filter className="w-3 h-3 mr-1" />筛选</Button>
          </div>
          <div className="relative bg-slate-50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%"><defs><pattern id="grid2" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#64748b" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid2)" /></svg>
            </div>
            <div className="absolute inset-4">
              {rooms.map((room, index) => (
                <div key={room.id} className="absolute cursor-pointer hover:scale-110 transition-transform" style={{ top: `${20 + index * 25}%`, left: `${15 + index * 20}%` }}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${room.riskLevel === 'high' ? 'bg-red-500' : room.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}><Settings className="w-3 h-3 text-white" /></div>
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-xs px-2 py-1 rounded border border-slate-200 shadow-sm">{room.name}</div>
                </div>
              ))}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <path d="M 50 100 Q 150 150 250 120 T 400 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 80 200 Q 180 180 280 220 T 450 200" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-2 rounded-lg border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2"><Settings className="w-3 h-3 text-red-500" /><span className="text-xs text-slate-600">高风险电房</span></div>
                <div className="flex items-center gap-2"><Settings className="w-3 h-3 text-yellow-500" /><span className="text-xs text-slate-600">中风险电房</span></div>
                <div className="flex items-center gap-2"><Settings className="w-3 h-3 text-green-500" /><span className="text-xs text-slate-600">低风险电房</span></div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2"><Checkbox id="period" /><label htmlFor="period" className="text-sm text-slate-600">保供电时期</label></div>
            <div className="flex items-center gap-2"><Checkbox id="weather" /><label htmlFor="weather" className="text-sm text-slate-600">气象因素</label></div>
            <div className="flex items-center gap-2"><Checkbox id="device" /><label htmlFor="device" className="text-sm text-slate-600">仅关注设备状态</label></div>
          </div>
        </div>

        {/* 右侧 - 设备风险排序 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div>设备风险排序</h3>
            <Button variant="outline" size="sm" className="text-xs bg-white" disabled={selectedDevices.length === 0}><ClipboardList className="w-3 h-3 mr-1" />生成工单 ({selectedDevices.length})</Button>
          </div>
          <Tabs defaultValue="room" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="room" className="text-xs">电房</TabsTrigger>
              <TabsTrigger value="cable" className="text-xs">电缆</TabsTrigger>
              <TabsTrigger value="overhead" className="text-xs">架空</TabsTrigger>
              <TabsTrigger value="station" className="text-xs">台区</TabsTrigger>
            </TabsList>
            <TabsContent value="room" className="mt-4">
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {rooms.sort((a, b) => b.riskScore - a.riskScore).map((room, index) => (
                    <div key={room.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer border border-slate-100">
                      <Checkbox checked={selectedDevices.includes(room.id)} onCheckedChange={() => toggleDeviceSelection(room.id)} />
                      <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 text-xs rounded font-medium">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 truncate">{room.name}</p>
                        <p className="text-xs text-slate-500">{room.roomType === 'box' ? '箱变' : room.roomType === 'distribution' ? '配电室' : '开关站'} | 容量:{room.capacity}kVA</p>
                      </div>
                      <div className="text-right">{getRiskBadge(room.riskLevel)}<p className="text-xs text-slate-400 mt-1">{room.lastInspectionDate}</p></div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="cable" className="mt-4">
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {cables.sort((a, b) => b.riskScore - a.riskScore).map((cable, index) => (
                    <div key={cable.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer border border-slate-100">
                      <Checkbox checked={selectedDevices.includes(cable.id)} onCheckedChange={() => toggleDeviceSelection(cable.id)} />
                      <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 text-xs rounded font-medium">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 truncate">{cable.name}</p>
                        <p className="text-xs text-slate-500">{cable.length}m | {cable.model}</p>
                      </div>
                      <div className="text-right">{getRiskBadge(cable.riskLevel)}<p className="text-xs text-slate-400 mt-1">{cable.lastTestDate}</p></div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overhead" className="mt-4">
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {overheads.sort((a, b) => b.riskScore - a.riskScore).map((overhead, index) => (
                    <div key={overhead.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer border border-slate-100">
                      <Checkbox checked={selectedDevices.includes(overhead.id)} onCheckedChange={() => toggleDeviceSelection(overhead.id)} />
                      <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 text-xs rounded font-medium">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 truncate">{overhead.name}</p>
                        <p className="text-xs text-slate-500">{overhead.length}m | {overhead.poleCount}基杆塔</p>
                      </div>
                      <div className="text-right">{getRiskBadge(overhead.riskLevel)}<p className="text-xs text-slate-400 mt-1">树障:{overhead.treeObstructionRisk === 'high' ? '高' : '中'}</p></div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="station" className="mt-4">
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {stations.sort((a, b) => b.riskScore - a.riskScore).map((station, index) => (
                    <div key={station.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer border border-slate-100">
                      <Checkbox checked={selectedDevices.includes(station.id)} onCheckedChange={() => toggleDeviceSelection(station.id)} />
                      <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 text-xs rounded font-medium">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 truncate">{station.name}</p>
                        <p className="text-xs text-slate-500">{station.capacity}kVA | 负载:{station.loadRate}%</p>
                      </div>
                      <div className="text-right">{getRiskBadge(station.riskLevel)}<p className="text-xs text-slate-400 mt-1">{station.userCount}户</p></div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm"><Route className="w-4 h-4 mr-2" />生成巡视路径</Button>
            <Button variant="outline" className="flex-1 bg-white" size="sm"><Calendar className="w-4 h-4 mr-2" />制定计划</Button>
          </div>
        </div>
      </div>

      {/* 近期运维记录 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div>近期运维记录</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />
          <div className="space-y-4 ml-8">
            {[
              { date: '2026-02-14', type: '消缺', content: '处理西樵F35#23杆绝缘子击穿缺陷', status: 'completed' },
              { date: '2026-02-12', type: '巡视', content: '桂城网格例行巡视，发现3处树障隐患', status: 'completed' },
              { date: '2026-02-10', type: '试验', content: '狮山#2箱变预防性试验', status: 'completed' },
              { date: '2026-02-08', type: '故障', content: '大基头F18线路跳闸，已恢复供电', status: 'completed' },
            ].map((record, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{record.date}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${record.type === '消缺' ? 'bg-green-100 text-green-600' : record.type === '巡视' ? 'bg-blue-100 text-blue-600' : record.type === '试验' ? 'bg-cyan-100 text-cyan-600' : 'bg-red-100 text-red-600'}`}>{record.type}</span>
                    </div>
                    <span className="text-xs text-green-600">已完成</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">{record.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
