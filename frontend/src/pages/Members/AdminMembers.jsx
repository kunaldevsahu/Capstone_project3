import { useEffect, useState } from "react";
import {
  getAllMembers,
  deleteMember,
  updateMemberStatus,
} from "../../services/memberService";
import "./Members.css";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);

  const loadMembers = async () => {
    const res = await getAllMembers();
    setMembers(res.data.data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete member?")) {
      await deleteMember(id);
      loadMembers();
    }
  };

  const handleStatus = async (id, status) => {
    await updateMemberStatus(id, status);
    loadMembers();
  };

  return (
    <div className="fq-member-root">
      <h2 className="fq-page-title">Members</h2>

      <div className="fq-table-card">
        <table className="fq-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m) => (
              <tr key={m._id}>
                <td>{m.email}</td>
                <td>{m.status || "active"}</td>
                <td>
                  <button
                    className="fq-danger-btn"
                    onClick={() => handleDelete(m._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="fq-primary-btn"
                    onClick={() =>
                      handleStatus(
                        m._id,
                        m.status === "active" ? "blocked" : "active"
                      )
                    }
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMembers;
