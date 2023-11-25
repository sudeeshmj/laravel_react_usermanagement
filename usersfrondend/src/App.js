import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './users/UserDashboard';
import RouteController from './RouteController';
import UserProfile from './users/UserProfile';
import ForgetPassword from './auth/ForgetPassword';
import AddCategories from './categories/AddCategories';
import SetUserCategories from './categories/SetUserCategories';
import AddSubCategories from './categories/AddCategories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register"  element={<Register />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
 
        <Route path="admin-dashboard" element={<RouteController page={AdminDashboard} />} />
        <Route path="add-categories" element={<RouteController page={AddCategories} />} />
        <Route path="set-categories" element={<RouteController page={SetUserCategories} />} />
        <Route path="add-subcategories" element={<RouteController page={AddSubCategories} />} />
          
        <Route path="user-dashboard" element={<RouteController page={UserDashboard} />} />
        <Route path="edit-profile" element={<RouteController page={UserProfile} />} />
                 
      </Routes>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"/>
    </div>
  );
}

export default App;
