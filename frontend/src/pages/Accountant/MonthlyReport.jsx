import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function MonthlyReport(){
    
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    const loadReports = async()=>{
        const res = await API.get("/accountant/reports/monthly");
        setReports(res.data);
    }

    useEffect(()=>{
        loadReports()
    }, []);

    return(
        <div>
            <h3>Reports</h3>
            <table style={{ width: "50%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
              <thead >
                <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                <th>Payment Mode</th>
                <th>Total</th>
                </tr>
              </thead>
               <tbody>
                {reports.map(r => (
                <tr key={r.payment_mode}>
                    <td>{r.payment_mode}</td>
                    <td>{r.total}</td>
                </tr>
                ))}
            </tbody>
           </table>

           <br></br>
           <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    )
}