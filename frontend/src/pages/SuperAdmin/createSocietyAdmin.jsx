import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateSocietyAdmin() {
  const [societies, setSocieties] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    society_id: ""
  });

 const [editingId, setEditingId] = useState(null);
 const [editForm, setEditForm] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/societies").then(res => setSocieties(res.data));
    API.get("/users/society-admin").then(res => setAdmins(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/users/society-admin", form);
    alert("Society Admin Created");
  };


  // Update :
 const startEdit = (admin) => {
  setEditingId(admin.id);
  setEditForm({
    name: admin.name,
    email: admin.email,
    society_id: admin.society_id
  });
};

 const updateAdmin = async (id) => {
  await API.put(`/users/society-admin/${id}`, editForm);
  alert("Admin Updated");
  setEditingId(null);
  const res = await API.get("/users/society-admin");
  setAdmins(res.data);
};


// Delete :
const deleteAdmin = async (id) => {
  if (!window.confirm("Delete this admin?")) return;
  await API.delete(`/users/society-admin/${id}`);
  setAdmins(admins.filter(a => a.id !== id));
};



  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h3>Create Society Admin</h3>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />

      <select onChange={e => setForm({...form, society_id: e.target.value})}>
        <option>Select Society</option>
        {societies.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <button>Create Admin</button>
    </form>

    <h3>Society Admin List</h3>
    <table style={{ width: "80%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)" }}>
        <thead style={{padding : "10px"}}>
            <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Society Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
        </thead>
        <tbody>
          {admins.map(a => (
             <tr key={a.id}>
             <td>{a.id}</td>
             <td> {editingId === a.id ? ( <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}/>) : a.name} </td>
             <td> {editingId === a.id ? ( <input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })}/>) : a.email} </td>
             <td> {editingId === a.id ? ( 
                  <select value={editForm.society_id} onChange={e => setEditForm({ ...editForm, society_id: e.target.value })}> <option value="">Select Society</option>
                  {societies.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                 </select>
               ) : ( a.societyName)} </td>

      <td> {editingId === a.id ? ( <button onClick={() => updateAdmin(a.id)}>Save</button>) : ( <button onClick={() => startEdit(a)}>Edit</button> )} </td>
      <td> <button onClick={() => deleteAdmin(a.id)}>Delete</button> </td>
    </tr>
     ))}
  </tbody>
 </table>

     <br></br>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
