import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface GaugeChartProps {
  value: number;
  title?: string;
  height?: number;
  max?: number;
  unit?: string;
}

export function GaugeChart({ 
  value, 
  title,
  height = 180,
  max = 100,
  unit = '%'
}: GaugeChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);
    
    const getColor = (val: number) => {
      if (val >= 90) return '#dc2626';
      if (val >= 75) return '#f97316';
      if (val >= 60) return '#eab308';
      return '#22c55e';
    };

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max,
          splitNumber: 5,
          radius: '90%',
          center: ['50%', '70%'],
          itemStyle: {
            color: getColor(value),
          },
          progress: {
            show: true,
            width: 18,
          },
          pointer: {
            show: true,
            length: '60%',
            width: 4,
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [
                [0.6, '#22c55e'],
                [0.75, '#eab308'],
                [0.9, '#f97316'],
                [1, '#dc2626'],
              ],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 8,
            lineStyle: {
              width: 2,
              color: '#374151',
            },
          },
          axisLabel: {
            distance: 15,
            color: '#9ca3af',
            fontSize: 10,
          },
          anchor: {
            show: true,
            size: 15,
            itemStyle: {
              borderColor: '#374151',
              borderWidth: 2,
            },
          },
          title: {
            show: !!title,
            offsetCenter: [0, '-10%'],
            fontSize: 14,
            color: '#d1d5db',
          },
          detail: {
            valueAnimation: true,
            fontSize: 28,
            fontWeight: 'bold',
            offsetCenter: [0, '10%'],
            formatter: `{value}${unit}`,
            color: getColor(value),
          },
          data: [
            {
              value,
              name: title,
            },
          ],
        },
      ],
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
  }, [value, title, max, unit]);

  return <div ref={chartRef} style={{ height }} className="w-full" />;
}
