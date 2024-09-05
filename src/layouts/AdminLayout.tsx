import React, { ReactNode, useEffect } from "react";
import { AdminPage } from "../pages";

const AdminLayout = ({children} : {children: ReactNode}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col h-[120vh] overflow-hidden">
      {children}
    </div>
  );
};

export default AdminLayout;
