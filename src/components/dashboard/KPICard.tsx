import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { RiskLevel } from '@/types';

interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: number;
  riskLevel?: RiskLevel;
  isAlert?: boolean;
  icon?: React.ReactNode;
  delay?: number;
}

export function KPICard({ 
  title, 
  value, 
  unit = '', 
  trend, 
  riskLevel,
  isAlert = false,
  icon,
  delay = 0 
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 1000;
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(Math.floor(startValue + (numericValue - startValue) * easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, numericValue]);
  
  const getRiskColor = (level?: RiskLevel) => {
    switch (level) {
      case 'extreme': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };
  
  const getRiskBg = (level?: RiskLevel) => {
    switch (level) {
      case 'extreme': return 'bg-red-500/10 border-red-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'bg-green-500/10 border-green-500/30';
      default: return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`dashboard-card transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${getRiskBg(riskLevel)} ${isAlert ? 'blink-alert' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className={`kpi-number text-3xl ${getRiskColor(riskLevel)}`}>
              {typeof value === 'string' && isNaN(numericValue) ? value : displayValue.toLocaleString()}
            </span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend > 0 ? 'text-red-400' : 'text-green-400'
            }`}>
              {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(trend)}%</span>
              <span className="text-muted-foreground">环比</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {icon && (
            <div className={`p-2 rounded-lg ${getRiskBg(riskLevel)}`}>
              {icon}
            </div>
          )}
          {isAlert && (
            <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
