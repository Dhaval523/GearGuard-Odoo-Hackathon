// App.jsx or main component
import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';
import WorkCenterList from './pages/WorkCenterList';
import EquipmentListView from './pages/EquipmentList';
import EquipmentDetailForm from './pages/EquipmentDetailForm';
import GearGuardLanding from './pages/GearGuardLanding';
import EquipmentCategoryPage from './pages/EquipmentCategory';
import MaintenanceTeamPage from './pages/Team';

function App() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-nunito">
        <Toaster position="top-right" />
        <Routes>
        
          <Route path="/" element={<GearGuardLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/work-center" element={<WorkCenterList />} />
          <Route path="/equipment-list" element={<EquipmentListView />} />
          <Route path="/equipment-detail" element={<EquipmentDetailForm />} />
          <Route path="/equipment-category" element={<EquipmentCategoryPage />} />
          <Route path="/team" element={<MaintenanceTeamPage />} />

        </Routes>
      </div>
  );
}

export default App;