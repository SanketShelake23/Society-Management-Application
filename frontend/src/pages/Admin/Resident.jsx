import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Resident(){
    const [residents, setResidents] = useState([]);
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
    });
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const loadResident = async()=>{
        const res = await API.get("/users/resident");
        setResidents(res.data);
    }

    useEffect(() => {
       loadResident();
     }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await API.post("/users/resident", formData);
        setFormData({
        name : "",
        email : "",
        password : "",
       });
        loadResident();
        alert("Resident Created Successfully");
    }
     
    // Update :
    const startEdit = (resident) => {
    setEditingId(resident.id);
    setEditForm({
        name: resident.name,
        email: resident.email,
    });
    };

    const updateAdmin = async (id) => {
    await API.put(`/users/resident/${id}`, editForm);
    alert("Resident Updated");
    setEditingId(null);
    loadResident();
    };


    // Delete :
    const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this resident?")) return;
    await API.delete(`/users/resident/${id}`);
    setResidents(residents.filter(r => r.id !== id));
    loadResident();
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Name" value={formData.name} onChange={(e)=> setFormData({...formData, name : e.target.value})} required />
                <input type="email" placeholder="Enter Email" value={formData.email} onChange={(e)=> setFormData({...formData, email : e.target.value})} required />
                <input type="password" placeholder="Enter Password" value={formData.password} onChange={(e)=> setFormData({...formData, password : e.target.value})} required />
                <button type="submit">Create</button>
            </form>

            <h3>Resident List</h3>
            <table style={{ width: "80%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
                <thead style={{padding : "10px"}}>
                    <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {residents.map(a => (
                    <tr key={a.id}>
                    <td>{a.id}</td>
                    <td> {editingId === a.id ? ( <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}/>) : a.name} </td>
                    <td> {editingId === a.id ? ( <input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })}/>) : a.email} </td>
                    

            <td> {editingId === a.id ? ( <button onClick={() => updateAdmin(a.id)}>Save</button>) : ( <button onClick={() => startEdit(a)}>Edit</button> )} </td>
            <td> <button onClick={() => deleteAdmin(a.id)}>Delete</button> </td>
            </tr>
            ))}
        </tbody>
        </table>

            <br></br>  
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}