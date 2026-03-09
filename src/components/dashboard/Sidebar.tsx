import { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Zap,
  Wrench,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: { id: string; label: string }[];
}

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    label: '全局总览',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: 'feeder',
    label: '馈线管理',
    icon: <Zap className="w-5 h-5" />,
    children: [
      { id: 'feeder-profile', label: '线路画像' },
      { id: 'feeder-diagram', label: '单线图' },
      { id: 'feeder-map', label: '沿布图' },
    ],
  },
  {
    id: 'device',
    label: '设备管理',
    icon: <Settings className="w-5 h-5" />,
    children: [
      { id: 'device-room', label: '电房' },
      { id: 'device-cable', label: '电缆' },
      { id: 'device-overhead', label: '架空线' },
      { id: 'device-station', label: '台区' },
    ],
  },
  {
    id: 'strategy',
    label: '运维策略',
    icon: <ClipboardList className="w-5 h-5" />,
    children: [
      { id: 'strategy-test', label: '试验策略' },
      { id: 'strategy-inspection', label: '巡视策略' },
      { id: 'strategy-transform', label: '改造策略' },
    ],
  },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['feeder', 'device', 'strategy']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo区域 */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">配电网差异化</h1>
            <p className="text-xs text-blue-100">运维看板系统</p>
          </div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto py-4 bg-slate-50">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                  } else {
                    onPageChange(item.id);
                  }
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors',
                  currentPage === item.id || currentPage.startsWith(item.id + '-')
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.children && (
                  <ChevronRight 
                    className={cn(
                      'w-4 h-4 transition-transform text-slate-400',
                      expandedItems.includes(item.id) && 'rotate-90'
                    )} 
                  />
                )}
              </button>
              
              {/* 子菜单 */}
              {item.children && expandedItems.includes(item.id) && (
                <ul className="mt-1 ml-4 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => onPageChange(child.id)}
                        className={cn(
                          'w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors',
                          currentPage === child.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        )}
                      >
                        <span className="ml-8">{child.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* 底部信息 */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500">系统状态</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-600 font-medium">正常</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          数据更新: 2026-02-15 14:32
        </p>
      </div>
    </aside>
  );
}

import { ChevronRight } from 'lucide-react';
