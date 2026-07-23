import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile overlay
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(() => {
    // Check local storage for preference, default to false (expanded)
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  });

  // Save preference to local storage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isDesktopSidebarCollapsed.toString());
  }, [isDesktopSidebarCollapsed]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 h-screen transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDesktopSidebarCollapsed ? 'lg:w-24' : 'lg:w-72'}`}
      >
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)} 
          isCollapsed={isDesktopSidebarCollapsed}
          onToggleCollapse={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;