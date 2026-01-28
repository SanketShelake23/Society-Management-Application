import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AccountantPayment(){

    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    const loadPayments = async()=>{
       const res = await API.get("/accountant/payments");
       setPayments(res.data);
    }

    useEffect(()=>{
        loadPayments();
    }, []);

    return(
        <div>
            <h3>Payments</h3>
            <table style={{ width: "50%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
              <thead >
                <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                <th>Resident</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Date</th>
                </tr>
              </thead>
               <tbody>
                {payments.map(p => (
                <tr key={p.id}>
                    <td>{p.Bill?.Flat?.User?.name}</td>
                    <td>{p.amount}</td>
                    <td>{p.payment_date }</td>
                    <td>{p.payment_mode}</td>
                </tr>
                ))}
            </tbody>
           </table>

           <br></br>
           <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    )
}