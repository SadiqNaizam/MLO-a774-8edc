import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

interface ChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsChartData: ChartDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 85 },
  { month: 'April', closedWon: 40, closedLost: 55 },
  { month: 'May', closedWon: 80, closedLost: 65 },
  { month: 'June', closedWon: 10, closedLost: 70 },
  { month: 'July', closedWon: 45, closedLost: 50 },
  { month: 'August', closedWon: 95, closedLost: 30 },
  { month: 'September', closedWon: 70, closedLost: 40 },
  { month: 'October', closedWon: 50, closedLost: 20 },
];

type ChartFilter = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const LeadsChart: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<ChartFilter>('leadsConverted');
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('last-6-months');

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>Leads tracking</CardTitle>
            <div className="flex items-baseline space-x-4 mt-1">
              <div>
                <span className="text-3xl font-bold">680</span>
                <span className="ml-1 text-sm text-muted-foreground">total closed</span>
              </div>
              <div>
                <span className="text-3xl font-bold">70</span>
                <span className="ml-1 text-sm text-muted-foreground">total lost</span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="this-year">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex space-x-2 border-b pb-2">
          {(['leadsCame', 'leadsConverted', 'totalDealsSize'] as ChartFilter[]).map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={cn(activeFilter === filter && 'bg-muted text-muted-foreground font-semibold')}
            >
              {filter === 'leadsCame' && 'Leads Came'}
              {filter === 'leadsConverted' && 'Leads Converted'}
              {filter === 'totalDealsSize' && 'Total Deals Size'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leadsChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} dy={10} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} dx={-5} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              itemStyle={{ color: 'hsl(var(--card-foreground))' }}
            />
            <Legend verticalAlign="top" align="right" height={36} iconType="square" iconSize={10} 
              formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
            />
            <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#14B8A6" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#14B8A6', stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#F43F5E" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#F43F5E', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;
