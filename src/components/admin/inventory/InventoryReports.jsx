import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dailyUsageData = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 52 },
  { day: 'Wed', value: 38 },
  { day: 'Thu', value: 65 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 110 },
  { day: 'Sun', value: 95 },
];

const stockHistoryData = [
  { month: 'Jan', stockIn: 4000, stockOut: 2400 },
  { month: 'Feb', stockIn: 3000, stockOut: 1398 },
  { month: 'Mar', stockIn: 2000, stockOut: 9800 },
  { month: 'Apr', stockIn: 2780, stockOut: 3908 },
  { month: 'May', stockIn: 1890, stockOut: 4800 },
  { month: 'Jun', stockIn: 2390, stockOut: 3800 },
  { month: 'Jul', stockIn: 3490, stockOut: 4300 },
];

export default function InventoryReports() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Daily Usage Chart */}
      <div className="bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Daily Ingredient Usage (kg/units)</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#1f2937', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock History Chart */}
      <div className="bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Monthly Stock In vs Out ($)</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="stockIn" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="stockOut" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-6">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-emerald-500"></div><span className="text-xs font-bold text-gray-400">Stock In (Purchases)</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-rose-500"></div><span className="text-xs font-bold text-gray-400">Stock Out (Usage)</span></div>
        </div>
      </div>

    </div>
  );
}
