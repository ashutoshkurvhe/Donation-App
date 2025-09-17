import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Toaster } from "sonner";
import Login from "./pages/auth/SignIn";
import Register from "./pages/auth/SignUp";
import Profile from "./pages/Users/UserProfile";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import EditUser from "./pages/Users/EditUser";
import UsersList from "./pages/Users/UsersList";
import CreateNGO from "./pages/NGO/NGOsPage";
import EditNGO from "./pages/NGO/EditNGOPage";
import NGODetails from "./pages/NGO/CreateNGOPage";
import NGOHomePage from "./pages/NGO/NGOsPage";
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"
import NgoLayout from "./layouts/NgoLayout"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            {/* User Layout */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />

            <Route path="editUser" element={<EditUser />} />
            <Route path="usersList" element={<UsersList />} />
          </Route>
        </Routes>
        <Route
          path="/ngo"
          element={
            <ProtectedRoute role="ngo">
              <NgoLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NGOHomePage />} />
          <Route path="ngo" element={<CreateNGO />} />
          <Route path="ngo/:id/edit" element={<EditNGO />} />
          <Route path="ngo/:id/details" element={<NGODetails />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="products/add" element={<AddProductPage />} />
        </Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
