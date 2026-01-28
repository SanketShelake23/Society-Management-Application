import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Blocks() {
  const { societyId } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    const res = await API.get(`/blocks/${societyId}`);
    setBlocks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/blocks", { name, society_id: societyId });
    setName("");
    loadBlocks();
  };

  const handleDelete = async(id)=>{
    if (!window.confirm("Delete this block?")) return;
    await API.delete(`/blocks/${id}`);
    loadBlocks();
  }

  return (
    <div>
      <h3>Blocks</h3>

      <form onSubmit={handleSubmit}>
        <input placeholder="Block Name" value={name} onChange={e => setName(e.target.value)} required />
        <button>Create Block</button>
      </form>

      <tr />
      <table style={{ width : "50%", borderCollapse : "collapse", marginTop: "20px", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0px 8px rgba(0,0,0,0.1)"  }}>
         <thead>
             <tr style={{ background: "#b000a2", color: "white", textAlign: "left" }}>
                 <th>Block Name</th>
                 <th>Action</th>
                 <th>Delete</th>
             </tr>
         </thead>
         <tbody>
             {blocks.map(b => (
               <tr key={b.id} style={{ borderBottom: "1px solid #eee" }}>
                   <td>{b.name}</td>
                   <td> <Link to={`/superadmin/block/${b.id}/flats`}>Manage Flats</Link></td>
                   <td> <button onClick={()=>handleDelete(b.id)}>Delete</button> </td>
               </tr>
             ))}
         </tbody>
      </table>
          <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
