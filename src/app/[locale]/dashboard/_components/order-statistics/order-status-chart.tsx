'use client';

import { useMemo } from 'react';
import { OrdersByStatus } from '@/lib/types/order-statistics';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslations } from 'next-intl';

// Maps semantic color names to specific hex codes for the chart library
const STATUS_COLORS = {
  'emerald-500': '#00BC7D',
  'blue-500': '#2B7FFF',
  'red-600': '#DC2626',
} as const;

// Calculates the exact X/Y position for labels using polar coordinates (angle & radius)
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }: { cx?: number; cy?: number; midAngle?: number; outerRadius?: number; percent?: number }) => {
  // Handle undefined values
  if (cx === undefined || cy === undefined || midAngle === undefined || outerRadius === undefined || percent === undefined) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const labelRadius = outerRadius; // Places label on the outer edge of the chart
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  // Hide label if the segment is empty
  if (percent === 0) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={15} className="fill-white stroke-zinc-100 stroke-[1px] drop-shadow-sm" />
      <text
        x={0}
        y={0}
        className="fill-gray-700 text-[9px] font-bold text-center align-middle"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

type OrdersStatusChartProps = {
  ordersByStatus: OrdersByStatus[];
};

export function OrdersStatusChart({ ordersByStatus }: OrdersStatusChartProps) {
  // Translation
  const t = useTranslations('order-statistics');

  // Transforms raw API data into the specific shape Recharts requires
  const processedData = useMemo(() => {
    // Helper to safely find counts or default to 0
    const getCount = (id: string) => ordersByStatus.find((item) => item._id === id)?.count || 0;

    return [
      { name: t('completed'), value: getCount('completed'), color: STATUS_COLORS['emerald-500'] },
      { name: t('in-progress'), value: getCount('inProgress'), color: STATUS_COLORS['blue-500'] },
      { name: t('canceled'), value: getCount('canceled'), color: STATUS_COLORS['red-600'] },
    ];
  }, [ordersByStatus, t]);

  const total = processedData.reduce((sum, item) => sum + item.value, 0);
  const safeTotal = total === 0 ? 1 : total; // Prevents NaN errors during percentage calculation

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-zinc-800 text-2xl font-semibold text-center shrink-0">
        {t('orders-status')}
      </h2>

      {/* Chart Container */}
      <div className="flex-1 min-h-0 w-full relative flex justify-center items-center my-2">
        <ResponsiveContainer width="90%" height="90%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%" // Center X
              cy="50%" // Center Y
              innerRadius="50%" // Creates the "Donut" effect
              outerRadius="90%"
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={renderCustomizedLabel} // Attaches the custom coordinate math defined above
            >
              {/* Iterates to assign the specific hex color to each data slice */}
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 w-full shrink-0">
        {processedData.map((item) => (
          <div key={item.name} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {/* Status */}
              <div className={'w-2.5 h-2.5 rounded-full'} style={{ backgroundColor: item.color }} />

              {/* Status Name */}
              <span className="text-zinc-800 font-semibold text-xs">{item.name}</span>
            </div>

            <div className="text-zinc-800 font-bold text-xs">
              {/* Satatus Value */}
              {item.value}{' '}
              <span className="text-zinc-800 font-bold">
                {/* Status Precentage */}( {((item.value / safeTotal) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
