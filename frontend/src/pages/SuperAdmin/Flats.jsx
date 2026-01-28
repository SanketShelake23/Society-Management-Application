import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Flats() {
  const { blockId } = useParams();
  const [flats, setFlats] = useState([]);
  const [flatNumber, setFlatNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadFlats();
  }, []);

  const loadFlats = async () => {
    const res = await API.get(`/flats/${blockId}`);
    setFlats(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/flats", { flat_number: flatNumber, block_id: blockId });
    setFlatNumber("");
    loadFlats();
  };

  const handleDelete = async(id)=>{
    if (!window.confirm("Delete this flat?")) return;
    await API.delete(`/flats/${id}`);
    loadFlats();
  }

  return (
    <div>
      <h3>Flats</h3>

      <form onSubmit={handleSubmit}>
        <input placeholder="Flat Number" value={flatNumber} onChange={e => setFlatNumber(e.target.value)} required />
        <button>Create Flat</button>
      </form>

      <ul>
        {flats.map(f => (
          <li key={f.id}>
            {f.flat_number}
            &nbsp; <button onClick={()=>handleDelete(f.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}


