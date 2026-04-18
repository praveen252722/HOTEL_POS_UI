import React from 'react';
import StatCard from '../../components/admin/dashboard/StatCard';
import AnalyticsCharts from '../../components/admin/dashboard/AnalyticsCharts';
import RecentSalesTable from '../../components/admin/dashboard/RecentSalesTable';
import StaffActivity from '../../components/admin/dashboard/StaffActivity';
import TopSellingItems from '../../components/admin/dashboard/TopSellingItems';
import { DollarSign, ShoppingCart, Clock, Users, Wifi, UserPlus } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: "Today's Sales", value: "$2,153.45", colorClass: { bg: "bg-emerald-500" }, icon: <DollarSign className="w-5 h-5 opacity-80" /> },
    { title: "Orders Today", value: "389", colorClass: { bg: "bg-blue-500" }, icon: <ShoppingCart className="w-5 h-5 opacity-80" /> },
    { title: "Pending Orders", value: "14", colorClass: { bg: "bg-cyan-500" }, icon: <Clock className="w-5 h-5 opacity-80" /> },
    { title: "Customers", value: "265", colorClass: { bg: "bg-orange-500" }, icon: <Users className="w-5 h-5 opacity-80" /> },
    { title: "Online Orders", value: "156", colorClass: { bg: "bg-purple-500" }, icon: <Wifi className="w-5 h-5 opacity-80" /> },
    { title: "Total Customers", value: "4,892", colorClass: { bg: "bg-indigo-600" }, icon: <UserPlus className="w-5 h-5 opacity-80" /> },
  ];

  return (
    <div className="pb-8 h-full flex flex-col gap-6">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Grid Layout based on the reference image */}
      <div className="flex flex-col xl:flex-row gap-6 flex-1">
        {/* Left Column (Approx 65%) */}
        <div className="xl:w-[65%] flex flex-col gap-6">
          {/* Row 2: Recent Orders (Large Chart) */}
          <div className="flex-1 min-h-[300px]">
            <AnalyticsCharts />
          </div>

          {/* Row 3 & 4: Table and Staff Activity side by side below the chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            <div className="bg-dark-800 rounded-lg overflow-hidden flex flex-col">
              <RecentSalesTable />
            </div>
            <div className="bg-dark-800 rounded-lg overflow-hidden flex flex-col">
              <StaffActivity />
            </div>
          </div>
        </div>

        {/* Right Column (Approx 35%) */}
        <div className="xl:w-[35%] flex flex-col gap-6">
          {/* Order Summary Pie Chart */}
          <div className="h-[300px]">
             <AnalyticsCharts isSidebar={true} />
          </div>

          {/* Top Selling Items */}
          <div className="flex-1 bg-dark-800 rounded-lg overflow-hidden flex flex-col">
            <TopSellingItems />
          </div>
        </div>
      </div>
    </div>
  );
}
