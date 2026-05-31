import {Routes, Route, Navigate} from 'react-router-dom';
import EmployeeDashboard from './pages/employee/EmployeeDashboard.tsx';

//placeholder for HR n Security until we write their full code 
const HRDashboard = () => (
  <div className="p-8 text-white">
    <h2 className="text-2xl font-bold ">HR Management</h2>
    <p className="text-gray-400 mt-2">Authentication required.Gateway secure.</p>
  </div>
);
const SecurityDashboard = () => (
  <div className="p-8 text-white">
    <h2 className="text-2xl font-bold ">Gate Security CheckPoint</h2>
    {/* <p className="text-gray-400 mt-2">Authentication required.Gateway secure.</p> */}
  </div>
);

function App(){
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        {/* 1.Employee Dashboard */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        {/* 2.HR Dashboard */}
        <Route path="/hr" element={<HRDashboard />} />
        {/* 3.Security Dashboard */}
        <Route path="/security" element={<SecurityDashboard />} />
        {/* Redirect to employee dashboard as default */}
        <Route path="/" element={<Navigate to="/employee" />} />
      </Routes>
    </div>
  );
}

export default App;