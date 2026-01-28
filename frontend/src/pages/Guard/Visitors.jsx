import { useState, useEffect } from "react"
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Visitors(){
     const [visitors, setVisitors] = useState([]);
     const [formData, setFormData] = useState({
        visitor_name : "",
        flat_id : ""
     });

     const navigate = useNavigate();

     const loadVisitors = async()=>{
        const res = await API.get("/visitors");
        setVisitors(res.data);
     }

     useEffect(()=>{
        loadVisitors();
     }, []);

     const handleSubmit = async(e)=>{
        e.preventDefault();
        await API.post("/visitors", formData);
        setFormData({ visitor_name : "", flat_id : ""});
        loadVisitors();
        alert("Visitor Created Successfully.");
     }

     const markExit = async(id)=>{
        await API.put(`/visitors/exit/${id}`);
        loadVisitors();
     }

     return(
        <div>
            <h3>Visitors Entry</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Name" value={formData.visitor_name} onChange={(e)=>setFormData({...formData, visitor_name : e.target.value})} required/>
                <input type="text" placeholder="Enter Flat ID" value={formData.flat_id} onChange={(e)=>setFormData({...formData, flat_id : e.target.value})} required />
                <button type="submit">Add Visitor</button>
            </form>

            <hr/>

            <h3>Visitors Logs</h3>
            <table style={{ width:"80%", borderCollapse:"collapse", marginTop:"20px", background:"#fff", borderRadius:"8px", overflow:"hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
                <thead style={{padding : "10px"}}>
                    <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                        <td>Name</td>
                        <td>Flat</td>
                        <td>Entry</td>
                        <td>Exit</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map(v=>(
                        <tr key={v.id}>
                             <td style={{padding : "10px"}} >{v.visitor_name}</td>
                             <td>{v.flat_id}</td>
                             <td>{v.entry_time}</td>
                             <td>{v.exit_time || "IN"}</td>
                             <td>
                                {!v.exit_time && (<button onClick={()=>markExit(v.id)}>Mark Exit</button>)}
                             </td>
                        </tr>
                    ))}

                </tbody>
            </table>
             
            <br></br>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
     )
}