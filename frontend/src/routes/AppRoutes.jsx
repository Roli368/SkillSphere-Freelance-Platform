import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/public/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import BrowseGigs from "../pages/gigs/BrowseGigs";
import CreateGig from "../pages/gigs/CreateGig";
import GigDetails from "../pages/gigs/GigDetails";
import EditGig from "../pages/gigs/EditGig";
import MyGigs from "../pages/gigs/MyGigs";



function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Route>

      <Route
        element={<ProtectedRoute> <DashboardLayout /> </ProtectedRoute> }>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile"  element={<Profile />}   />
        <Route path="/browse-gigs" element={<BrowseGigs />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/my-gigs" element={<MyGigs />} />
        <Route path="/gig/:id" element={<GigDetails />} />
        <Route path="/edit-gig/:id" element={<EditGig />} />

      </Route>

    </Routes>
  );
}

export default AppRoutes;