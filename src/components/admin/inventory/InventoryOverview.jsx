import React, { useState } from 'react';
import { Search, Filter, Plus, AlertTriangle, MoreHorizontal, Package, ArrowDownToLine, ArrowUpFromLine, DollarSign, Clock } from 'lucide-react';

const dummyInventory = [
  { id: 'INV-001', name: 'Premium Ground Beef', category: 'Non-Veg', unit: 'Kg', stock: 45, minStock: 20, cost: 12.50, supplier: 'Fresh Meats Co.', status: 'In Stock' },
  { id: 'INV-002', name: 'Cheddar Cheese', category: 'Dairy', unit: 'Kg', stock: 8, minStock: 10, cost: 8.75, supplier: 'Dairy Farms', status: 'Low Stock' },
  { id: 'INV-003', name: 'Brioche Buns', category: 'Bakery', unit: 'Pieces', stock: 150, minStock: 50, cost: 0.80, supplier: 'Morning Bakery', status: 'In Stock' },
  { id: 'INV-004', name: 'Tomatoes', category: 'Veg', unit: 'Kg', stock: 0, minStock: 15, cost: 2.30, supplier: 'Green Valley', status: 'Out of Stock' },
  { id: 'INV-005', name: 'Truffle Oil', category: 'Grocery', unit: 'Liters', stock: 2, minStock: 5, cost: 45.00, supplier: 'Gourmet Imports', status: 'Low Stock' },
  { id: 'INV-006', name: 'Salmon Fillets', category: 'Non-Veg', unit: 'Kg', stock: 28, minStock: 15, cost: 18.00, supplier: 'Ocean Catch', status: 'In Stock' },
];

export default function InventoryOverview() {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: "Total Items", value: "1,248", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Low Stock", value: "12", icon: ArrowDownToLine, color: "text-amber-400", bg: "bg-amber-400/10" },
    { title: "Out of Stock", value: "3", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-400/10" },
    { title: "Inventory Value", value: "$42,500", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Recently Updated", value: "24", icon: Clock, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Low Stock': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Out of Stock': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-dark-900 border border-white/5 rounded-xl p-5 shadow-lg flex items-center gap-4 hover:border-white/10 transition-colors group">
            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-dark-900 border border-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col">
        <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search items..." 
                className="w-full bg-dark-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 bg-dark-950 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-dark-800/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Current Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Min Level</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Cost Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dummyInventory.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {['Low Stock', 'Out of Stock'].includes(item.status) && (
                        <AlertTriangle className={`w-4 h-4 ${item.status === 'Out of Stock' ? 'text-rose-500' : 'text-amber-500'}`} />
                      )}
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{item.id}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-bold ${item.stock <= item.minStock ? 'text-amber-400' : 'text-white'}`}>
                      {item.stock}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.minStock} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">${item.cost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
