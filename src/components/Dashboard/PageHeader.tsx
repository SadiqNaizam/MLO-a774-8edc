import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

const PageHeader: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('last-6-months');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4 sm:mb-0">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
      </Tabs>
      
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
  );
};

export default PageHeader;
