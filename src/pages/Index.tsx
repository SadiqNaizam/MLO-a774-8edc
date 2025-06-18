import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import LeadsChart from '../components/Dashboard/LeadsChart';
import ReasonStatGrid from '../components/Dashboard/ReasonStatGrid';

const DashboardPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  return (
    <div className="h-screen bg-background text-foreground">
      {/* Mobile Sidebar (Drawer) */} 
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-in slide-in-from-left duration-300">
          {/* Sidebar Content */}
          <div className="w-64 bg-sidebar border-r border-sidebar-border">
            <Sidebar className="h-full w-full" />
          </div>
          {/* Backdrop */} 
          <div
            className="flex-1 bg-black/50"
            onClick={toggleMobileSidebar}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Layout (Grid for Desktop, Flex for Mobile) */}
      {/* Adheres to Layout Requirements: overall type "Grid", definition "grid-cols-[auto_1fr] grid-rows-[auto_1fr]" for desktop */}
      {/* Sidebar: w-64 (auto for grid), Header: h-16 (auto for grid) */}
      <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] h-full">
        {/* Desktop Sidebar - occupies the 'auto' width column (w-64) and spans 2 rows */}
        <div className="hidden lg:block w-64 row-span-2"> 
          <Sidebar className="h-full w-full" /> {/* Sidebar component applies its own styling including border and w-64 */}
        </div>

        {/* Header Area - occupies the 'auto' height row (h-16) in the second column */}
        {/* Mobile: First item in flex-col. Desktop: Grid cell col-start-2, row-start-1 */}
        <div className="h-16 lg:col-start-2 lg:row-start-1">
          <Header 
            className="h-full w-full" /* Header component itself is h-16, sticky */
            onToggleSidebar={toggleMobileSidebar} 
          />
        </div>

        {/* Main Content Area - occupies the '1fr' height row in the second column */}
        {/* Mobile: Second item in flex-col, takes flex-1. Desktop: Grid cell col-start-2, row-start-2 */}
        <main className="flex-1 lg:col-start-2 lg:row-start-2 overflow-y-auto p-4 sm:p-6 space-y-6">
          <PageHeader />
          <StatsCardGrid />
          <LeadsChart />
          <ReasonStatGrid />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
