import type { RiskLevel } from '@/types';

interface RiskBadgeProps {
  level: RiskLevel;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ level, text, size = 'sm' }: RiskBadgeProps) {
  const config = {
    extreme: {
      bg: 'bg-red-600',
      text: 'text-white',
      label: '超高风险',
    },
    high: {
      bg: 'bg-orange-500',
      text: 'text-white',
      label: '高风险',
    },
    medium: {
      bg: 'bg-yellow-500',
      text: 'text-black',
      label: '中风险',
    },
    low: {
      bg: 'bg-green-500',
      text: 'text-white',
      label: '低风险',
    },
    info: {
      bg: 'bg-blue-500',
      text: 'text-white',
      label: '正常',
    },
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const { bg, text: textColor, label } = config[level];

  return (
    <span className={`inline-flex items-center justify-center rounded font-medium ${bg} ${textColor} ${sizeClasses[size]}`}>
      {text || label}
    </span>
  );
}
