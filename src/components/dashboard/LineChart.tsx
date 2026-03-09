import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
  areaColor?: string;
  title?: string;
}

export function LineChart({ 
  data, 
  height = 200, 
  color = '#3b82f6',
  areaColor = 'rgba(59, 130, 246, 0.2)',
  title 
}: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
      yAxis: {
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
          type: 'line',
          data: data.map(d => d.value),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            color,
            width: 2,
          },
          itemStyle: {
            color,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: areaColor },
              { offset: 1, color: 'transparent' },
            ]),
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
  }, [data, color, areaColor, title]);

  return <div ref={chartRef} style={{ height }} className="w-full" />;
}
