import { useState } from 'react';
import { 
  ClipboardList, 
  Route, 
  Wrench,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  MapPin,
  FileText,
  ArrowRight,
  Filter,
  Download,
  Send
} from 'lucide-react';
import { cables, grids } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export function StrategyDashboard() {
  const [activeTab, setActiveTab] = useState('test');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'generate' | 'push'>('generate');

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setConfirmAction('generate');
    setShowConfirmDialog(true);
  };

  const handlePush = () => {
    setConfirmAction('push');
    setShowConfirmDialog(true);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">差异化运维策略</h2>
          <p className="text-sm text-slate-500 mt-1">基于风险评估结果，自动生成试验、巡视、改造策略</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2 text-slate-600" />
            导出策略
          </Button>
        </div>
      </div>

      {/* 策略总览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">待制定试验计划</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">156</p>
              <p className="text-xs text-slate-400 mt-1">个设备</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg"><ClipboardList className="w-5 h-5 text-blue-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">待制定巡视计划</p>
              <p className="text-3xl font-bold text-cyan-600 mt-1">12</p>
              <p className="text-xs text-slate-400 mt-1">个网格</p>
            </div>
            <div className="p-2 bg-cyan-100 rounded-lg"><Route className="w-5 h-5 text-cyan-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">待制定改造项目</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">28</p>
              <p className="text-xs text-slate-400 mt-1">个</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg"><Wrench className="w-5 h-5 text-orange-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">本周已生成工单</p>
              <p className="text-3xl font-bold text-green-600 mt-1">45</p>
              <p className="text-xs text-slate-400 mt-1">个</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
          </div>
        </div>
      </div>

      {/* 策略类型Tab */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 p-1">
          <TabsTrigger value="test" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <ClipboardList className="w-4 h-4" />
            试验策略
          </TabsTrigger>
          <TabsTrigger value="inspection" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Route className="w-4 h-4" />
            巡视策略
          </TabsTrigger>
          <TabsTrigger value="transform" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Wrench className="w-4 h-4" />
            改造策略
          </TabsTrigger>
        </TabsList>

        {/* 试验策略 */}
        <TabsContent value="test" className="mt-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  试验策略
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  根据设备风险评分和上次试验日期，自动推荐试验周期和内容
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white border-slate-200 hover:bg-slate-50">
                  <Filter className="w-4 h-4 mr-2 text-slate-600" />
                  筛选
                </Button>
              </div>
            </div>

            {/* 试验周期推荐规则 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm font-medium text-red-600">高风险设备</p>
                <p className="text-2xl font-semibold mt-1 text-slate-800">每年1次</p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm font-medium text-amber-600">中风险设备</p>
                <p className="text-2xl font-semibold mt-1 text-slate-800">每2年1次</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-sm font-medium text-green-600">低风险设备</p>
                <p className="text-2xl font-semibold mt-1 text-slate-800">每3年1次</p>
              </div>
            </div>

            {/* 待试验设备列表 */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 flex items-center gap-4 border-b border-slate-200">
                <Checkbox 
                  checked={selectedItems.length === cables.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedItems(cables.map(c => c.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
                <span className="text-sm font-medium flex-1 text-slate-700">设备名称</span>
                <span className="text-sm font-medium w-20 text-slate-700">上次试验</span>
                <span className="text-sm font-medium w-20 text-slate-700">推荐日期</span>
                <span className="text-sm font-medium w-28 text-slate-700">推荐项目</span>
                <span className="text-sm font-medium w-32 text-slate-700">风险原因</span>
                <span className="text-sm font-medium w-20 text-slate-700">所属班组</span>
                <span className="text-sm font-medium w-16 text-slate-700">优先级</span>
              </div>
              <ScrollArea className="h-64">
                <div className="divide-y divide-slate-100">
                  {cables.map((cable) => (
                    <div key={cable.id} className="px-4 py-3 flex items-center gap-4 hover:bg-slate-50">
                      <Checkbox 
                        checked={selectedItems.includes(cable.id)}
                        onCheckedChange={() => toggleSelection(cable.id)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{cable.name}</p>
                        <p className="text-xs text-slate-500">{cable.model} | {cable.length}m</p>
                      </div>
                      <span className="text-sm w-20 text-slate-600">{cable.lastTestDate}</span>
                      <span className="text-sm w-20 text-blue-600 font-medium">2026-06</span>
                      <span className="text-sm w-28 text-slate-500">绝缘电阻、耐压</span>
                      <span className="text-sm w-32 text-slate-600 truncate">{cable.riskReason || '设备老化，绝缘下降'}</span>
                      <span className="text-sm w-20 text-slate-600">{cable.team || '运维一班'}</span>
                      <div className="w-16">
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium ${
                          cable.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                          cable.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {cable.riskLevel === 'high' ? '高' :
                           cable.riskLevel === 'medium' ? '中' : '低'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* 操作按钮 */}
            <div className="mt-4 flex gap-3">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700" 
                onClick={handleGenerate}
                disabled={selectedItems.length === 0}
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                生成试验计划 ({selectedItems.length})
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-white border-slate-200 hover:bg-slate-50"
                onClick={handlePush}
                disabled={selectedItems.length === 0}
              >
                <Send className="w-4 h-4 mr-2 text-slate-600" />
                推送至PMS
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* 巡视策略 */}
        <TabsContent value="inspection" className="mt-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  巡视策略
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  根据风险等级与上次巡视时间，自动推荐巡视方式、周期、侧重点
                </p>
              </div>
            </div>

            {/* 馈线巡视计划 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-slate-700">馈线巡视计划</h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 flex items-center gap-4 border-b border-slate-200">
                    <Checkbox />
                    <span className="text-sm font-medium flex-1 text-slate-700">馈线名称</span>
                    <span className="text-sm font-medium w-28 text-slate-700">风险原因</span>
                    <span className="text-sm font-medium w-20 text-slate-700">推荐日期</span>
                    <span className="text-sm font-medium w-20 text-slate-700">方式</span>
                    <span className="text-sm font-medium w-14 text-slate-700">周期</span>
                  </div>
                  <ScrollArea className="h-48">
                    <div className="divide-y divide-slate-100">
                      {grids.map((grid) => (
                        <div key={grid.id} className="px-4 py-3 flex items-center gap-4 hover:bg-slate-50">
                          <Checkbox />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{grid.name}</p>
                            <p className="text-xs text-slate-500">{grid.owner}</p>
                          </div>
                          <span className="text-sm w-28 text-slate-600 truncate">{grid.riskReason || '接头温度异常，绝缘老化'}</span>
                          <span className="text-sm w-20 text-slate-600">2026-02-20</span>
                          <span className="text-sm w-20">
                            {grid.riskLevel === 'high' ? '人巡+机巡' : 
                             grid.riskLevel === 'medium' ? '人巡' : '摄像头'}
                          </span>
                          <span className="text-sm w-14">
                            {grid.riskLevel === 'high' ? '15天' : 
                             grid.riskLevel === 'medium' ? '30天' : '60天'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* 巡视路径规划 */}
              <div>
                <h4 className="text-sm font-medium mb-3 text-slate-700">巡视路径规划</h4>
                <div className="relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200" style={{ height: '200px' }}>
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid4" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid4)" />
                    </svg>
                  </div>
                  
                  <div className="absolute inset-4">
                    {/* 模拟最优路径 */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path 
                        d="M 30 50 Q 80 80 130 60 T 200 100 T 280 80" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="3"
                        strokeDasharray="8,4"
                      />
                      {/* 途经点 */}
                      {[
                        { x: 30, y: 50 },
                        { x: 130, y: 60 },
                        { x: 200, y: 100 },
                        { x: 280, y: 80 },
                      ].map((pos, i) => (
                        <g key={i}>
                          <circle cx={pos.x} cy={pos.y} r="6" fill="#3b82f6" />
                          <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill="#475569" fontSize="10">
                            点{i+1}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs border border-slate-200">
                    <p className="text-slate-600">预计巡视时长: 4小时</p>
                    <p className="text-slate-600">途经设备: 12个</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 定制化巡视表单 */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-slate-700">定制化巡视表单</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  '设备外观检查',
                  '接头温度检测',
                  '绝缘子状态',
                  '树障情况',
                  '外破隐患',
                  '接地装置',
                  '标识完整性',
                  '周边环境',
                  '防水沙袋情况',
                  '台区低压出线情况',
                  '架空线绝缘情况',
                  '中间头状态检查',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200">
                    <Checkbox id={`check-${index}`} />
                    <label htmlFor={`check-${index}`} className="text-sm text-slate-700">{item}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="mt-4 flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ClipboardList className="w-4 h-4 mr-2" />
                生成巡视工单
              </Button>
              <Button variant="outline" className="flex-1 bg-white border-slate-200 hover:bg-slate-50">
                <Route className="w-4 h-4 mr-2 text-slate-600" />
                优化巡视路径
              </Button>
              <Button variant="outline" className="flex-1 bg-white border-slate-200 hover:bg-slate-50">
                <Send className="w-4 h-4 mr-2 text-slate-600" />
                推送至移动终端
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* 改造策略 */}
        <TabsContent value="transform" className="mt-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  改造策略
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  自动生成技术改造清单与网架优化清单，给出改造优先级排序
                </p>
              </div>
            </div>

            {/* 技术改造项目 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-slate-700">技术改造项目</h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 flex items-center gap-4 border-b border-slate-200">
                  <span className="text-sm font-medium flex-1 text-slate-700">项目名称</span>
                  <span className="text-sm font-medium w-24 text-slate-700">项目类型</span>
                  <span className="text-sm font-medium w-24 text-slate-700">涉及设备</span>
                  <span className="text-sm font-medium w-20 text-slate-700">风险评分</span>
                  <span className="text-sm font-medium w-20 text-slate-700">优先级</span>
                  <span className="text-sm font-medium w-24 text-slate-700">预计投资</span>
                </div>
                <ScrollArea className="h-48">
                  <div className="divide-y divide-slate-100">
                    {[
                      { name: '狮山村#2台区增容', type: '增容改造', devices: '1台', risk: 88, priority: 'high', investment: 15 },
                      { name: '西樵F35三遥改造', type: '自动化改造', devices: '8个', risk: 85, priority: 'high', investment: 45 },
                      { name: '桂城#1电房设备更新', type: '设备更新', devices: '5台', risk: 78, priority: 'medium', investment: 28 },
                      { name: '大基头F18分段开关增设', type: '网架优化', devices: '3个', risk: 72, priority: 'medium', investment: 35 },
                    ].map((project, index) => (
                      <div key={index} className="px-4 py-3 flex items-center gap-4 hover:bg-slate-50">
                        <span className="text-sm font-medium flex-1 text-slate-800">{project.name}</span>
                        <span className="text-sm w-24 text-slate-500">{project.type}</span>
                        <span className="text-sm w-24 text-slate-600">{project.devices}</span>
                        <span className="text-sm w-20 text-slate-600">{project.risk}分</span>
                        <div className="w-20">
                          <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium ${
                            project.priority === 'high' ? 'bg-red-100 text-red-700' :
                            project.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {project.priority === 'high' ? '高' :
                             project.priority === 'medium' ? '中' : '低'}
                          </span>
                        </div>
                        <span className="text-sm w-24 text-slate-600">{project.investment}万元</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* 网架优化项目 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-slate-700">网架优化项目</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-slate-800">联络率提升</span>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">85% → 92%</p>
                  <p className="text-sm text-slate-500 mt-2">
                    建议新增3条联络线
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-slate-800">N-1通过率</span>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">68% → 85%</p>
                  <p className="text-sm text-slate-500 mt-2">
                    建议优化5条馈线
                  </p>
                </div>
                
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-cyan-600" />
                    <span className="font-medium text-slate-800">分段合理性</span>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">优化12处</p>
                  <p className="text-sm text-slate-500 mt-2">
                    建议增设分段开关
                  </p>
                </div>
              </div>
            </div>

            {/* 改造优先级排序说明 */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">排序规则</span>
              </div>
              <p className="text-sm text-slate-600">
                改造优先级综合考虑风险评分、投资效益、施工难度等因素，高风险、高效益、低难度的项目优先。
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                生成改造计划
              </Button>
              <Button variant="outline" className="flex-1 bg-white border-slate-200 hover:bg-slate-50">
                <ArrowRight className="w-4 h-4 mr-2 text-slate-600" />
                查看项目详情
              </Button>
              <Button variant="outline" className="flex-1 bg-white border-slate-200 hover:bg-slate-50">
                <Send className="w-4 h-4 mr-2 text-slate-600" />
                推送至项目库
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 确认对话框 */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-slate-800">
              {confirmAction === 'generate' ? '生成计划' : '推送至系统'}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              {confirmAction === 'generate' 
                ? `确定要为选中的 ${selectedItems.length} 个设备生成试验计划吗？`
                : `确定要将选中的 ${selectedItems.length} 个设备推送至PMS系统吗？`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="bg-white border-slate-200 hover:bg-slate-50">
              取消
            </Button>
            <Button onClick={() => {
              setShowConfirmDialog(false);
              setSelectedItems([]);
            }} className="bg-blue-600 hover:bg-blue-700">
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
