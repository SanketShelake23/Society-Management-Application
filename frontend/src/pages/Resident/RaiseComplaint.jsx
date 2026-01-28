import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RaiseComplaint(){
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async(e)=>{
      e.preventDefault();
      await API.post("/complaints", {title, description});
      setTitle("");
      setDescription("");
      alert("Complaint Created !!");
   }

    return(
        <div>
            <h3>Raise Complaints</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Title" value={title} onChange={(e)=> setTitle(e.target.value)} /> <br></br><br></br>  
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Enter Description" /> <br></br><br></br> 
                <button type="submit">Create</button>
            </form>

            <br></br>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    )
}