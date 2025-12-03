import { useEffect, useState } from "react";
import { getAllClasses, createClass } from "../../services/classService";
import "./Classes.css";

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    trainer: "",
    date: "",
    time: "",
    duration: "",
  });

  const loadClasses = async () => {
    const res = await getAllClasses();
    setClasses(res.data.data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClass({
      ...form,
      duration: Number(form.duration),
    });
    setForm({ name: "", trainer: "", date: "", time: "", duration: "" });
    loadClasses();
  };

  return (
    <div className="fq-class-root">
      <h2 className="fq-title">Manage Classes</h2>

      {/* CREATE CLASS FORM */}
      <form onSubmit={handleSubmit} className="fq-class-form">
        <input
          placeholder="Class Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Trainer ID"
          value={form.trainer}
          onChange={(e) => setForm({ ...form, trainer: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          placeholder="Time (6AM - 7AM)"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <input
          placeholder="Duration (minutes)"
          type="number"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />
        <button type="submit">Create Class</button>
      </form>

      {/* CLASS LIST */}
      <div className="fq-class-grid">
        {classes.map((c) => (
          <div className="fq-class-card" key={c._id}>
            <h4>{c.name}</h4>
            <p>Trainer: {c.trainer?.name}</p>
            <p>Date: {new Date(c.date).toLocaleDateString()}</p>
            <p>Time: {c.time}</p>
            <p>Duration: {c.duration} min</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClasses;
