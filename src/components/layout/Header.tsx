import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, className }) => {
  const createMenuItems = [
    { label: 'New Lead' },
    { label: 'New Customer' },
    { label: 'New Proposal' },
    { label: 'New Task' },
  ] as const;

  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6", 
        className
      )}
    >
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <Button variant="outline" size="icon" className="lg:hidden" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {createMenuItems.map((item) => (
            <DropdownMenuItem key={item.label} onClick={() => console.log(`Create ${item.label}`)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
