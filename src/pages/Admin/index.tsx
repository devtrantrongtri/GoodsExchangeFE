import React from "react";
import SideBar from "../../components/Admin/Sidebar";
import { jwtDecode } from "jwt-decode";

function AdminPage() {
  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.sub);
      return decodedToken.sub;
    }
    return 'client';
  };

  return (
    <div style={{ display: "flex", height: "90%" }}>
      <SideBar role={getUserRole()} />
    </div>
  );
}

export default AdminPage;
