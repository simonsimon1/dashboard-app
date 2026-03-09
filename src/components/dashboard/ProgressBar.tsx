import { useEffect, useState, useRef } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  height?: number;
  delay?: number;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  color = '#3b82f6',
  height = 8,
  delay = 0
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  
  const percentage = Math.min((value / max) * 100, 100);
  
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
    
    if (barRef.current) {
      observer.observe(barRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 800;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(percentage * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, percentage]);
  
  const getColorByValue = (val: number) => {
    if (val >= 90) return '#dc2626';
    if (val >= 75) return '#f97316';
    if (val >= 60) return '#eab308';
    return color;
  };
  
  const barColor = getColorByValue(percentage);

  return (
    <div ref={barRef} className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium" style={{ color: barColor }}>
              {Math.round(displayValue)}%
            </span>
          )}
        </div>
      )}
      <div 
        className="w-full bg-muted rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ 
            width: `${displayValue}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}
