import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Plans from "../pages/Plans/Plans";
import BuyMembership from "../pages/BuyMembership/BuyMembership";
import MyMembership from "../pages/MyMembership/MyMembership";
import AdminMembers from "../pages/Members/AdminMembers";
import Payments from "../pages/Payments/Payments"
import Trainers from "../pages/Trainers/Trainers";
import AdminClasses from "../pages/Classes/AdminClasses";
import MemberClasses from "../pages/Classes/MemberClasses"
import Profile from "../pages/Profile/Profile"




import {
  ProtectedRoute,
  AdminRoute,
  MemberRoute,
} from "./RoleRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Common for both */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ ADMIN ONLY */}
      <Route
        path="/plans"
        element={
          <AdminRoute>
            <Plans />
          </AdminRoute>
        }
      />

      {/* ✅ USER ONLY */}
      <Route
        path="/buy-membership"
        element={
          <MemberRoute>
            <BuyMembership />
          </MemberRoute>
        }
      />

      <Route
        path="/my-membership"
        element={
          <MemberRoute>
            <MyMembership />
          </MemberRoute>
        }
      />
      <Route
        path="/members"
        element={
          <AdminRoute>
            <AdminMembers />
          </AdminRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainers"
        element={
          <ProtectedRoute>
            <Trainers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/classes"
        element={
          <AdminRoute>
            <AdminClasses />
          </AdminRoute>
        }
      />

      <Route
        path="/member-classes"
        element={
          <MemberRoute>
            <MemberClasses />
          </MemberRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
};

export default AppRoutes;
