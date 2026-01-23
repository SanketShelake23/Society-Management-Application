import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateSocietyAdmin() {
  const [societies, setSocieties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    society_id: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/societies").then(res => setSocieties(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/users/society-admin", form);
    alert("Society Admin Created");
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
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
