import React from 'react';
import { Users, ShieldCheck, ArrowDownRight, Clock, ArrowUpRight } from 'lucide-react';
import type {LucideIcon} from 'lucide-react';

interface KPI {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

const kpiData: KPI[] = [
  {
    label: 'Total Visitors (Weekly)',
    value: '654',
    trend: '+8.4% vs last week',
    trendUp: true,
    icon: Users,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    
  },
  {
    label: 'Approval Rate',
    value: '92.6%',
    trend: '+1.2% stabilization',
    trendUp: true,
    icon: ShieldCheck,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',

  },
  {
    label: 'Denial Rate',
    value: '7.4%',
    trend: '-2.1% false triggers',
    trendUp: false,
    icon: ArrowDownRight,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',

  },
  {
    label: 'Avg Processing Time',
    value: '18m 42s',
    trend: '+43s background check latency',
    trendUp: false,
    icon: Clock,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',

  }
];

export default function KPICards(): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi: KPI, index: number) => {
        const Icon: LucideIcon = kpi.icon;
        return (
          <div 
            key={index} 
            className="bg-slate-700/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {kpi.label}
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">{kpi.value}</h3>
              <span className={`text-[11px] flex items-center gap-0.5 mt-1 font-mono ${kpi.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {kpi.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.trend}
              </span>
            </div>
            <div className={`p-3 rounded-lg ${kpi.iconBg}`}>
              <Icon size={20} className={kpi.iconColor} />
            </div>
          </div>
        );
      })}
    </div>
  );
}