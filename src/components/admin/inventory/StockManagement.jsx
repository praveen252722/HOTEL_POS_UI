import React from 'react';
import { ArrowDownRight, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';

const recentActivity = [
  { id: 1, type: 'IN', item: 'Premium Ground Beef', qty: 50, unit: 'Kg', entity: 'Fresh Meats Co.', date: 'Today, 08:30 AM', cost: 625.00 },
  { id: 2, type: 'OUT', item: 'Tomatoes', qty: 5, unit: 'Kg', entity: 'Kitchen (Veg)', date: 'Today, 11:15 AM', cost: null },
  { id: 3, type: 'OUT', item: 'Brioche Buns', qty: 40, unit: 'Pieces', entity: 'Kitchen (Non-Veg)', date: 'Yesterday, 14:20 PM', cost: null },
  { id: 4, type: 'IN', item: 'Cheddar Cheese', qty: 10, unit: 'Kg', entity: 'Dairy Farms', date: 'Yesterday, 09:00 AM', cost: 87.50 },
  { id: 5, type: 'OUT', item: 'Truffle Oil', qty: 0.5, unit: 'Liters', entity: 'Waste (Spilled)', date: '2 Days Ago', cost: null },
];

export default function StockManagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Forms Column */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        
        {/* Stock IN Form */}
        <div className="bg-dark-900 border border-white/5 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-emerald-500/10 flex items-center gap-2">
            <ArrowDownRight className="w-5 h-5 text-emerald-400" />
            <h2 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Stock In (Add Inventory)</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Item</label>
              <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 outline-none">
                <option>Select Item...</option>
                <option>Premium Ground Beef</option>
                <option>Cheddar Cheese</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Quantity</label>
                <input type="number" className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Cost</label>
                <input type="number" className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 outline-none" placeholder="$" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Supplier</label>
              <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 outline-none">
                <option>Select Supplier...</option>
                <option>Fresh Meats Co.</option>
                <option>Dairy Farms</option>
              </select>
            </div>
            <button className="w-full py-2.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg text-sm font-bold transition-colors">
              Record Stock In
            </button>
          </div>
        </div>

        {/* Stock OUT Form */}
        <div className="bg-dark-900 border border-white/5 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-rose-500/10 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-rose-400" />
            <h2 className="text-rose-400 font-bold text-sm uppercase tracking-wider">Stock Out (Usage/Waste)</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Item</label>
              <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-rose-500 outline-none">
                <option>Select Item...</option>
                <option>Tomatoes</option>
                <option>Truffle Oil</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Quantity Used</label>
                <input type="number" className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-rose-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Usage Type</label>
                <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-rose-500 outline-none">
                  <option>Kitchen Prep</option>
                  <option>Waste / Spoilage</option>
                  <option>Theft / Loss</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Section</label>
              <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-rose-500 outline-none">
                <option>Veg Kitchen</option>
                <option>Non-Veg Kitchen</option>
                <option>Bar</option>
              </select>
            </div>
            <button className="w-full py-2.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg text-sm font-bold transition-colors">
              Record Stock Out
            </button>
          </div>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="lg:col-span-2 bg-dark-900 border border-white/5 rounded-xl shadow-lg flex flex-col">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-gray-400" />
            Recent Stock Transactions
          </h2>
          <button className="text-xs font-bold text-brand-primary hover:text-white transition-colors">View All Logs</button>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-dark-800/30">
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Item Details</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Supplier / Section</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentActivity.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.type === 'IN' ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded w-max">
                        <ArrowDownRight className="w-3 h-3" /> STOCK IN
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-400/10 px-2 py-1 rounded w-max">
                        <ArrowUpRight className="w-3 h-3" /> STOCK OUT
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-white">{log.item}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {log.type === 'IN' ? '+' : '-'}{log.qty} {log.unit} {log.cost ? `• $${log.cost.toFixed(2)}` : ''}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{log.entity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
