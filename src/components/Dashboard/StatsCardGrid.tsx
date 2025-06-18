import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from 'recharts';

interface FunnelStage {
  name: string;
  count: number;
  value: number;
  durationText: string;
  colorClass: string;
  showTooltip?: boolean;
  tooltipText?: string;
}

const funnelData: FunnelStage[] = [
  { name: 'Discovery', count: 200, value: 200, durationText: '2 days', colorClass: 'bg-red-500' },
  { name: 'Qualified', count: 100, value: 100, durationText: '2 days', colorClass: 'bg-yellow-400', showTooltip: true, tooltipText: 'Average time on this stage' },
  { name: 'In conversation', count: 50, value: 100, durationText: 'Average time: 5 days', colorClass: 'bg-indigo-600' },
  { name: 'Negotiations', count: 20, value: 50, durationText: '8 days', colorClass: 'bg-green-500' },
  { name: 'Closed won', count: 20, value: 50, durationText: '10 days', colorClass: 'bg-purple-600' },
];

const totalActiveLeads = 600;
const funnelBarTotal = funnelData.reduce((sum, item) => sum + item.count, 0);

interface SourceData {
  name: string;
  value: number;
  percentage: number;
  colorClass: string;
  fillColor: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, colorClass: 'bg-rose-500', fillColor: '#F43F5E' },
  { name: 'Behance', value: 1000, percentage: 25, colorClass: 'bg-amber-400', fillColor: '#FBBF24' },
  { name: 'Instagram', value: 1000, percentage: 15, colorClass: 'bg-teal-500', fillColor: '#14B8A6' },
  { name: 'Dribbble', value: 1000, percentage: 10, colorClass: 'bg-green-400', fillColor: '#4ADE80' },
];

const StatsCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Funnel count</CardTitle>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">{totalActiveLeads}</span>
            <span className="ml-2 text-sm text-muted-foreground">active leads</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-2.5 w-full rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
            {funnelData.map((stage) => (
              <div
                key={stage.name}
                className={cn(stage.colorClass)}
                style={{ width: `${(stage.count / funnelBarTotal) * 100}%` }}
              />
            ))}
          </div>
          <ul className="space-y-3">
            {funnelData.map((stage) => (
              <li key={stage.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={cn('h-3 w-3 rounded-full mr-2', stage.colorClass)}></span>
                  <span>{stage.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-10 text-right text-muted-foreground">{stage.count}</span>
                  <span className="w-16 text-right text-muted-foreground">${stage.value}</span>
                  {stage.showTooltip ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="w-28 text-right text-muted-foreground cursor-help underline decoration-dashed">
                            {stage.durationText}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white">
                          <p>{stage.tooltipText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="w-28 text-right text-muted-foreground">{stage.durationText}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sources</CardTitle>
          <CardDescription className="flex items-center text-xs text-muted-foreground">
            from leads total
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="ml-1 h-3 w-3 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Breakdown of lead sources by total deal size.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-1/2 h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="percentage"
                  nameKey="name"
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fillColor} stroke={entry.fillColor} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="w-full sm:w-1/2 space-y-2">
            {sourcesData.map((source) => (
              <li key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={cn('h-3 w-3 rounded-full mr-2', source.colorClass)}></span>
                  <span>{source.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">${source.value.toLocaleString()}</span>
                    <span className="font-medium w-10 text-right">{source.percentage}%</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCardGrid;
