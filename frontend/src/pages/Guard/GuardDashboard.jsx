import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function GuardDashboard(){
   const navigate = useNavigate();
   const {logout} = useContext(AuthContext);

   const handleLogout = ()=>{
      logout();
      navigate("/login");
   }


   return(
    <div>
        <h3>Guard Dashboard</h3>
        <ul>
            <li> <Link to="/guard/visitors"> Manage Visitors</Link> </li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
    </div>
   )
}