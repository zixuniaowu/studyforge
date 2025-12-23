import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600',
};

export const StatsCard: React.FC<Props> = ({ icon: Icon, label, value, subValue, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${colorClasses[color]}`}>
        <Icon size={32} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base text-gray-500 truncate">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subValue && <p className="text-sm text-gray-400 mt-1">{subValue}</p>}
      </div>
    </div>
  );
};
