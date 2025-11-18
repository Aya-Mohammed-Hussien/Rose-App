'use client';

import { GetOrderStatisticsResponse } from '@/lib/types/order-statistics';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type RevenueChartProps = {
  orderStatistics: GetOrderStatisticsResponse;
};
export function RevenueChart({ orderStatistics }: RevenueChartProps) {
  // اللون الأساسي اللي هنستخدمه في كل حتة (عشان التناسق)
  const primaryChartColor = 'rgb(166, 37, 42)';

  const monthlyChartData = orderStatistics.statistics.monthlyRevenue
    .map((item) => {
      const [year, month] = item._id.split('-');
      const date = new Date(Number(year), Number(month) - 1);

      return {
        name: date.toLocaleString('en-US', { month: 'short' }),
        revenue: item.revenue,
      };
    })
    .reverse();

  const dailyChartData = orderStatistics.statistics.dailyRevenue
    .map((item) => {
      const date = new Date(item._id);

      return {
        name: date.toLocaleString('en-US', { day: 'numeric', month: 'short' }), // 16 Nov
        revenue: item.revenue,
      };
    })
    .reverse();

  const [activeView, setActiveView] = useState<'monthly' | 'daily'>('monthly');
  const chartData = activeView === 'monthly' ? monthlyChartData : dailyChartData;

  return (
    <div className="flex flex-col gap-[1.4375rem]">
      <div className="w-full flex justify-between  ">
        <h2 className="text-zinc-800 text-2xl font-semibold">Revenue</h2>

        <div className="flex flex-row gap-2 items-center">
          <button
            type="button"
            className={cn(
              ' text-sm transition-colors',
              activeView === 'monthly' ? 'text-maroon-600 font-semibold' : 'text-zinc-400'
            )}
            onClick={() => setActiveView('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={cn(
              ' text-sm transition-colors',
              activeView === 'daily' ? 'text-maroon-600 font-semibold' : 'text-zinc-400'
            )}
            onClick={() => setActiveView('daily')}
          >
            Last Week
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={297}>
        <AreaChart
          data={chartData}
          tabIndex={-1}
          key={activeView}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              {/* هنا استخدمت اللون الثابت */}
              <stop offset="0%" stopColor={primaryChartColor} stopOpacity={0.5} />
              <stop offset="100%" stopColor={primaryChartColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            dataKey="name"
            stroke="#27272A"
            fontSize={10}
            fontWeight={700}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#27272A"
            tickMargin={10}
            fontSize={10}
            fontWeight={700}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke={primaryChartColor} // هنا غيرنا لون الخط
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={2}
            // كمان النقطة الـ activeDot، هنخلي لون الـ fill بتاعها بنفس اللون
            activeDot={{
              r: 6,
              style: { fill: primaryChartColor, stroke: 'hsl(var(--background))' },
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
