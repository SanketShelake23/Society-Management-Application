const downloadBillsReport = () => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:5000/api/reports/bills?token=${token}`;
  window.open(url, "_blank");
};

export default function AdminReports() {
  return (
    <div>
      <h3>Reports</h3>
      <button onClick={downloadBillsReport}> Download Bills Report </button>
    </div>
  );
}