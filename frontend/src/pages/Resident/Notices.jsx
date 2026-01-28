import { useState, useEffect } from "react"
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Notices(){
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    const loadData =  async()=>{
        const res = await API.get("/notices");
        setNotices(res.data);
    }

    useEffect(()=>{
        loadData();
    }, []);

     return(
        <div>
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
           <button onClick={()=>navigate(-1)}>Back</button>
        </div>
     )
}