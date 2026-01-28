const downloadBillsReport = () => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:5000/api/reports/bills?token=${token}`;
  window.open(url, "_blank");
};

const downloadPaymentsReport = () => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:5000/api/reports/payments?token=${token}`;
  window.open(url, "_blank");
};

export default function AccountantReports() {
  return (
    <div>
      <h3>Reports</h3>
      <button onClick={downloadBillsReport}> Download Bills Report </button>  &nbsp;
      <button onClick={downloadPaymentsReport}> Download Payment Report </button>
    </div>
  );
}