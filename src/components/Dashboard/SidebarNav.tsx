import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  Briefcase,
  FileText,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Icon as LucideIcon,
} from 'lucide-react';

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
  current: boolean;
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutGrid, href: '#', current: true },
  { name: 'Leads', icon: Users, href: '#', current: false },
  { name: 'Customers', icon: User, href: '#', current: false },
  { name: 'Proposals', icon: Briefcase, href: '#', current: false },
  { name: 'Invoices', icon: FileText, href: '#', current: false },
  { name: 'Items', icon: ShoppingCart, href: '#', current: false },
  { name: 'Mail', icon: Mail, href: '#', current: false },
  { name: 'Shoebox', icon: Archive, href: '#', current: false },
  { name: 'Calendar', icon: CalendarDays, href: '#', current: false },
];

const secondaryNavItems: NavItem[] = [
  { name: 'Help', icon: HelpCircle, href: '#', current: false },
  { name: 'Settings', icon: Settings, href: '#', current: false },
];

const SidebarNav: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 flex items-center space-x-3 border-b border-sidebar-border h-16">
        <div className="flex items-center justify-center h-10 w-10 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full text-lg font-bold">
          DO
        </div>
        <span className="font-semibold text-lg text-sidebar-foreground">Leads Dashboard</span>
      </div>
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {mainNavItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
              item.current
                ? 'bg-primary/10 text-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className={cn('mr-3 h-5 w-5', item.current ? 'text-primary' : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground')} />
            {item.name}
          </a>
        ))}
      </nav>
      <div className="p-2 border-t border-sidebar-border">
        {secondaryNavItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
              item.current
                ? 'bg-primary/10 text-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className={cn('mr-3 h-5 w-5', item.current ? 'text-primary' : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground')} />
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
