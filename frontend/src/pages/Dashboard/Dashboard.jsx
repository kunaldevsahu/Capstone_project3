import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { getRevenueStats } from "../../services/revenueService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [role, setRole] = useState("");

  // ✅ READ ROLE SAFELY
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // ✅ LOAD STATS ONLY FOR ADMIN
  useEffect(() => {
    if (role === "admin") {
      loadStats();
    }
  }, [role]);

  const loadStats = async () => {
    try {
      const res = await getRevenueStats();
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fq-dashboard-root">
      {/* ✅ TOP NAVBAR */}
      <nav className="fq-navbar">
        <div className="fq-logo">
          <span className="fq-logo-circle">FQ</span>
          <span className="fq-logo-text">FitQuest</span>
        </div>

        <div className="fq-nav-actions">
          <span className="fq-admin-text">
            {role === "admin" ? "Admin Panel" : "Member Panel"}
          </span>
          <button className="fq-logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="fq-layout">
        {/* ✅ SIDEBAR */}
        <aside className="fq-sidebar">
          <p onClick={() => navigate("/dashboard")}>Dashboard</p>
          <p onClick={() => navigate("/trainers")}>Trainers</p>
          

          {role === "admin" && (
            <>
              <p onClick={() => navigate("/members")}>Members</p>
              <p onClick={() => navigate("/classes")}>Classes</p>
              <p onClick={() => navigate("/plans")}>Plans</p>
              <p onClick={() => navigate("/payments")}>Payments</p>

            </>
          )}

          {role === "member" && (
            <>
              <p onClick={() => navigate("/member-classes")}>Classes</p>
              <p onClick={() => navigate("/buy-membership")}>Buy Membership</p>
              <p onClick={() => navigate("/my-membership")}>My Membership</p>
              <p onClick={() => navigate("/payments")}>My Payments</p>
            </>
          )}
          <p onClick={() => navigate("/profile")}>Profile</p>
        </aside>

        {/* ✅ MAIN CONTENT */}
        <main className="fq-content">
          {/* ✅ HERO */}
          <section className="fq-hero">
            <div className="fq-hero-overlay"></div>
            <div className="fq-hero-text">
              <p className="fq-subtitle">Welcome Back</p>
              <h1>
                {role === "admin"
                  ? "FitQuest Admin Dashboard"
                  : "FitQuest Member Dashboard"}
              </h1>
              <p className="fq-desc">
                {role === "admin"
                  ? "Manage members, trainers, classes and payments."
                  : "View your classes, trainers & membership details."}
              </p>
            </div>
          </section>

          {/* ✅ ✅ ✅ ADMIN ONLY SECTION */}
          {role === "admin" && (
            <>
              {/* ✅ STATS */}
              <section className="fq-stats-grid">
                <div className="fq-stat-card">
                  <span className="fq-stat-number">
                    ₹ {stats?.totalRevenue || 0}
                  </span>
                  <span className="fq-stat-label">Total Revenue</span>
                </div>

                <div className="fq-stat-card">
                  <span className="fq-stat-number">
                    {stats?.totalSales || 0}
                  </span>
                  <span className="fq-stat-label">Total Sales</span>
                </div>

                <div className="fq-stat-card">
                  <span className="fq-stat-number">
                    {stats?.activeCount || 0}
                  </span>
                  <span className="fq-stat-label">Active Memberships</span>
                </div>

                <div className="fq-stat-card">
                  <span className="fq-stat-number">
                    {stats?.expiredCount || 0}
                  </span>
                  <span className="fq-stat-label">Expired Memberships</span>
                </div>
              </section>

              {/* ✅ MONTHLY REVENUE CHART */}
              <section className="fq-chart-card">
                <h3>Monthly Revenue</h3>

                {stats?.monthlyRevenue?.length > 0 ? (
                  <div className="fq-chart-wrapper">
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart data={stats.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#f97316"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="fq-chart-empty">No revenue data yet.</p>
                )}
              </section>

              {/* ✅ RECENT SALES + QUICK ACTIONS */}
              <section className="fq-bottom-grid">
                <div className="fq-activity-card">
                  <h3>Recent Membership Sales</h3>
                  <ul>
                    {stats?.recentSales?.map((m) => (
                      <li key={m._id}>
                        ✅ {m.plan?.name} – ₹{m.plan?.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="fq-action-card">
                  <h3>Quick Actions</h3>
                  <div className="fq-action-grid">
                    <button onClick={() => navigate("/members")}>
                      Add Member
                    </button>
                    <button onClick={() => navigate("/trainers")}>
                      Add Trainer
                    </button>
                    <button onClick={() => navigate("/classes")}>
                      Create Class
                    </button>
                    <button onClick={() => navigate("/plans")}>Add Plan</button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ✅ ✅ ✅ MEMBER ONLY WELCOME */}
          {role === "member" && (
            <section className="fq-member-welcome">
              <h3>Your Gym Activities</h3>
              <p>
                Use the sidebar to explore Trainers, Classes and manage your
                Membership.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
