import React from "react";
import {PieChart, Pie, Tooltip,Cell, ResponsiveContainer} from 'recharts';

const categoryData = [
  { name: 'Contractors', value: 40, color: '#3b82f6' },
  { name: 'Government Officials', value: 25, color: '#f59e0b' },
  { name: 'Vendors', value: 20, color: '#10b981' },
  { name: 'Foreign Nationals', value: 10, color: '#ef4444' },
  { name: 'VIP Visitors', value: 5, color: '#ec4899' },
];

export default
 function ClassificationPieChart():React.JSX.Element {
    return(
        <div className='bg-gray-900/60 border border-gray-800 rounded-xl p-5'>
                <div className='mb-4'>
                    <h4 className='font-semibold text-white uppercase tracking-wider'>
                        Classification Breakdown
                    </h4>
                    <p className='text-xs text-gray-400'>
                        Distribution index categorized by clearamce tier
                    </p>
                </div>
        <div className='flex flex-col items-center justify-center h-48'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    borderColor: '#334155',
                                    borderRadius: '8px',
                                    color: '##fff'
                                }}
                            />
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={4}
                                dataKey="value"
                                fill="#3b82f6"
                            >
                                {categoryData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='grid grid-cols gap-2 mt-2 text-[11px] font-mono border-t border-gray-800 pt-3'>
                    {categoryData.map((item)=>(
                        <div key={item.name} className='flex items-center gap-1.5'>
                            <span className='w-2 h-2 rounded-full shrinnk-0' style={{backgroundColor:item.color}} />
                            <span className='text-gray-200 truncate'>{item.name} ({item.value}%)</span>
                        </div>
                    ))}
                </div>
            </div>
    );
}