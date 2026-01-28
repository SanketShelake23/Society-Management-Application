import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Accountant(){
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : ""
    });
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await API.post("/users/accountant", formData);
        setFormData({name:"", email:"", password: ""});
        alert("Accountant created sucessfully.");
    }

    return(
        <div>
           <h2>Create Accountant</h2>
           <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter Name" value={formData.name} onChange={(e)=>setFormData({...formData, name : e.target.value})} required />
              <input type="email" placeholder="Enter Email" value={formData.email} onChange={(e)=>setFormData({...formData, email : e.target.value})} required />
              <input type="password" placeholder="Enter Password" value={formData.password} onChange={(e)=>setFormData({...formData, password : e.target.value})} required />
              <button type="submit">Create</button>
           </form>
           <br></br>
           <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}