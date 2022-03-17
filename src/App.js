import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from "pages/Layout";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Blank from "pages/Blank";
import DashboardLayout from "pages/DashboardLayout";
import CustomersList from "pages/CustomersList";
import OnboardCustomer from "pages/OnboardCustomer";
import Profile from "pages/Profile";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Signup />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="dashboard/" element={<DashboardLayout />}>
          <Route index element={<CustomersList />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="customers/:customersId" element={<Profile />} />
          <Route path="onboard-customer" element={<OnboardCustomer />} />
        </Route>
        <Route path="*" element={<Blank />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
