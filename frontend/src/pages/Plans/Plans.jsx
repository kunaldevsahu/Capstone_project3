import { useEffect, useState } from "react";
import "./Plans.css";
import {
  getAdminPlans,
  createPlan,
  deletePlan,
} from "../../services/planService";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    durationInDays: "",
    description: "",
  });

  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await getAdminPlans();
      setPlans(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.durationInDays) {
      return alert("All required fields must be filled");
    }

    try {
      await createPlan({
        ...form,
        price: Number(form.price),
        durationInDays: Number(form.durationInDays),
      });
      setForm({ name: "", price: "", durationInDays: "", description: "" });
      loadPlans();
    } catch (err) {
      alert("Failed to create plan");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      await deletePlan(id);
      loadPlans();
    } catch (err) {
      alert("Failed to delete plan");
    }
  };

  return (
    <div className="fq-plans-page">
      <div className="fq-plans-header">
        <div>
          <h2>Membership Plans</h2>
          <p>Manage FitQuest subscription plans & pricing</p>
        </div>
      </div>

      <div className="fq-plans-grid">
        {/* CREATE PLAN */}
        <div className="fq-card fq-create-plan">
          <h3>Create New Plan</h3>

          <form onSubmit={handleSubmit}>
            <div className="fq-form-group">
              <label>Plan Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Monthly / Quarterly"
              />
            </div>

            <div className="fq-form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="2000"
              />
            </div>

            <div className="fq-form-group">
              <label>Duration (Days)</label>
              <input
                type="number"
                name="durationInDays"
                value={form.durationInDays}
                onChange={handleChange}
                placeholder="30"
              />
            </div>

            <div className="fq-form-group">
              <label>Description</label>
              <textarea
                rows="3"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Gym access + trainer support"
              />
            </div>

            <button type="submit" className="fq-primary-btn">
              Create Plan
            </button>
          </form>
        </div>

        {/* LIST PLANS */}
        <div className="fq-card fq-plan-list">
          <div className="fq-plan-list-header">
            <h3>Existing Plans</h3>
            {loading && <span className="fq-loading">Loading...</span>}
          </div>

          <div className="fq-table-wrapper">
            <table className="fq-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {plans.length === 0 && !loading && (
                  <tr>
                    <td colSpan="5" className="fq-empty">
                      No plans created yet
                    </td>
                  </tr>
                )}

                {plans.map((plan) => (
                  <tr key={plan._id}>
                    <td>{plan.name}</td>
                    <td>₹ {plan.price}</td>
                    <td>{plan.durationInDays} days</td>
                    <td>{plan.description || "-"}</td>
                    <td>
                      <button
                        className="fq-danger-btn"
                        onClick={() => handleDelete(plan._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
