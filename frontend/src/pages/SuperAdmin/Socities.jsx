import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Socities(){
    const [socities, setSocities] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        loadSocities()
    }, []);

    const loadSocities = async()=>{
        const res = await API.get("/societies");
        setSocities(res.data);
    };


    const handleSubmit = async(e)=>{
       e.preventDefault();
       await API.post("/societies", {name, address});
       setName("");
       setAddress("");
       loadSocities();
    }

    return(
        <div>
            <h3>Society</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input type="text" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                <button type="submit">Create Society</button>
            </form>

            <hr/>

            <div>
                <h3>Society List</h3>
                <table style={{ width: "50%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
                    <thead style={{padding : "10px"}}>
                        <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {socities.map((society)=> (
                            <tr key={society.id}  style={{ borderBottom: "1px solid #eee" }}>
                                <td>{society.name}</td>
                                <td>{society.address}</td>
                                <td> <Link to={`/superadmin/society/${society.id}/blocks`}>Manage Blocks</Link> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <br></br>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

        </div>


    )
}