import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url =
          role === "admin"
            ? "/payments/admin"
            : "/payments/my";

        const res = await api.get(url);
        setPayments(res.data.data || []);
      } catch (err) {
        console.error("Failed to load payments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [role]);

  if (loading) {
    return <div className="fq-payments-root">Loading payments...</div>;
  }

  return (
    <div className="fq-payments-root">
      <h2>Payment History</h2>

      <div className="fq-table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p.user?.name || "You"}</td>
                <td>{p.membership?.plan?.name || "-"}</td>
                <td>₹{p.amount}</td>
                <td>{p.method}</td>
                <td>{p.status}</td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="empty-text">No payments found</p>
        )}
      </div>
    </div>
  );
};

export default Payments;
