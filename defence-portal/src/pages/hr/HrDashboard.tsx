import {cn} from '../../lib/utils'
import DashboardLayout from '@/components/DashboardLayout';
import {Users, UserX, UsersRound, UserCheck} from 'lucide-react'

// Reusable card structure defined locally to keep things robust
interface MetricCardProps {
  title: string
  body: string
  value: string
  type: "pending" | "active" | "denied" | "total"
}
function MetricCard({title, value, body, type}: MetricCardProps){
        const iconMap = {
            pending: Users,
            active: UserCheck,
            denied: UserX,
            total: UsersRound,
        }
        const iconColorMap = {
            pending: "text-amber-500",
            active: "text-emerald-500",
            denied: "text-rose-500",
            total: "text-blue-500",
        }

        const IconComponent = iconMap[type]
        return(
            <div className='flex items-start justify-between group bg-gray-900 border border-gray-600/80 p-5 rounded-xl text-gray-200 font-semibold hover:bg-gray-800 '>
            <div className='space-y-1'>
                <p className={cn(
                    type === 'pending' && "group-hover:text-amber-500 ",
                    type === 'active' && "group-hover:text-emerald-500",
                    type === 'denied' && "group-hover:text-rose-500",
                    type === 'total' && "group-hover:text-blue-500",
                )}
                >{title}</p>
                <p className="text-xs  text-gray-400 max-w-sm">{body}</p>
                <p className={cn(
                    "text-2xl font-semibold mt-2 ",
                    type === 'pending' && "text-amber-500/70 ",
                    type === 'active' && "text-emerald-500/70",
                    type === 'denied' && "text-rose-500/70",
                    type === 'total' && "text-blue-500/70",
                )}> {value}</p>
            </div>
            <div className={cn(
                "p-3 rounded-lg shrink-0",
                    type === 'pending' && "bg-amber-500/20 ",
                    type === 'active' && "bg-emerald-500/20",
                    type === 'denied' && "bg-rose-500/20",
                    type === 'total' && "bg-blue-500/20",
            )}>
                <IconComponent className={cn(
                    "h-5 w-5",
                    iconColorMap[type]
                )} />
            </div>
        </div>
        )
}

export default function HrDashboard(){
    return(
        <DashboardLayout>
            <div className='space-y-6 '>
            {/*Head description Section */}
                <div className='mb-3'>
                    <h2 className='text-xl font-bold text-white tracking-tight'>HR Visitor Control Panel</h2>
                    <p className='text-xs text-gray-400 mt-1'>Manage, approve, and track active military personnel and contractor gate entry requests.</p>
                </div>
            </div>
            {/*Metric Overview Row */}
        <div className="grid grid-cols-1 mt-2 md:grid-cols-4 gap-4">
          <MetricCard title="Total Requests"body='~' value="218" type="total"  />          
          <MetricCard title="Pending Approvals" body='Awaiting approval' value="12" type="pending" />
          <MetricCard title="Active Passes" body='Currently inside' value="45" type="active" />
          <MetricCard title="Denied Passes" body='-5% from yday' value="02" type="denied" />
        </div>
        </DashboardLayout>
    )
}