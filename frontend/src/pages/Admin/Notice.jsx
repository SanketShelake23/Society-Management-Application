import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Notice(){
    const [formData, setFormData] = useState({
        title : "",
        description : ""
    });

    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        loadNotices()
    }, []);

    const loadNotices = async()=>{
        const res = await API.get("/notices");
        setNotices(res.data);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await API.post("/notices", formData);
        loadNotices();
        setFormData({title:"", description:""});
        alert("Notice created successfully.");
    }

    return(
         <div>
           <h3>Create Notice</h3>
           <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Title" value={formData.title} onChange={ (e)=>setFormData({...formData, title : e.target.value})} /> <br></br><br></br>
            <textarea placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description : e.target.value})} /> <br></br><br></br>
            <button type="submit">Create</button>
           </form>

           <h3>Notice Board</h3>
           <table style={{ width:"80%", borderCollapse:"collapse", marginTop:"20px", background:"#fff", borderRadius:"8px", overflow:"hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
             <thead style={{padding : "10px"}}>
                 <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                 <th>Notice No</th>
                 <th>Title</th>
                 <th>Description</th>
                 </tr>
             </thead>
             <tbody>
                { notices.map(n =>(
                    <tr key={n.id}>
                       <td>{n.id}</td>
                       <td> <b>{n.title}</b></td>
                       <td>{n.description}</td>
                    </tr>
                ))}

             </tbody>
           </table>

           <br></br>
           <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}