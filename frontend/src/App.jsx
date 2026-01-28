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
import MyBills from "./pages/Resident/MyBills";
import Bills from "./pages/Admin/Bills";
import ResidentDashboard from "./pages/Resident/ResidentDashboard";
import RaiseComplaint from "./pages/Resident/RaiseComplaint";
import MyComplaints from "./pages/Resident/MyComplaints";
import Notices from "./pages/Resident/Notices";
import GuardDashboard from "./pages/Guard/GuardDashboard";
import Visitors from "./pages/Guard/Visitors";
import ResidentVisitors from "./pages/Resident/ResidentVisitors";
import SocietyVisitors from "./pages/Admin/SocietyVisitors";
import Accountant from "./pages/Admin/Accountant";
import AccountantDashboard from "./pages/Accountant/AccountantDashboard";
import AccountantBills from "./pages/Accountant/AccountantBills";
import AccountantPayment from "./pages/Accountant/AccountantPayment";
import MonthlyReport from "./pages/Accountant/MonthlyReport";
import AdminReports from "./pages/Admin/AdminReports";
import AccountantReports from "./pages/Accountant/AccountantReports";
import ResidentReports from "./pages/Resident/ResidentReports";

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
      <Route path="/admin/accountant" element={<Accountant />} />
      <Route path="/admin/notice" element={<Notice />} />
      <Route path="/admin/complaint" element={<Complaint />} />
      <Route path="/admin/bills" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER"]}> <Bills /> </ProtectedRoute>}/>
      <Route path="/admin/visitors" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER"]}> <SocietyVisitors /> </ProtectedRoute>} />
      <Route path="/admin/reports" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER"]}> <AdminReports /> </ProtectedRoute>} />

      {/* // Resident */}
       <Route path="/resident" element={ <ProtectedRoute  roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"]}> <ResidentDashboard/> </ProtectedRoute> } />
       <Route path="/resident/bills" element={<ProtectedRoute roles={["RESIDENT"]}> <MyBills /> </ProtectedRoute>}/>
       <Route path="/resident/complaints/new" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"]}> <RaiseComplaint /> </ProtectedRoute> } />
       <Route path="/resident/complaints" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"]}> <MyComplaints /> </ProtectedRoute> } />
       <Route path="/resident/notices" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"]}> <Notices />  </ProtectedRoute> } />
       <Route path="/resident/visitors" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"]}> <ResidentVisitors />  </ProtectedRoute> } />
       <Route path="/resident/reports" element={ <ProtectedRoute roles={["SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"]}> <ResidentReports />  </ProtectedRoute> } />


      {/* // Guard */}
       <Route path="/guard" element={ <ProtectedRoute roles={["GUARD"]}> <GuardDashboard /> </ProtectedRoute>} />
       <Route path="/guard/visitors" element={ <ProtectedRoute roles={["GUARD"]}> <Visitors /> </ProtectedRoute>} />

      {/* // Accountant */}
       <Route path="/accountant" element={ <ProtectedRoute roles={["ACCOUNTANT"]}> <AccountantDashboard />  </ProtectedRoute>} />
       <Route path="/accountant/bills" element={ <ProtectedRoute roles={["ACCOUNTANT", "SOCIETY_ADMIN"]}> <AccountantBills />  </ProtectedRoute>} />
       <Route path="/accountant/payment" element={ <ProtectedRoute roles={["ACCOUNTANT", "SOCIETY_ADMIN"]}> <AccountantPayment />  </ProtectedRoute>} />
       <Route path="/accountant/reports" element={ <ProtectedRoute roles={["ACCOUNTANT"]}> <MonthlyReport />  </ProtectedRoute>} />
       <Route path="/accountant/reports/pdf" element={ <ProtectedRoute roles={["ACCOUNTANT"]}> <AccountantReports />  </ProtectedRoute>} />
    </Routes>
  );
}

export default App;
