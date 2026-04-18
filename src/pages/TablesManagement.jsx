import React, { useState } from 'react';
import { Search, Plus, Filter, LayoutGrid, List, MoreHorizontal, CheckCircle2, AlertCircle, Clock, X } from 'lucide-react';

const dummyTables = [
  { id: 'TBL-001', number: 'T1', capacity: 2, section: 'Indoor', status: 'Available', order: null, waiter: null, lastUpdated: '10 mins ago' },
  { id: 'TBL-002', number: 'T2', capacity: 4, section: 'Indoor', status: 'Occupied', order: 'ORD-892', waiter: 'Sarah Jenkins', lastUpdated: '45 mins ago' },
  { id: 'TBL-003', number: 'T3', capacity: 6, section: 'Outdoor', status: 'Reserved', order: null, waiter: null, lastUpdated: '2 hours ago' },
  { id: 'TBL-004', number: 'T4', capacity: 4, section: 'Indoor', status: 'Cleaning', order: null, waiter: 'Mike Thompson', lastUpdated: '5 mins ago' },
  { id: 'TBL-005', number: 'T5', capacity: 2, section: 'VIP', status: 'Available', order: null, waiter: null, lastUpdated: '1 hour ago' },
  { id: 'TBL-006', number: 'T6', capacity: 8, section: 'Indoor', status: 'Occupied', order: 'ORD-895', waiter: 'Elena Rodriguez', lastUpdated: '15 mins ago' },
  { id: 'TBL-007', number: 'T7', capacity: 4, section: 'Outdoor', status: 'Available', order: null, waiter: null, lastUpdated: '30 mins ago' },
  { id: 'TBL-008', number: 'T8', capacity: 4, section: 'VIP', status: 'Reserved', order: null, waiter: null, lastUpdated: '4 hours ago' },
];

export default function TablesManagement() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats calculation
  const totalTables = dummyTables.length;
  const availableTables = dummyTables.filter(t => t.status === 'Available').length;
  const occupiedTables = dummyTables.filter(t => t.status === 'Occupied').length;
  const reservedTables = dummyTables.filter(t => t.status === 'Reserved').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Occupied': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'Reserved': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Cleaning': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Available': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'Occupied': return <AlertCircle className="w-4 h-4 text-rose-400" />;
      case 'Reserved': return <Clock className="w-4 h-4 text-amber-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredTables = dummyTables.filter(t => 
    t.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto bg-dark-950 text-gray-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Tables Management</h1>
          <p className="text-gray-400 mt-1">Monitor and configure restaurant floor plan</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-dark-900 border border-white/5 rounded-xl p-5 shadow-lg">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Tables</p>
          <h3 className="text-2xl font-black text-white">{totalTables}</h3>
        </div>
        <div className="bg-dark-900 border border-emerald-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Available</p>
          <h3 className="text-2xl font-black text-white">{availableTables}</h3>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"></div>
        </div>
        <div className="bg-dark-900 border border-rose-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <p className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">Occupied</p>
          <h3 className="text-2xl font-black text-white">{occupiedTables}</h3>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl"></div>
        </div>
        <div className="bg-dark-900 border border-amber-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Reserved</p>
          <h3 className="text-2xl font-black text-white">{reservedTables}</h3>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Controls Container */}
      <div className="bg-dark-900 border border-white/5 rounded-xl shadow-lg flex flex-col mb-6">
        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search tables..." 
                className="w-full bg-dark-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 bg-dark-950 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-dark-950 border border-white/10 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-dark-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-dark-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              <Plus className="w-4 h-4" />
              Add Table
            </button>
          </div>
        </div>

        {/* View Layouts */}
        {viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 bg-dark-950">
            {filteredTables.map((table) => (
              <div key={table.id} className={`bg-dark-900 border rounded-xl p-5 shadow-lg relative group transition-colors ${
                  table.status === 'Available' ? 'border-emerald-500/20 hover:border-emerald-500/40' :
                  table.status === 'Occupied' ? 'border-rose-500/20 hover:border-rose-500/40' :
                  table.status === 'Reserved' ? 'border-amber-500/20 hover:border-amber-500/40' :
                  'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(table.status)} flex items-center gap-1`}>
                    {table.status}
                  </span>
                  <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-2 shadow-inner ${
                    table.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400' :
                    table.status === 'Occupied' ? 'bg-rose-500/10 text-rose-400' :
                    table.status === 'Reserved' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {table.number}
                  </div>
                  <p className="text-sm font-bold text-white">{table.capacity} Seats</p>
                  <p className="text-xs text-gray-500 mt-0.5">{table.section}</p>
                </div>

                {(table.waiter || table.order) && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
                    {table.waiter && <p className="text-[10px] text-gray-400 font-bold">Waiter: <span className="text-gray-300 font-normal">{table.waiter}</span></p>}
                    {table.order && <p className="text-[10px] text-gray-400 font-bold">Order: <span className="text-gray-300 font-normal">{table.order}</span></p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-dark-800/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Table Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Current Order</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Waiter</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Last Updated</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTables.map((table) => (
                  <tr key={table.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-white">Table {table.number}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{table.capacity} Seats • {table.id}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{table.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(table.status)} inline-flex items-center gap-1.5`}>
                        {getStatusIcon(table.status)} {table.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                      {table.order || <span className="text-gray-600">-</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {table.waiter || <span className="text-gray-600">-</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{table.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs font-bold text-brand-primary hover:text-white transition-colors bg-brand-primary/10 px-2 py-1 rounded">Edit</button>
                        <button className="text-xs font-bold text-rose-500 hover:text-white transition-colors bg-rose-500/10 px-2 py-1 rounded">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Table Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Add New Table</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Table Number</label>
                  <input type="text" className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary" placeholder="e.g. T9" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Capacity</label>
                  <input type="number" min="1" className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary" placeholder="4" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Section</label>
                <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary appearance-none">
                  <option>Indoor</option>
                  <option>Outdoor</option>
                  <option>VIP</option>
                  <option>Bar Area</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary appearance-none">
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Reserved</option>
                  <option>Cleaning</option>
                </select>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-white/10 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                  Save Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
