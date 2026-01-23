import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmailChange = (e)=>{
       setEmail(e.target.value);
    }

    const handlePassChange = (e)=>{
       setPassword(e.target.value);
    }

    const handleSubmit = async(e) =>{
       e.preventDefault();

       try{
         const res = await API.post("/auth/login", {email, password});
         login(res.data.user, res.data.token);

         if(res.data.user.role==="SUPER_ADMIN"){
            navigate("/superadmin");
         }
         else if(res.data.user.role==="SOCIETY_ADMIN"){
            navigate("/admin");
         }
         else if(res.data.user.role==="COMMITTEE_MEMBER"){
            navigate("/admin");
         }
         else if(res.data.user.role==="RESIDENT"){
            navigate("/resident");
         }
         else if(res.data.user.role==="GUARD"){
            navigate("/guard");
         }
         else if(res.data.user.role==="ACCOUNTANT"){
            navigate("/accountant");
         }
         else{
            navigate("/login");
         }
         

       }
       catch(err){
         alert(err.response?.data?.message || "Login failed");
       }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Enter Email" name="email" value={email} onChange={handleEmailChange} required/>
            <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handlePassChange} required />
            <button type="submit">Login</button>
        </form>
        
        </>
    )
};

export default Login;