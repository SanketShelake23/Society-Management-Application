import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";

const DEFAULT_PASSWORD = "Admin@123";

const SuperAdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Society form
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // Admin modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSocietyId, setSelectedSocietyId] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Society list
  const [societies, setSocieties] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔹 FETCH SOCIETIES
  const fetchSocieties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/societies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSocieties(res.data);
    } catch (error) {
      console.error("Failed to load societies:", error);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  // 🔹 CREATE SOCIETY
  const addSocities = async () => {
    if (!name || !address) return;

    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/societies",
        { name, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSocieties(prev => [...prev, res.data]);
      setName("");
      setAddress("");
    } catch (error) {
      console.error("Create society failed:", error);
    }
  };

  // 🔹 ADD / EDIT SOCIETY ADMIN
  const handleAdminSubmit = async () => {
    if (!adminName || !adminEmail) return;

    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/societies/${selectedSocietyId}/admin`,
        {
          name: adminName,
          email: adminEmail,
          password: DEFAULT_PASSWORD,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchSocieties();

      setShowModal(false);
      setAdminName("");
      setAdminEmail("");
      setSelectedSocietyId(null);
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to save admin", err);
      alert("Failed to save admin");
    }
  };

  return (
    <div className="min-h-screen bg-app-bg p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold text-text-primary">
          Super Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-pastel-red text-white font-medium"
        >
          Logout
        </button>
      </div>

      {/* Create Society */}
      <div className="bg-card-bg p-6 rounded-2xl mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Create New Society
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Society Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          />
          <input
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          />
          <button
            onClick={addSocities}
            className="bg-pastel-blue rounded-xl"
          >
            Create Society
          </button>
        </div>
      </div>

      {/* Society Cards */}
      <div className="grid grid-cols-2 gap-6">
        {societies.map(society => (
          <div
            key={society.id}
            className="bg-card-bg p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold">{society.name}</h3>
            <p className="text-text-secondary">{society.address}</p>

            <div className="mt-4">
              <span className="text-sm text-text-muted">
                Society Admin
              </span>

              {society.societyAdmins ? (
                <p>
                  {society.societyAdmins.name}
                  <br />
                  <span className="text-sm">
                    {society.societyAdmins.email}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-text-muted">
                  Not Assigned
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-xl bg-pastel-green"
                onClick={() => {
                  setSelectedSocietyId(society.id);
                  setAdminName(society.societyAdmins?.name || "");
                  setAdminEmail(society.societyAdmins?.email || "");
                  // 🔥 ONLY LOGIC THAT MATTERS
                  setIsEditMode(!!society.societyAdmins?.email);
                  setShowModal(true);
                }}
              >
                {society.societyAdmins ? "Edit Admin" : "Add Admin"}
              </button>

              {/* ✅ KEPT AS YOU HAD */}
              <button className="px-4 py-2 rounded-xl bg-pastel-blue">
                Manage Blocks
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-card-bg p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add / Edit Society Admin
            </h2>

            <input
              placeholder="Admin Name"
              value={adminName}
              onChange={e => setAdminName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl mb-3"
            />

            <input
              placeholder="Admin Email"
              value={adminEmail}
              disabled={isEditMode}   // 🔥 EMAIL RULE
              onChange={e => setAdminEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl mb-3 ${
                isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />

            <input
              value={DEFAULT_PASSWORD}
              readOnly
              className="w-full px-4 py-2 border rounded-xl bg-gray-100 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                onClick={handleAdminSubmit}
                className="px-4 py-2 bg-pastel-green rounded-xl"
              >
                Save Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
