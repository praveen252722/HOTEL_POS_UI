import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Download } from 'lucide-react';
import api from '../services/api';

const categorySales = [
  { category: 'Main Courses', amount: 145000, percentage: 45 },
  { category: 'Beverages', amount: 85000, percentage: 26 },
  { category: 'Appetizers', amount: 55000, percentage: 17 },
  { category: 'Desserts', amount: 38000, percentage: 12 },
];

export default function SalesReport() {
  const [timeRange, setTimeRange] = useState('YTD');
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/analytics/sales');
        setMonthlyData(res.data);
      } catch (error) {
        console.error("Failed to load sales data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto bg-dark-950 text-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Sales Analytics</h1>
          <p className="text-gray-400 mt-1">Detailed performance and revenue metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-dark-900 border border-white/10 rounded-lg p-1 flex">
            {['1M', '3M', '6M', 'YTD', '1Y'].map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${timeRange === range ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-dark-900 border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Revenue</p>
          <h3 className="text-3xl font-black text-white">$402,000</h3>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>+14.5% vs last year</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl group-hover:bg-brand-primary/20 transition-all"></div>
        </div>
        
        <div className="bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Net Profit</p>
          <h3 className="text-3xl font-black text-white">$121,200</h3>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>+8.2% vs last year</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
        </div>
        
        <div className="bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Avg. Order Value</p>
          <h3 className="text-3xl font-black text-white">$42.50</h3>
          <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-bold">
            <TrendingUp className="w-4 h-4 rotate-180" />
            <span>-1.2% vs last year</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Revenue Overview</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#1f2937', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-primary"></div><span className="text-xs text-gray-400">Revenue</span></div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-emerald-500"></div><span className="text-xs text-gray-400">Profit</span></div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-dark-900 border border-white/5 rounded-xl p-6 shadow-lg flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Sales by Category</h2>
          <div className="flex-1 flex flex-col gap-6">
            {categorySales.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-white font-bold text-sm">{cat.category}</p>
                    <p className="text-gray-500 text-xs mt-0.5">${cat.amount.toLocaleString()}</p>
                  </div>
                  <span className="text-brand-primary font-black">{cat.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-brand-gradient" 
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
