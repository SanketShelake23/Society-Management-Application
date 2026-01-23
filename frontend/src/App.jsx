import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/protectedRoute";
import Socities from "./pages/SuperAdmin/Socities";
import CreateSocietyAdmin from "./pages/SuperAdmin/createSocietyAdmin";
import Flats from "./pages/SuperAdmin/Flats";
import Blocks from "./pages/SuperAdmin/Blocks";
import Resident from "./pages/Admin/Resident";
import AssignFlat from "./pages/Admin/AssignFlat";
import Guard from "./pages/Admin/Guard";
import Notice from "./pages/Admin/Notice";
import Complaint from "./pages/Admin/Complaint";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* // Super Admin */}
      <Route path="/superadmin" element={ <ProtectedRoute  roles={["SUPER_ADMIN"]}> <SuperAdminDashboard/> </ProtectedRoute> } />
      <Route path="/superadmin/societies" element={<ProtectedRoute roles={["SUPER_ADMIN"]}><Socities /></ProtectedRoute>} />
      <Route path="/superadmin/society/:societyId/blocks" element={<ProtectedRoute roles={["SUPER_ADMIN"]}><Blocks /></ProtectedRoute>} />
      <Route path="/superadmin/block/:blockId/flats" element={<ProtectedRoute roles={["SUPER_ADMIN"]}><Flats /></ProtectedRoute>} />
      <Route path="/superadmin/create-admin" element={<ProtectedRoute roles={["SUPER_ADMIN"]}><CreateSocietyAdmin /></ProtectedRoute>} />

      {/* // Society Admin : */}
      <Route path="/admin" element={ <ProtectedRoute  roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER"]}> <AdminDashboard/> </ProtectedRoute> } />
      <Route path="/admin/resident" element={< Resident />} />
      <Route path="/admin/assign-flat" element={<AssignFlat />} />
      <Route path="/admin/guard" element={<Guard />} />
      <Route path="/admin/notice" element={<Notice />} />
      <Route path="/admin/complaint" element={<Complaint />} />
    </Routes>
  );
}

export default App;
