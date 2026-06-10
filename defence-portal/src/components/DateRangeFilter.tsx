import { Calendar } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface DateRangeFilterProps{
    onDateChange: (startDate:string, endDate: string) =>void;
}

export default function DateRangeFilter({onDateChange}: DateRangeFilterProps): React.JSX.Element{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleApply = () => {
        if(startDate && endDate){
            onDateChange(startDate, endDate);
        }
    };
    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        onDateChange('','');
    };

    return(
        <div className='bg-gray-900.60 border border-gray-800 rounded-xl p-4 fle flex-col sm:flex-row items-center gap-4'>
            <div className='flex items-center gap-4'>
                <Calendar size={18} className='text-aber-400' />
                <span className='text-sm font-medium text-white'>Date Range:</span>
            </div>  

        <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
          />
        </div>
         <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
          />
        </div>
           <div className="flex gap-2">
          <button
            onClick={handleApply}
            disabled={!startDate || !endDate}
            className="px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition"
          >
            Reset
          </button>
        </div>
      </div>  
        </div>
    );
}