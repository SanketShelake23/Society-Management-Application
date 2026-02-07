import { useEffect, useState } from "react"
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function SocietyVisitors(){
    const [visitors, setVisitors] = useState([]);
    const navigate = useNavigate();

    const loadVisitors = async()=>{
        const res = await API.get("/visitors");
        setVisitors(res.data);
    }

    useEffect(()=>{
        loadVisitors();
    }, []);

    return(
        <div>
            <h3>Society Visitors Logs</h3>
            <table style={{ width:"80%", borderCollapse:"collapse", marginTop:"20px", background:"#fff", borderRadius:"8px", overflow:"hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
                <thead style={{padding : "10px"}}>
                    <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                        <td>Name</td>
                        <td>Flat</td>
                        <td>Entry</td>
                        <td>Exit</td>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map(v=>(
                        <tr key={v.id}>
                             <td style={{padding : "10px"}} >{v.visitor_name}</td>
                             <td>{v.flat_id}</td>
                             <td>{v.entry_time}</td>
                             <td>{v.exit_time || "IN"}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <br></br>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    )
}