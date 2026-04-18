import React, { useState, useEffect } from 'react';
import { Store, CreditCard, Bell, Shield, Globe, Users } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    restaurantName: '',
    phone: '',
    address: '',
    timezone: 'UTC',
    operatingHours: { open: '09:00', close: '22:00' }
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data) setSettings(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load settings');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'open' || name === 'close') {
      setSettings({
        ...settings,
        operatingHours: { ...settings.operatingHours, [name]: value }
      });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      await api.put('/settings', settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'financial', label: 'Financial', icon: CreditCard },
    { id: 'users', label: 'Roles & Permissions', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  if (isLoading) return <div className="p-8 text-white">Loading settings...</div>;

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto bg-dark-950 text-gray-300 flex flex-col md:flex-row gap-8">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-3xl font-black text-white tracking-tight mb-6">Settings</h1>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 max-w-3xl">
        <div className="bg-dark-900 border border-white/5 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white capitalize">{activeTab} Settings</h2>
            <p className="text-gray-400 text-sm mt-1">Manage your restaurant's {activeTab} configuration and preferences.</p>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {activeTab === 'general' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Restaurant Name</label>
                    <input type="text" name="restaurantName" value={settings.restaurantName || ''} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input type="text" name="phone" value={settings.phone || ''} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</label>
                  <textarea rows="3" name="address" value={settings.address || ''} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Timezone</label>
                    <select name="timezone" value={settings.timezone || 'UTC'} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary transition-colors appearance-none">
                      <option value="UTC">UTC</option>
                      <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                      <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                      <option value="Central Time (CT)">Central Time (CT)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operating Hours</label>
                    <div className="flex items-center gap-2">
                      <input type="time" name="open" value={settings.operatingHours?.open || '09:00'} onChange={handleInputChange} className="flex-1 bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary transition-colors" />
                      <span className="text-gray-500">to</span>
                      <input type="time" name="close" value={settings.operatingHours?.close || '22:00'} onChange={handleInputChange} className="flex-1 bg-dark-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab !== 'general' && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4 border border-white/5">
                  <Store className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{activeTab} settings coming soon</h3>
                <p className="text-gray-500 text-sm max-w-md">This section is currently under development. Configuration options will be available in the next release.</p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-dark-800/50 border-t border-white/5 flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2.5 rounded-lg text-sm font-bold bg-brand-primary text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
