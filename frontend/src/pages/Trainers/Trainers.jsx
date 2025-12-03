import { useEffect, useState } from "react";
import {
  getAllTrainers,
  createTrainer,
  deleteTrainer,
} from "../../services/trainerService";
import "./Trainers.css";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    image: null,
  });

  const role = localStorage.getItem("role");

  const loadTrainers = async () => {
    try {
      const res = await getAllTrainers();
      setTrainers(res.data.data || []);
    } catch (err) {
      console.error("Failed to load trainers:", err);
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("specialization", form.specialization);
    formData.append("experience", form.experience);
    formData.append("phone", form.phone);
    if (form.image) {
      formData.append("image", form.image);
    }

    await createTrainer(formData);
    setForm({
      name: "",
      specialization: "",
      experience: "",
      phone: "",
      image: null,
    });

    loadTrainers();
  };

  const handleDelete = async (id) => {
    await deleteTrainer(id);
    loadTrainers();
  };

  if (loading) {
    return <p className="fq-loading">Loading trainers...</p>;
  }

  return (
    <div className="fq-trainers-root">
      <h2 className="fq-page-title">Gym Trainers</h2>

      {role === "admin" && (
        <div className="fq-trainer-form">
          <form className="fq-trainer-form-inner" onSubmit={handleSubmit}>
            <input
              placeholder="Trainer Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Experience (Years)"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
              required
            />

            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            <button type="submit">Add Trainer</button>
          </form>
        </div>
      )}

      <div className="fq-trainer-grid">
        {trainers.map((t) => (
          <div key={t._id} className="fq-trainer-card">
            <img
              src={t.image || "/default-trainer.png"}
              alt={t.name}
              className="fq-trainer-img"
            />

            <h4 className="fq-trainer-name">{t.name}</h4>
            <p>
              <b>Specialization:</b> {t.specialization}
            </p>
            <p>
              <b>Experience:</b> {t.experience} yrs
            </p>
            <p>
              <b>Phone:</b> {t.phone}
            </p>

            {role === "admin" && (
              <button
                className="fq-delete-btn"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
