import React from 'react';
import { getInitials, getAvatarColor } from '../../../utils/helpers';

const staffActivity = [
  { id: 1, name: 'James Parker', action: 'Set table reservation', avatar: 'JP' },
  { id: 2, name: 'Sarah Wilson', action: 'Refund processing done', avatar: 'SW' },
  { id: 3, name: 'David Brown', action: 'Sales Discounted promo', avatar: 'DB' },
];

export default function StaffActivity() {
  return (
    <div className="p-6 h-full flex flex-col border border-white/[0.05]">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Staff Activity</h2>
      </div>
      
      <div className="space-y-4 flex-1">
        {staffActivity.map((staff, i) => (
          <div key={staff.id} className="flex items-center gap-4 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md bg-dark-700`}>
                {/* Normally we'd use getAvatarColor(staff.name) but image shows photos. We use initials here */}
                {staff.avatar}
            </div>
            
            <div className="flex-1 pb-1">
              <p className="text-sm font-bold text-white">{staff.name}</p>
              <p className="text-[11px] text-gray-500">{staff.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
