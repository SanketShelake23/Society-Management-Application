import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AssignFlat() {
  const [flats, setFlats] = useState([]);
  const [residents, setResidents] = useState([]);
  const [flatId, setFlatId] = useState("");
  const [residentId, setResidentId] = useState("");
  const [assignedFlats, setAssignedFlats] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const flatsRes = await API.get("/flats/unassigned");
    const residentsRes = await API.get("/users/resident/unassigned");
    const assignedRes = await API.get("/flats/assigned");

    setFlats(flatsRes.data);
    setResidents(residentsRes.data);
    setAssignedFlats(assignedRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!flatId || !residentId) {
      alert("Please select both flat and resident");
      return;
    }

    await API.put(`/flats/assign/${flatId}`, {
      resident_id: residentId
    });

    alert("Resident assigned successfully");
    setFlatId("");
    setResidentId("");
    loadData();
  };

  const unassignFlat = async (flatId) => {
  if (!window.confirm("Unassign this resident from flat?")) return;

  await API.put(`/flats/unassign/${flatId}`);
  alert("Flat unassigned successfully");

  loadData();
  };

  return (
    <div>
      <h3>Assign Flat</h3>

      <form onSubmit={handleSubmit}>
        <select value={flatId} onChange={e => setFlatId(e.target.value)} required>
          <option value="">Select Flat</option>
          {flats.map(f => (
            <option key={f.id} value={f.id}>
              {f.id} :  Flat {f.flat_number}
            </option>
          ))}
        </select>

        <select value={residentId} onChange={e => setResidentId(e.target.value)} required>
          <option value="">Select Resident</option>
          {residents.map(r => (
            <option key={r.id} value={r.id}>
               {r.id} :  {r.name}
            </option>
          ))}
        </select>

        <button type="submit">Assign</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>Assigned Flats</h3>

    <table
    style={{
        width: "50%",
        borderCollapse: "collapse",
        background: "#fff",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)"
    }}
    >
    <thead>
        <tr style={{ background: "#b000a2", color: "#fff" , textAlign: "left"}}>
        <th>Flat ID</th>
        <th>Flat Number</th>
        <th>Resident ID</th>
        <th>Resident Name</th>
        <th>Action</th>
        </tr>
    </thead>

    <tbody>
        {assignedFlats.map(f => (
        <tr key={f.id}>
            <td  style={{padding : "10px"}}>{f.id}</td>
            <td>{f.flat_number}</td>
            <td>{f.User?.id}</td>
            <td>{f.User?.name}</td>
            <td> <button onClick={()=>unassignFlat(f.id)}>Unassign</button></td>
        </tr>
        ))}
    </tbody>
    </table>

      <br />
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
