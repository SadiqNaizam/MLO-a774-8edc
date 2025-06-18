import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonStat {
  id: string;
  percentage: string;
  reason: string;
}

const reasonsLostData: ReasonStat[] = [
  { id: 'reason1', percentage: '40%', reason: 'The proposal is unclear' },
  { id: 'reason2', percentage: '20%', reason: 'However venture pursuit' },
  { id: 'reason3', percentage: '10%', reason: 'Other' },
  { id: 'reason4', percentage: '30%', reason: 'The proposal is unclear' }, // As per image, duplicate reason
];

interface OtherStat {
  id: string;
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherStatsData: OtherStat[] = [
  { id: 'stat1', value: '900', label: 'total leads count' },
  { id: 'stat2', value: '12', label: 'days in average to convert lead' },
  { id: 'stat3', value: '30', label: 'inactive leads', hasInfo: true, infoText: 'Leads that have not been contacted in over 30 days.' },
];

const ReasonStatGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-1">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Reasons of leads lost</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsLostData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-foreground">{item.percentage}</p>
              <p className="text-sm text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-1">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Other data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
          {otherStatsData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-foreground">{item.value}</p>
              <p className="text-sm text-muted-foreground flex items-center">
                {item.label}
                {item.hasInfo && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1.5 h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonStatGrid;
