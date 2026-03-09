import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
  title?: string;
  horizontal?: boolean;
}

export function BarChart({ 
  data, 
  height = 200, 
  color = '#3b82f6',
  title,
  horizontal = false
}: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      grid: {
        left: horizontal ? '15%' : '3%',
        right: '4%',
        bottom: horizontal ? '3%' : '10%',
        top: title ? '15%' : '10%',
        containLabel: true,
      },
      title: title ? {
        text: title,
        left: 'center',
        top: 5,
        textStyle: {
          color: '#d1d5db',
          fontSize: 14,
        },
      } : undefined,
      xAxis: horizontal ? {
        type: 'value',
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(55, 65, 81, 0.3)',
          },
        },
        axisLabel: {
          color: '#9ca3af',
          fontSize: 11,
        },
      } : {
        type: 'category',
        data: data.map(d => d.label),
        axisLine: {
          lineStyle: {
            color: 'rgba(55, 65, 81, 0.5)',
          },
        },
        axisLabel: {
          color: '#9ca3af',
          fontSize: 11,
        },
      },
      yAxis: horizontal ? {
        type: 'category',
        data: data.map(d => d.label),
        axisLine: {
          lineStyle: {
            color: 'rgba(55, 65, 81, 0.5)',
          },
        },
        axisLabel: {
          color: '#9ca3af',
          fontSize: 11,
        },
      } : {
        type: 'value',
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(55, 65, 81, 0.3)',
          },
        },
        axisLabel: {
          color: '#9ca3af',
          fontSize: 11,
        },
      },
      series: [
        {
          type: 'bar',
          data: data.map(d => d.value),
          barWidth: horizontal ? '60%' : '50%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              horizontal ? 1 : 0, 
              horizontal ? 0 : 0, 
              horizontal ? 0 : 0, 
              horizontal ? 0 : 1,
              [
                { offset: 0, color },
                { offset: 1, color: color + '80' },
              ]
            ),
            borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: {
          color: '#f9fafb',
        },
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
  }, [data, color, title, horizontal]);

  return <div ref={chartRef} style={{ height }} className="w-full" />;
}
