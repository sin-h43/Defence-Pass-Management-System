import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboard from './pages/employee/EmployeeDashboard.tsx';
import DispatchedPassLog from './pages/employee/DispatchedPassLog.tsx';
import PreSched from './pages/employee/Pre-Scheduled.tsx';
import RepeatedVisitorsPage from './pages/employee/RepeatedVisitorPage.tsx';
import { RepeatedVisitorsProvider } from './contexts/RepeatedVisitorsContext'; // Import the provider

import HRDashboard from './pages/hr/HrDashboard.tsx';
import VisitorMgmt from './pages/hr/VisitorManagement.tsx';
import Analytics from './pages/hr/Analytics.tsx';

//placeholder for HR n Security until we write their full code 

const SecurityDashboard = () => (
  <div className="p-8 text-white">
    <h2 className="text-2xl font-bold ">Gate Security CheckPoint</h2>
    {/* <p className="text-gray-400 mt-2">Authentication required.Gateway secure.</p> */}
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <RepeatedVisitorsProvider> {/* Wrap all routes that need access */}
        <Routes>
          {/* 1.Employee Dashboard */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          
          {/* 2.Dispatched Pass Log */}
          <Route path="/employee/dispatchedPassLog" element={<DispatchedPassLog />} />
          
          {/* 3.Pre-Scheduled Page */}
          <Route path="/employee/pre-scheduledDashboard" element={<PreSched />} />
          
          {/* 4.Repeated Visitor Page */}
            <Route
            path="/employee/repeatedVisitor"
            element={<RepeatedVisitorsPage />}
          />
          
          
          {/* 5.Security Dashboard */}
          <Route path="/security" element={<SecurityDashboard />} />
          
          {/* 6.HR Dashboard */}
          <Route 
          path="/hr" 
          element={<HRDashboard />} />
          <Route
          path = "/hr/visitorMgmt"
          element = {<VisitorMgmt/>}
          />
          <Route 
          path="/hr" 
          element={<HRDashboard />} />
          <Route
          path = "/hr/analytics"
          element = {<Analytics/>}
          />
          
          {/* Redirect to employee dashboard as default */}
          <Route path="/" element={<Navigate to="/employee" />} />
        </Routes>
      </RepeatedVisitorsProvider>
    </div>
  );
}

export default App;