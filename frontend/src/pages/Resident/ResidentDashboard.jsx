import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function ResidentDashboard(){
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = ()=>{
       logout();
       navigate("/login");
    }
    return(
        <div>
           <h2>Resident Dashboard</h2>
           <ul>
              <li> <Link to="/resident/bills">Manage Bills</Link> </li>
              <li> <Link to="/resident/complaints/new">Raise Complaint</Link> </li>
              <li> <Link to="/resident/complaints">My Complaints</Link> </li>
              <li> <Link to="/resident/notices">Notices</Link></li>
              <li> <Link to="/resident/visitors">View Visitors</Link> </li>
              <li> <Link to="/resident/reports">My Reports</Link> </li>
             
           </ul>
           <button onClick={handleLogout}>Logout</button>
      </div>
    )
}