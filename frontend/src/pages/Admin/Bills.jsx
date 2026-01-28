import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({
    flat_id: "",
    amount: "",
    billing_month: "",
    due_date: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    const res = await API.get("/bills/society");
    setBills(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/bills", form);
    setForm({ flat_id: "", amount: "", billing_month: "", due_date: "" });
    loadBills();
    alert("Bill created");
  };

  return (
    <div>
      <h2>Society Bills</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Flat ID"
          value={form.flat_id}
          onChange={e => setForm({ ...form, flat_id: e.target.value })}
          required />

        <input placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          required />

        <input placeholder="Month (Jan-2025)"
          value={form.billing_month}
          onChange={e => setForm({ ...form, billing_month: e.target.value })}
        />

        <input type="date"
          value={form.due_date}
          onChange={e => setForm({ ...form, due_date: e.target.value })}
        />

        <button>Create Bill</button>
      </form>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Flat</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.Flat?.flat_number}</td>
              <td>{b.amount}</td>
              <td>{b.billing_month}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

       <br></br>
        <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
