import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  donut?: boolean;
  colors?: string[];
}

export function PieChart({ 
  data, 
  height = 200, 
  title,
  donut = false,
  colors = ['#3b82f6', '#06b6d4', '#22c55e', '#eab308', '#f97316', '#dc2626']
}: PieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      title: title ? {
        text: title,
        left: 'center',
        top: 5,
        textStyle: {
          color: '#d1d5db',
          fontSize: 14,
        },
      } : undefined,
      color: colors,
      series: [
        {
          type: 'pie',
          radius: donut ? ['40%', '70%'] : '70%',
          center: ['50%', '55%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            show: true,
            color: '#9ca3af',
            fontSize: 11,
            formatter: '{b}: {c}',
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(156, 163, 175, 0.5)',
            },
          },
        },
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: {
          color: '#f9fafb',
        },
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
      },
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [data, title, donut, colors]);

  return <div ref={chartRef} style={{ height }} className="w-full" />;
}
