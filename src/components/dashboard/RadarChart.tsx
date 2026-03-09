import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { RiskDimensions } from '@/types';

interface RadarChartProps {
  data: RiskDimensions;
  height?: number;
}

export function RadarChart({ data, height = 280 }: RadarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      radar: {
        indicator: [
          { name: '用户风险', max: 100 },
          { name: '运维风险', max: 100 },
          { name: '设备风险', max: 100 },
          { name: '网架风险', max: 100 },
          { name: '历史风险', max: 100 },
          { name: '新能源风险', max: 100 },
        ],
        shape: 'polygon',
        splitNumber: 4,
        axisName: {
          color: '#9ca3af',
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(55, 65, 81, 0.5)',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(17, 24, 39, 0.5)', 'rgba(17, 24, 39, 0.3)'],
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(55, 65, 81, 0.5)',
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [
                data.userRisk,
                data.operationRisk,
                data.deviceRisk,
                data.networkRisk,
                data.historyRisk,
                data.newEnergyRisk,
              ],
              name: '风险评分',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                  { offset: 1, color: 'rgba(6, 182, 212, 0.2)' },
                ]),
              },
              lineStyle: {
                color: '#3b82f6',
                width: 2,
              },
              itemStyle: {
                color: '#3b82f6',
                borderWidth: 2,
              },
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
  }, [data]);

  return <div ref={chartRef} style={{ height }} className="w-full" />;
}
