import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../../services/api';

const recentOrdersData = [
  { name: 'Sun', value1: 90000, value2: 95000 },
  { name: 'Mon', value1: 91000, value2: 92000 },
  { name: 'Tue', value1: 92000, value2: 90000 },
  { name: 'Wed', value1: 92500, value2: 91500 },
  { name: 'Thu', value1: 94000, value2: 93000 },
  { name: 'Fri', value1: 95500, value2: 95000 },
  { name: 'Sat', value1: 96000, value2: 95500 },
];

const salesOverviewData = [
  { name: 'Sun', value: 3000 },
  { name: 'Mon', value: 3200 },
  { name: 'Tue', value: 3500 },
  { name: 'Wed', value: 3800 },
  { name: 'Thu', value: 4200 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 5000 },
];

const orderSummaryData = [
  { name: 'Completed', value: 40, color: '#10B981' }, // Emerald
  { name: 'Pending', value: 35, color: '#3B82F6' }, // Blue
  { name: 'Preparing', value: 25, color: '#F59E0B' }, // Yellow/Orange
  { name: 'Cancelled', value: 22, color: '#8B5CF6' }, // Purple
];

export default function AnalyticsCharts({ isSidebar = false }) {
  const [salesOverviewData, setSalesOverviewData] = useState([
    { name: 'Sun', value: 3000 },
    { name: 'Mon', value: 3200 },
    { name: 'Tue', value: 3500 },
    { name: 'Wed', value: 3800 },
    { name: 'Thu', value: 4200 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 5000 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/analytics/sales');
        if (res.data && res.data.length > 0) {
           // We can map the revenue to the value field for the sales overview chart
           const mappedData = res.data.map(d => ({ name: d.name, value: d.revenue }));
           setSalesOverviewData(mappedData);
        }
      } catch (error) {
        console.error("Failed to load analytics data", error);
      }
    };
    if (!isSidebar) {
       fetchData();
    }
  }, [isSidebar]);

  if (isSidebar) {
    return (
      <div className="bg-dark-800 rounded-lg p-6 h-full flex flex-col border border-white/[0.05]">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Order Summary</h2>
          <div className="flex gap-4 mt-2 text-sm">
             <p className="text-gray-400">Total Orders <span className="text-white">+152 Today</span></p>
          </div>
          <h3 className="text-2xl font-bold text-white mt-1">1,289 <span className="text-xs text-gray-400 font-normal">(6152 Today)</span></h3>
        </div>

        <div className="flex-1 flex flex-col justify-center relative">
           <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={orderSummaryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {orderSummaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 grid grid-cols-2 gap-y-3">
               <div className="flex justify-between items-center pr-4">
                 <span className="text-sm text-gray-400">Pending Orders</span>
                 <span className="text-sm text-white font-bold">14</span>
               </div>
               <div className="flex justify-between items-center pr-4">
                 <span className="text-sm text-gray-400">Completed Orders</span>
                 <span className="text-sm text-white font-bold">350</span>
               </div>
               <div className="flex justify-between items-center pr-4">
                 <span className="text-sm text-gray-400">Refunded Orders</span>
                 <span className="text-sm text-white font-bold">6</span>
               </div>
            </div>
            
            {/* Legend at bottom */}
            <div className="flex gap-4 justify-center mt-6 text-xs text-gray-400">
               <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Sales</span>
               <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Orders</span>
               <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div>For Amount</span>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Recent Orders Chart */}
      <div className="bg-dark-800 rounded-lg p-6 border border-white/[0.05] h-[300px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white tracking-tight">Recent Orders</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-dark-700 text-xs text-white rounded">7 Days</button>
            <button className="px-3 py-1 bg-transparent text-xs text-gray-400 hover:text-white rounded transition-colors">30 Days</button>
            <button className="px-3 py-1 bg-transparent text-xs text-gray-400 hover:text-white rounded transition-colors">12 Months</button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={recentOrdersData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} domain={['dataMin - 1000', 'dataMax + 1000']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="value1" stroke="#10B981" strokeWidth={2} fill="none" />
              <Area type="monotone" dataKey="value2" stroke="#3B82F6" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Overview Small Chart & Stats */}
      <div className="bg-dark-800 rounded-lg p-6 border border-white/[0.05] flex gap-6">
         <div className="flex-1 flex flex-col border-r border-white/[0.05] pr-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Sales Overview</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-dark-700 text-xs text-white rounded">7 Days</button>
                <button className="px-3 py-1 bg-transparent text-xs text-gray-400 hover:text-white rounded transition-colors">30 Days</button>
              </div>
            </div>
            <div className="flex justify-between items-end mb-4">
               <div>
                  <p className="text-xs text-gray-400">Total Sales</p>
                  <p className="text-2xl font-bold text-emerald-400">$16,429</p>
               </div>
            </div>
            <div className="h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesOverviewData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} dy={5} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="#3B82F6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>
         
         <div className="w-1/3 flex flex-col justify-center gap-4">
            <div>
               <p className="text-xs text-gray-400">Total Orders <span className="float-right text-emerald-400 text-lg font-bold">4,285</span></p>
               <p className="text-[10px] text-gray-500">140 since today</p>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Pending Orders</span>
               <span className="text-sm text-white font-bold">14</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Completed Orders</span>
               <span className="text-sm text-white font-bold">350</span>
            </div>
         </div>
      </div>
    </div>
  );
}
