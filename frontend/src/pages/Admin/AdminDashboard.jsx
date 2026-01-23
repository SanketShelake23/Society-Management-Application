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
              <li> <Link to="/admin/notice">Manage Notices</Link> </li>
              <li><Link to="/admin/complaint">Complaints</Link></li>
           </ul>
           <button onClick={handleLogout}>Logout</button>
      </div>
    )
}