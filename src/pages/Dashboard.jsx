import React, { useState, useEffect } from 'react';
import StatCard from '../components/admin/dashboard/StatCard';
import AnalyticsCharts from '../components/admin/dashboard/AnalyticsCharts';
import RecentSalesTable from '../components/admin/dashboard/RecentSalesTable';
import StaffActivity from '../components/admin/dashboard/StaffActivity';
import TopSellingItems from '../components/admin/dashboard/TopSellingItems';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    todaysSales: 0,
    ordersToday: 0,
    pendingOrders: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchDashboardStats();
  }, []);

  const statCards = [
    { title: "Today's Sales", value: `$${stats.todaysSales.toFixed(2)}`, colorClass: { bg: "bg-emerald-500" } },
    { title: "Orders (Today)", value: stats.ordersToday.toString(), colorClass: { bg: "bg-blue-500" } },
    { title: "Pending Orders", value: stats.pendingOrders.toString(), colorClass: { bg: "bg-cyan-500" } },
    { title: "Customers", value: stats.totalCustomers.toString(), colorClass: { bg: "bg-orange-500" } },
    { title: "Admin Tasks", value: "2", colorClass: { bg: "bg-purple-500" } },
    { title: "Notifications", value: "5", colorClass: { bg: "bg-indigo-900" } },
  ];

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto bg-dark-950 text-gray-300 flex flex-col gap-6">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
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
            <div className="bg-dark-900 rounded-lg overflow-hidden flex flex-col shadow-lg border border-white/5">
              <RecentSalesTable />
            </div>
            <div className="bg-dark-900 rounded-lg overflow-hidden flex flex-col shadow-lg border border-white/5">
              <StaffActivity />
            </div>
          </div>
        </div>
                   <h1></h1>
        {/* Right Column (Approx 35%) */}
        <div className="xl:w-[35%] flex flex-col gap-6">
          {/* Order Summary Pie Chart */}
          <div className="h-[300px]">
             <AnalyticsCharts isSidebar={true} />
          </div>

          {/* Top Selling Items */}
          <div className="flex-1 bg-dark-900 rounded-lg overflow-hidden flex flex-col shadow-lg border border-white/5">
            <TopSellingItems />
          </div>
        </div>
      </div>
    </div>
  );
}