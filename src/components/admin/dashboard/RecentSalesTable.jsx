import React from 'react';

const recentSales = [
  { id: '#11029', customer: 'Sarah Mitchell', type: 'Table', amount: 102.50 },
  { id: '#11023', customer: 'Mark Perez', type: 'Delivery', amount: 53.50 },
  { id: '#11025', customer: 'Emily Johnson', type: 'Takeaway', amount: 24.50 },
  { id: '#11024', customer: 'Mike Adams', type: 'More', amount: 24.50 },
  { id: '#11026', customer: 'Jessica Brown', type: 'Table', amount: 89.00 },
];

export default function RecentSalesTable() {
  return (
    <div className="p-6 h-full flex flex-col border border-white/[0.05]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Sales Overview</h2>
        <button className="text-gray-400 text-xs hover:text-white transition-colors px-3 py-1 border border-white/10 rounded">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="py-3 text-xs font-medium text-gray-400">Item ID</th>
              <th className="py-3 text-xs font-medium text-gray-400">Customer</th>
              <th className="py-3 text-xs font-medium text-gray-400 text-right">Sale</th>
              <th className="py-3 text-xs font-medium text-gray-400 text-right">Sales Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {recentSales.map((sale, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3 whitespace-nowrap text-sm text-gray-400">{sale.id}</td>
                <td className="py-3 whitespace-nowrap text-sm text-white">{sale.customer}</td>
                <td className="py-3 whitespace-nowrap text-sm text-gray-400 text-right">{sale.type}</td>
                <td className="py-3 whitespace-nowrap text-sm text-emerald-400 font-medium text-right">${sale.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
