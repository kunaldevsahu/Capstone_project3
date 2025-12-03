import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyMembership.css";

const MyMembership = () => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMembership = async () => {
    try {
      const res = await api.get("/api/membership/my");
      setMembership(res.data.data);
    } catch (err) {
      console.error("Failed to load membership", err);
      setMembership(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembership();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  if (!membership)
    return <p style={{ padding: 20 }}>No Membership Found</p>;

  return (
    <div className="fq-membership-root">
      <h2>My Membership</h2>

      <div className="fq-membership-card">
        <p><strong>Plan:</strong> {membership.plan?.name}</p>
        <p><strong>Duration:</strong> {membership.plan?.durationInDays} Days</p>
        <p><strong>Start:</strong> {new Date(membership.startDate).toDateString()}</p>
        <p><strong>End:</strong> {new Date(membership.endDate).toDateString()}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className={membership.status === "active" ? "active" : "expired"}>
            {membership.status.toUpperCase()}
          </span>
        </p>

        <p><strong>Days Left:</strong> {membership.daysLeft} Days</p>
      </div>
    </div>
  );
};

export default MyMembership;
