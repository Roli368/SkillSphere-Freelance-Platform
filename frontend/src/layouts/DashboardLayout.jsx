import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8 bg-slate-100 min-h-screen">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;