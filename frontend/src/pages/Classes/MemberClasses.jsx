import { useEffect, useState } from "react";
import { getAllClasses } from "../../services/classService";
import "./Classes.css";

const MemberClasses = () => {
  const [classes, setClasses] = useState([]);

  const loadClasses = async () => {
    const res = await getAllClasses();
    setClasses(res.data.data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <div className="fq-class-root">
      <h2 className="fq-title">Available Classes</h2>

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

export default MemberClasses;

