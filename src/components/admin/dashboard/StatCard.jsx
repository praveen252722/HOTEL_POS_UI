import React from 'react';

export default function StatCard({ title, value, colorClass, icon }) {
  return (
    <div className={`group relative overflow-hidden rounded-lg p-5 ${colorClass.bg} shadow-md flex flex-col justify-center items-center text-center text-white h-28 transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}>
      {icon && (
        <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      )}
      <h3 className="text-3xl font-bold tracking-tight mb-1">{value}</h3>
      <p className="text-sm font-medium opacity-90">{title}</p>
    </div>
  );
}
