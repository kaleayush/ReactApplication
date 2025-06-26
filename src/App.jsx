import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import { Header } from "./Components";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Products from "./Pages/Product/Products";
import AddProduct from "./Pages/Product/AddProduct";
import Brands from "./Pages/Brand/Brands";
import Suppliers from "./Pages/Supplier/Suppliers";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import { useSelector } from "react-redux"
import { useIsAuthenticated } from "@azure/msal-react";
import ResetPassword from "./Pages/Auth/ResetPassword";
import DashBoard from "./Pages/DashBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Auth/Profile";
function App() {
  const isAuthenticated = useIsAuthenticated();
  const { isUser } = useSelector((state) => state?.auth);
  return (
    <>
    <Router>
    <ToastContainer />
    { 
        (isAuthenticated || isUser) ? (
        <>
          <AuthenticatedLayout />
        </>
      ) : (
        <>
          <UnAuthenticatedLayout />
        </>
      )
    }
    </Router>
    </>
  );
}
export default App;

function AuthenticatedLayout() {
  return (
    <div className="flex h-screen">
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 overflow-y-auto fixed left-0 mt-16">
          <SideBar />
        </div>
        <div className="flex-1 ml-64 overflow-y-auto mt-16 relative bg-gray-50">
          <Routes>
            <Route path="/" caseSensitive={false} element={<DashBoard/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/Products"
              caseSensitive={false}
              element={<Products/>}
            />
            <Route
              path="/Products/Add-Product/:productNo"
              caseSensitive={false}
              element={<AddProduct />}
            />
            <Route
              path="/Products/edit-Product/:productNo"
              caseSensitive={false}
              element={<AddProduct />}
            />
            <Route
              path="/suppliers"
              caseSensitive={false}
              element={<Suppliers />}
            />
            <Route
              path="/brands"
              caseSensitive={false}
              element={<Brands />}
            />
            <Route
              path="/profile"
              caseSensitive={false}
              element={<Profile />}
            />

            
          </Routes>
        </div>
      </div>
    </div>
  );
}

function UnAuthenticatedLayout() {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:idToken" element={<ResetPassword/>} />
    </Routes>
  );
}
