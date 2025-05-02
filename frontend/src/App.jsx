import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoutes";
import Departments from "./pages/Departments/Departments";
import EmployeeDashboard from "./pages/Employees/EmployeeDashboard";
import Salary from "./pages/Salary/Salary";
import Leaves from "./pages/Leave/Leaves";
import AddNewDepartment from "./pages/Departments/AddNewDepartment";
import EditDepartment from "./pages/Departments/EditDepartment";
import AddNewEmployee from "./pages/Employees/AddNewEmployee";
import ApplyLeave from "./pages/Leave/ApplyLeave";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgetPassword";
import VerifyOTP from "./pages/VerifyOtp";
import NotFound from "./pages/NotFound";
// import viewEmployee from "./pages/Employees/viewEmployee";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Route - Only accessible if role === "admin" */}
      <Route
        path="/admin-dashboard"
        element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
      />

      {/* Employee Route - Accessible to all users */}
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/Department" element={<Departments />} />
      <Route path="/Department/AddNewDepartment" element={<AddNewDepartment />} />
      <Route path="/Department/edit/:id" element={<EditDepartment />} />
      <Route path="/employee-dashboard/AddNewEmployee" element={<AddNewEmployee />} />
      <Route path="/Salary" element={<Salary />} />
      <Route path="/Leaves" element={<Leaves />} />
      <Route path="/Leaves/Applyleave" element={<ApplyLeave />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/employee-dashboard/viewEmployee/:id" element={<viewEmployee />} /> */}

    </Routes>
  );
}

export default App;
