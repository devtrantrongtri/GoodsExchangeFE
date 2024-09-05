import React, { useEffect } from "react";
import { AdminPage } from "../pages";

const AdminLayout = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col h-[120vh] overflow-hidden">
      <AdminPage />
    </div>
  );
};

export default AdminLayout;
