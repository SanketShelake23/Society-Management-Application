import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";


export default function AccountantBills(){
    const [bills, setBills] = useState([]);
    const navigate = useNavigate();

    const loadBills = async()=>{
        const res = await API.get("/accountant/bills");
        setBills(res.data);
    }

    useEffect(()=>{
        loadBills();
    }, []);

    return(
        <div>
            <h3>Bills</h3>
            <table style={{ width: "50%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
              <thead >
                <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                <th>Resident</th>
                <th>Flat</th>
                <th>Amount</th>
                <th>Status</th>
                </tr>
              </thead>
               <tbody>
                {bills.map(b => (
                <tr key={b.id}>
                    <td>{b.Flat?.User?.name}</td>
                    <td>{b.Flat?.flat_number}</td>
                    <td>{b.amount}</td>
                    <td>{b.status}</td>
                </tr>
                ))}
            </tbody>
           </table>

           <br></br>
           <button onClick={()=>navigate(-1)}>Back</button>
      </div>
    )
}