import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function SuperAdminDashboard(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
       logout();
       navigate("/login");
    }

    return(
       <div>
          <h2>Super Admin Dashboard</h2>
          <ul>
            <li> <Link to="/superadmin/societies"> Manage Societies </Link>  </li>
            <li> <Link to="/superadmin/create-admin" >Create Society Admin</Link> </li>
          </ul>
          <button onClick={handleLogout}>Logout</button>
       </div>
    )
}