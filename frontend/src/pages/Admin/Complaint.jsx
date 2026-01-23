import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Complaint(){
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        loadComplaints()
    }, []);

    const loadComplaints = async()=>{
        const res = await API.get("/complaints");
        setComplaints(res.data);
    }

    const updateStatus = async(id, status)=>{
       await API.put(`/complaints/${id}`, {status});
       loadComplaints();
    }

    return(
        <div>
            <h3>Manage Complaints</h3>
            <table style={{ width:"80%", borderCollapse:"collapse", marginTop:"20px", background:"#fff", borderRadius:"8px", overflow:"hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
                <thead style={{padding : "10px"}}>
                    <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                        <td>Title</td>
                        <td>Status</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(c=>(
                        <tr key={c.id}>
                             <td style={{padding : "10px"}} >{c.title}</td>
                             <td>{c.status}</td>
                             <td><button onClick={()=>updateStatus(c.id,"IN_PROGRESS")}>In Progress</button> <button onClick={()=>updateStatus(c.id,"RESOLVED")}>Resolved</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
             <br></br>
           <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}