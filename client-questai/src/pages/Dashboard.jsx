import DashboardCosmosWallpaper from "../animations/DashboardCosmosWallpaper";
import Sidebar from "../pages/Sidebar";

export default function Dashboard() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <DashboardCosmosWallpaper />
       <Sidebar />
      {/* Add your dashboard content here */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#fff"
      }}>
        <h1 style={{ fontWeight: 700, fontSize: "2.5rem", letterSpacing: "0.04em" }}>Dashboard</h1>
        <p>Welcome to your cosmos-inspired dashboard!</p>
      </div>
    </div>
  );
}