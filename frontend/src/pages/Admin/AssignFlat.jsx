import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AssignFlat(){
    const [flatId, setFlatId] = useState("");
    const [residentId, setResidentId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await API.put(`/flats/assign/${flatId}`, {resident_id : residentId} );
        setFlatId("");
        setResidentId("");
        alert("Resident Assigned to the Flat.");
    }

    return(
        <div>
            <h3>Assign Flat</h3>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Flat ID" value={flatId} onChange={(e)=>setFlatId(e.target.value)} required />
            <input type="text" placeholder="Enter Resident ID" value={residentId} onChange={(e)=>setResidentId(e.target.value)} required />
            <button type="submit">Assign</button>
            </form>
            <br></br>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}