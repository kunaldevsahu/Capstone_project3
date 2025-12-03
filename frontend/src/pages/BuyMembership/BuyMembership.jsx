import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivePlans } from "../../services/planService";
import { buyMembership } from "../../services/membershipService";
import "./BuyMembership.css";

const BuyMembership = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buyingId, setBuyingId] = useState(null);

  const navigate = useNavigate();

  const loadPlans = async () => {
    try {
      const res = await getActivePlans();
      setPlans(res.data.data || []);
    } catch (err) {
      alert("Failed to load plans");
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleBuy = async (planId) => {
    try {
      setLoading(true);
      setBuyingId(planId);

      await buyMembership({
        planId,
        paymentMethod: "UPI", // you can later make this selectable
      });

      alert("✅ Membership purchased successfully!");
      navigate("/payments"); // 🔥 Auto redirect to Payment History
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    } finally {
      setLoading(false);
      setBuyingId(null);
    }
  };

  return (
    <div className="fq-buy-root">
      <h2 className="fq-title">Choose Your Membership Plan</h2>

      <div className="fq-buy-grid">
        {plans.map((plan) => (
          <div className="fq-buy-card" key={plan._id}>
            <h3>{plan.name}</h3>
            <p className="fq-price">₹ {plan.price}</p>
            <p className="fq-duration">{plan.durationInDays} Days</p>

            <ul>
              <li>Full Gym Access</li>
              <li>Group Classes</li>
              <li>Trainer Assistance</li>
            </ul>

            <button
              disabled={loading && buyingId === plan._id}
              onClick={() => handleBuy(plan._id)}
            >
              {loading && buyingId === plan._id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}

        {plans.length === 0 && (
          <p style={{ marginTop: 20 }}>No plans available right now.</p>
        )}
      </div>
    </div>
  );
};

export default BuyMembership;
