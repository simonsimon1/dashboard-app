import { Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* 左侧标题 */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      </div>

      {/* 中间搜索 */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="搜索馈线、设备、网格..."
            className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500"
          />
        </div>
      </div>

      {/* 右侧操作 */}
      <div className="flex items-center gap-4">
        {/* 通知 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white border-slate-200">
            <div className="p-3 border-b border-slate-200">
              <h4 className="font-semibold text-slate-800">通知消息</h4>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-sm text-slate-800">紧急缺陷告警</p>
                    <p className="text-xs text-slate-500">西樵F35线路#23杆绝缘子击穿</p>
                    <p className="text-xs text-slate-400 mt-1">2分钟前</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-sm text-slate-800">高风险馈线预警</p>
                    <p className="text-xs text-slate-500">狮山F56负载率超过90%</p>
                    <p className="text-xs text-slate-400 mt-1">15分钟前</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-sm text-slate-800">天气预警</p>
                    <p className="text-xs text-slate-500">未来3天有雷暴天气，请注意防雷特巡</p>
                    <p className="text-xs text-slate-400 mt-1">1小时前</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem className="justify-center text-blue-600 cursor-pointer hover:bg-blue-50">
              查看全部通知
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-700">运维管理员</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border-slate-200">
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-50">
              <User className="w-4 h-4 mr-2 text-slate-600" />
              个人中心
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-50">
              <Settings className="w-4 h-4 mr-2 text-slate-600" />
              系统设置
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
