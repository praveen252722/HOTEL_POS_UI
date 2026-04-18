import React, { useState } from 'react';
import InventoryOverview from '../components/admin/inventory/InventoryOverview';
import StockManagement from '../components/admin/inventory/StockManagement';
import SupplierManagement from '../components/admin/inventory/SupplierManagement';
import InventoryReports from '../components/admin/inventory/InventoryReports';

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stock', label: 'Stock Management' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto bg-dark-950 text-gray-300">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Inventory</h1>
        <p className="text-gray-400 mt-1">Manage stock levels, suppliers, and usage</p>
      </div>

      {/* Custom Tabs Navigation */}
      <div className="flex gap-2 border-b border-white/10 mb-6 overflow-x-auto custom-scrollbar pb-px">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-bold transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.id 
                ? 'border-brand-primary text-brand-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pb-8">
        {activeTab === 'overview' && <InventoryOverview />}
        {activeTab === 'stock' && <StockManagement />}
        {activeTab === 'suppliers' && <SupplierManagement />}
        {activeTab === 'reports' && <InventoryReports />}
      </div>
    </div>
  );
}
