import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";


export default function MyComplaints(){
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const loadData = async()=>{
        const res = await API.get("/complaints/my");
        setData(res.data);
    }

    useEffect(()=>{
        loadData();
    }, []);

    return(
        <div>
            <h3>Complaints List</h3>
            <table style={{width: "80%", backgroundColor:"#fff", borderRadius:"10px", overflow:"hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
                <thead style={{padding : "10px"}}>
                    <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(c=>(
                        <tr key={c.id}>
                            <td style={{padding : "10px"}}> {c.title} </td>
                            <td> {c.description} </td>
                            <td> {c.status} </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br></br>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    )
}