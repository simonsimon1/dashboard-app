import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { OverviewDashboard } from '@/components/dashboard/OverviewDashboard';
import { GridDashboard } from '@/components/dashboard/GridDashboard';
import { FeederDashboard } from '@/components/dashboard/FeederDashboard';
import { DeviceDashboard } from '@/components/dashboard/DeviceDashboard';
import { StrategyDashboard } from '@/components/dashboard/StrategyDashboard';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const getPageTitle = () => {
    switch (currentPage) {
      case 'overview':
        return '全局总览';
      case 'grid':
      case 'grid-risk':
      case 'grid-inspection':
        return '网格风险管理';
      case 'feeder':
      case 'feeder-profile':
      case 'feeder-diagram':
      case 'feeder-map':
        return '馈线详情';
      case 'device':
      case 'device-room':
      case 'device-cable':
      case 'device-overhead':
      case 'device-station':
        return '设备管理';
      case 'strategy':
      case 'strategy-test':
      case 'strategy-inspection':
      case 'strategy-transform':
        return '差异化运维策略';
      case 'monitor':
        return '实时监测';
      case 'report':
        return '报表分析';
      default:
        return '全局总览';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewDashboard />;
      case 'grid':
      case 'grid-risk':
      case 'grid-inspection':
        return <GridDashboard />;
      case 'feeder':
      case 'feeder-profile':
      case 'feeder-diagram':
      case 'feeder-map':
        return <FeederDashboard />;
      case 'device':
      case 'device-room':
      case 'device-cable':
      case 'device-overhead':
      case 'device-station':
        return <DeviceDashboard />;
      case 'strategy':
      case 'strategy-test':
      case 'strategy-inspection':
      case 'strategy-transform':
        return <StrategyDashboard />;
      case 'monitor':
        return (
          <div className="p-6">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">实时监测</h2>
              <p className="text-muted-foreground">实时监测功能正在开发中...</p>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="p-6">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">报表分析</h2>
              <p className="text-muted-foreground">报表分析功能正在开发中...</p>
            </div>
          </div>
        );
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* 主内容区 */}
      <div className="ml-60 min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <Header title={getPageTitle()} />
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
      
      {/* Toast通知 */}
      <Toaster />
    </div>
  );
}

export default App;
