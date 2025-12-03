import { useEffect, useState } from "react";
import {
  getMyProfile,
  updateMyProfile,
  changePassword,
} from "../../services/profileService";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const loadProfile = async () => {
    const res = await getMyProfile();
    setProfile(res.data.data);
    setForm({
      name: res.data.data.name,
      phone: res.data.data.phone || "",
    });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateMyProfile(form);
    alert("Profile Updated");
    loadProfile();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    await changePassword(passwordForm);
    alert("Password Changed");
    setPasswordForm({ oldPassword: "", newPassword: "" });
  };

  if (!profile) return null;

  return (
    <div className="fq-profile-root">
      <h2>My Profile</h2>

      {/* ✅ PROFILE INFO */}
      <div className="fq-profile-card">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>

      {/* ✅ UPDATE PROFILE */}
      <form className="fq-profile-form" onSubmit={handleUpdate}>
        <h3>Edit Profile</h3>
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <button>Update Profile</button>
      </form>

      {/* ✅ CHANGE PASSWORD */}
      <form className="fq-profile-form" onSubmit={handlePasswordChange}>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          value={passwordForm.oldPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              oldPassword: e.target.value,
            })
          }
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordForm.newPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              newPassword: e.target.value,
            })
          }
          required
        />
        <button>Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
