const downloadBillsReport = () => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:5000/api/reports/resident/bills?token=${token}`;
  window.open(url, "_blank");
};

export default function ResidentReports() {
  return (
    <div>
      <h3>Reports</h3>
      <button onClick={downloadBillsReport}> Download Bills Report </button>
    </div>
  );
}