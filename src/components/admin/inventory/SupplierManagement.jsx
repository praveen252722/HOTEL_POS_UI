import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, Mail, MoreHorizontal } from 'lucide-react';

const dummySuppliers = [
  { id: 'SUP-001', name: 'Fresh Meats Co.', contact: 'Sarah Jenkins', phone: '+1 234-567-8901', email: 'orders@freshmeats.com', items: ['Premium Ground Beef', 'Chicken Breast', 'Lamb Chops'], rating: 4.8 },
  { id: 'SUP-002', name: 'Dairy Farms LLC', contact: 'Mike Thompson', phone: '+1 234-567-8902', email: 'supply@dairyfarms.com', items: ['Cheddar Cheese', 'Milk', 'Heavy Cream'], rating: 4.5 },
  { id: 'SUP-003', name: 'Green Valley Produce', contact: 'Elena Rodriguez', phone: '+1 234-567-8903', email: 'sales@greenvalley.com', items: ['Tomatoes', 'Lettuce', 'Onions', 'Potatoes'], rating: 4.9 },
  { id: 'SUP-004', name: 'Morning Bakery', contact: 'David Kim', phone: '+1 234-567-8904', email: 'wholesale@morningbakery.com', items: ['Brioche Buns', 'Baguettes', 'Sourdough'], rating: 4.2 },
  { id: 'SUP-005', name: 'Gourmet Imports', contact: 'Jean Pierre', phone: '+1 234-567-8905', email: 'contact@gourmetimports.com', items: ['Truffle Oil', 'Saffron', 'Balsamic Vinegar'], rating: 4.7 },
];

export default function SupplierManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-dark-900 border border-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col">
      <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Supplier Directory</h2>
          <p className="text-gray-400 mt-1 text-sm">Manage your vendors and supply chain</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              className="w-full bg-dark-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Plus className="w-4 h-4" />
            Add Supplier
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-dark-800/50">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Supplier Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Person</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Items Supplied</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Rating</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dummySuppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-bold text-white">{supplier.name}</p>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">{supplier.id}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-bold text-white mb-1">{supplier.contact}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-0.5">
                    <Phone className="w-3 h-3" /> {supplier.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Mail className="w-3 h-3" /> {supplier.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5 max-w-xs">
                    {supplier.items.map((item, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded text-[10px]">
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    ★ {supplier.rating}
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
  );
}
