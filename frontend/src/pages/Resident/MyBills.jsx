import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function MyBills() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    const res = await API.get("/bills/resident");
    setBills(res.data);
  };

  const payBill = async (billId) => {
    await API.post("/payments", {
      bill_id: billId,
      payment_mode: "ONLINE"
    });
    alert("Payment Successful");
    loadBills();
  };

  return (
    <div>
      <h2>My Bills</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Month</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.amount}</td>
              <td>{b.billing_month}</td>
              <td>{b.status}</td>
              <td>
                {b.status === "PENDING" && (
                  <button onClick={() => payBill(b.id)}>Pay</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <br></br>
        <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
