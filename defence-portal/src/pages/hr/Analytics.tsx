import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import KPICards from '../../components/KPICards';
import PeakTrafficChart from '../../components/PeakTrafficChart';
import DepartmentBarChart from '../../components/DepartmentBarChart';
import ClassificationPieChart from '../../components/ClassificationPieChart';
import ComplianceReporting from '../../components/ComplianceReporting';
import DateRangeFilter from '../../components/DateRangeFilter';

export default function Analytics() {
  const navigate = useNavigate();

  const handleDateChange = (startDate: string, endDate: string) => {
    console.log(`Filtering data from ${startDate} to ${endDate}`);
    
    if (startDate && endDate) {
      alert(`Data filtered from ${startDate} to ${endDate}`);
    } else {
      alert('Date filter reset - showing all data');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e121a]">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 py-4 shadow-xl bg-gray-900 border-b border-gray-800">
        <div className="bg-gray-800 border border-[#30363d] rounded-lg">
          <button 
            onClick={() => navigate('/hr')}
            className="p-1 hover:bg-gray-900 rounded-lg text-gray-400 hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div>
          <h1 className="text-2xl text-white font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-xs text-slate-400">Insights and analytics for visitor management</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        
        {/* Date Range Filter */}
        <DateRangeFilter onDateChange={handleDateChange} />

        {/* KPI Cards Section */}
        <KPICards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Peak Traffic Area Chart */}
          <div className="lg:col-span-2">
            <PeakTrafficChart />
          </div>

          {/* Feature 2: Department Bar Chart */}
          <DepartmentBarChart />

          {/* Feature 3: Classification Pie Chart */}
          <ClassificationPieChart />

          {/* Feature 4: Compliance Reporting */}
          <ComplianceReporting />

        </div>
      </div>
    </div>
  );
}