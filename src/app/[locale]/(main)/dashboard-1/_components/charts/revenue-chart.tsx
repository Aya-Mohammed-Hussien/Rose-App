'use client';

import { GetOrderStatisticsResponse } from '@/lib/types/order-statistics';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
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
  // Translation
  const t = useTranslations('order-statistics');

  // Constants
  // Primary brand color used for the chart line and gradient fill
  const primaryChartColor = 'rgb(166, 37, 42)';

  // Computed Values
  // Transforms monthly revenue data from API format (YYYY-MM) into chart-ready format
  const monthlyChartData = orderStatistics.statistics.monthlyRevenue
    .map((item) => {
      // Splits "2024-03" into year and month parts
      const [year, month] = item._id.split('-');
      // Creates Date object (month is 0-indexed, so subtract 1)
      const date = new Date(Number(year), Number(month) - 1);

      return {
        // Formats as "Jan", "Feb", etc.
        name: date.toLocaleString('en-US', { month: 'short' }),
        revenue: item.revenue,
      };
    })
    .reverse(); // Reverses to show oldest to newest (left to right)

  // Transforms daily revenue data from ISO date strings into chart-ready format
  const dailyChartData = orderStatistics.statistics.dailyRevenue
    .map((item) => {
      // Parses ISO date string (e.g., "2024-11-16T00:00:00.000Z")
      const date = new Date(item._id);

      return {
        // Formats as "16 Nov"
        name: date.toLocaleString('en-US', { day: 'numeric', month: 'short' }),
        revenue: item.revenue,
      };
    })
    .reverse(); // Reverses to show oldest to newest (left to right)

  // State
  // Tracks which time period view is currently active (monthly or daily)
  const [activeView, setActiveView] = useState<'monthly' | 'daily'>('monthly');

  // Selects the appropriate dataset based on the active view
  const chartData = activeView === 'monthly' ? monthlyChartData : dailyChartData;

  return (
    <div className="flex flex-col gap-[1.4375rem]">
      {/* Header Section */}
      <div className="w-full flex justify-between  ">
        {/* Title */}
        <h2 className="text-zinc-800 text-2xl font-semibold">{t('revenue.title')}</h2>

        {/* View Toggle Buttons */}
        <div className="flex flex-row gap-2 items-center">
          {/* Monthly View Button */}
          <button
            type="button"
            className={cn(
              ' text-sm transition-colors',
              // Highlights active button with brand color and bold text
              activeView === 'monthly' ? 'text-maroon-600 font-semibold' : 'text-zinc-400'
            )}
            onClick={() => setActiveView('monthly')}
          >
            {t('revenue.monthly-button')}
          </button>

          {/* Daily View Button */}
          <button
            type="button"
            className={cn(
              ' text-sm transition-colors',
              // Highlights active button with brand color and bold text
              activeView === 'daily' ? 'text-maroon-600 font-semibold' : 'text-zinc-400'
            )}
            onClick={() => setActiveView('daily')}
          >
            {t('revenue.last-week-button')}
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={297}>
        <AreaChart
          data={chartData}
          tabIndex={-1} // Removes chart from keyboard navigation focus
          key={activeView} // Forces re-render when switching views to ensure smooth transitions
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {/* Gradient Definition */}
          {/* Creates a vertical gradient that fades from semi-transparent to fully transparent */}
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              {/* Top of the area: 50% opacity for visible fill */}
              <stop offset="0%" stopColor={primaryChartColor} stopOpacity={0.5} />
              {/* Bottom of the area: fully transparent for smooth fade effect */}
              <stop offset="100%" stopColor={primaryChartColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* X-Axis Configuration */}
          {/* Displays time labels (month names or dates) along the bottom */}
          <XAxis
            tickMargin={10} // Spacing between tick labels and axis
            dataKey="name" // Maps to the "name" property in chartData
            stroke="#27272A" // Dark gray color for axis text
            fontSize={10}
            fontWeight={700} // Bold text for better readability
            tickLine={false} // Hides the small lines extending from axis
            axisLine={false} // Hides the main axis line for cleaner look
          />

          {/* Y-Axis Configuration */}
          {/* Displays revenue values along the left side */}
          <YAxis
            stroke="#27272A" // Dark gray color for axis text
            tickMargin={10} // Spacing between tick labels and axis
            fontSize={10}
            fontWeight={700} // Bold text for better readability
            tickLine={false} // Hides the small lines extending from axis
            axisLine={false} // Hides the main axis line for cleaner look
            tickFormatter={(value) => `${value}`} // Formats numbers as plain strings
          />

          {/* Grid Lines */}
          {/* Adds subtle dashed lines for easier value reading */}
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

          {/* Tooltip Configuration */}
          {/* Customizes the hover tooltip appearance to match theme */}
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))', // Uses theme card background
              borderColor: 'hsl(var(--border))', // Uses theme border color
              borderRadius: 'var(--radius)', // Uses theme border radius
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }} // Uses theme text color
          />

          {/* Area Series */}
          {/* Renders the filled area chart representing revenue over time */}
          <Area
            type="monotone" // Smooth curve interpolation between data points
            dataKey="revenue" // Maps to the "revenue" property in chartData
            stroke={primaryChartColor} // Line color matching brand
            fillOpacity={1} // Full opacity for the gradient fill
            fill="url(#colorRevenue)" // Applies the gradient defined in <defs>
            strokeWidth={2} // 2px line thickness for clear visibility
            activeDot={{
              // Customizes the dot that appears on hover
              r: 6, // 6px radius for the hover dot
              style: {
                fill: primaryChartColor, // Brand color fill
                stroke: 'hsl(var(--background))', // White/background color border for contrast
              },
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
