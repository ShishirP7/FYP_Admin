import { Route, Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from "./components/layouts/layout";
import "./index.css"
import Category from "./pages/categories";
import AdminDashboard from "./pages/dashboard";
import Employers from "./pages/employers";
import Errors from "./pages/Error";
import Jobs from "./pages/jobs";
import Login from "./pages/login";
import Settings from "./pages/settings";
import SignUp from "./pages/signUp/signUp";

function App() {
  return (

    <div className="w-full " >
      <ToastContainer />
      <Routes>
        <Route path="/admin/*" element={<AdminContainer />}>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<AdminContainer />} />
      </Routes>
    </div>
  );
}

const AdminContainer = ({ isAuthorize }) => {

  return (
    <>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/category" element={<Category />} />
          <Route path="/change-password" element={<Settings />} />
          <Route path="*" element={<Errors />} />
        </Routes>


      </DashboardLayout>

    </>
  )
}

export default App;