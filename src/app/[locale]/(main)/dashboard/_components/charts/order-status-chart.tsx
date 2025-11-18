'use client';

import { useMemo } from 'react';
import { OrdersByStatus } from '@/lib/types/order-statistics';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Custom label renderer using Tailwind classes
// Positioned so half the circle is outside and half is inside the donut
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  // Position the center of the label circle at the outer edge of the donut
  // This way half the circle (r=14) will be inside and half outside
  const labelRadius = outerRadius;
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  // Don't show label if percentage is 0
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
  const STATUS_COLORS = {
    'emerald-500': '#00BC7D',
    'blue-500': '#2B7FFF',
    'red-600': '#DC2626',
  };
  const processedData = useMemo(() => {
    const getCount = (id: string) => ordersByStatus.find((item) => item._id === id)?.count || 0;

    return [
      { name: 'Completed', value: getCount('completed'), color: STATUS_COLORS['emerald-500'] },
      { name: 'In progress', value: getCount('inProgress'), color: STATUS_COLORS['blue-500'] },
      { name: 'Canceled', value: getCount('canceled'), color: STATUS_COLORS['red-600'] },
    ];
  }, [ordersByStatus]);

  const total = processedData.reduce((sum, item) => sum + item.value, 0);
  const safeTotal = total === 0 ? 1 : total;

  return (
    // 1. خلي الكونتينر ياخد الطول والعرض كاملين ويعمل Flex
    <div className="w-full h-full flex flex-col justify-between">
      {/* العنوان */}
      <h2 className="text-zinc-800 text-2xl font-semibold text-center shrink-0">Orders Status</h2>

      {/* 2. منطقة الرسم:
         flex-1: عشان تاخد كل المساحة المتاحة بين العنوان والـ Legend
         min-h-0: مهم جداً عشان الـ chart يصغر لو الشاشة صغرت وميخرجش برا
      */}
      <div className="flex-1 min-h-0 w-full relative flex justify-center items-center my-2">
        <ResponsiveContainer width="90%" height="90%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              // 3. استخدمنا نسب مئوية عشان تتجاوب مع أي حجم
              innerRadius="50%"
              outerRadius="90%"
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* الـ Legend: shrink-0 عشان مساحتها متصغرش */}
      <div className="flex flex-col gap-3 w-full shrink-0">
        {processedData.map((item) => (
          <div key={item.name} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className={'w-2.5 h-2.5 rounded-full'} style={{ backgroundColor: item.color }} />
              <span className="text-zinc-800 font-semibold text-xs">{item.name}</span>
            </div>
            <div className="text-zinc-800 font-bold text-xs">
              {item.value}{' '}
              <span className="text-zinc-800 font-bold">
                ({((item.value / safeTotal) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
