import React from 'react';
import { ChevronRight } from 'lucide-react';

const topItems = [
  { id: 1, name: 'Cheeseburger', category: 'Amount', sold: 258, revenue: 1935, amountText: '231,955' },
  { id: 2, name: 'Margherita Pizza', category: 'Amount', sold: 207, revenue: 1754, amountText: '331,554' },
  { id: 3, name: 'Caesar Salad', category: 'Amount', sold: 185, revenue: 1110, amountText: '231,110' },
  { id: 4, name: 'Grilled Salmon', category: 'Amount', sold: 142, revenue: 2009, amountText: '280,133' },
  { id: 5, name: 'Tiramisu', category: 'Amount', sold: 130, revenue: 910, amountText: '75,10' },
];

export default function TopSellingItems() {
  return (
    <div className="p-6 h-full flex flex-col border border-white/[0.05]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white tracking-tight">Top Selling Items</h2>
        <button className="text-gray-400 text-xs hover:text-white transition-colors px-3 py-1 border border-white/10 rounded">
          View All
        </button>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {topItems.map((item, i) => (
          <div key={item.id} className="flex items-center gap-4 hover:bg-white/[0.02] transition-colors p-2 rounded-lg cursor-pointer group">
            {/* Image Placeholder */}
            <div className="w-12 h-10 bg-dark-700 rounded overflow-hidden shadow-sm flex items-center justify-center text-xs text-gray-500">
               Img
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{item.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.category} <span className="text-gray-400">{item.amountText}</span></p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">Sold <span className="text-white font-bold ml-1">{item.sold}</span></p>
            </div>

            <div className="text-right ml-4">
               <p className="text-xs text-gray-400 mb-0.5">Sales <span className="text-emerald-400 font-bold ml-1">${item.revenue.toLocaleString()}</span></p>
            </div>
            
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
