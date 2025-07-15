import React from "react";
import { FaUserCircle } from "react-icons/fa";
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling
import AnimatedAtomTitle from "../animations/SidebarAtomAnimation"; // Import the atom animation component

export default function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-title">
        <AnimatedAtomTitle />
      </div>
      <div className="sidebar-cards">
        <div className="sidebar-card">Your newsletters</div>
        <div className="sidebar-card">Other sources</div>
        <div className="sidebar-card">Latest news</div>
      </div>
      <div className="sidebar-profile-card">
        <FaUserCircle className="sidebar-profile-icon" />
        <span>Profile</span>
      </div>
    </aside>
  );
}