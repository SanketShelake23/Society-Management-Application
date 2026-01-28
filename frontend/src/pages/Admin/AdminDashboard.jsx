import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function AdminDashboard(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = ()=>{
       logout();
       navigate("/login");
    }
    return(
        <div>
           <h2>Society Admin Dashboard</h2>
           <ul>
              <li> <Link to="/admin/resident">Add Residents</Link> </li>
              <li> <Link to="/admin/assign-flat">Assign Flat</Link> </li>
              <li> <Link to="/admin/guard">Add Guard</Link> </li>
              <li> <Link to="/admin/accountant">Add Accountant</Link> </li>
              <li> <Link to="/admin/notice">Manage Notices</Link> </li>
              <li> <Link to="/admin/complaint">Complaints</Link></li>
              <li> <Link to="/admin/bills">Manage Bills</Link> </li>
              <li> <Link to="/admin/visitors">Visitor Logs</Link> </li>
              <li> <Link to="/admin/reports">Reports</Link> </li>
           </ul>
           <button onClick={handleLogout}>Logout</button>
      </div>
    )
}