import React from "react";

// Define the types for props and state
interface sidebarType {
  setFlag: (flag: boolean) => void;
}

const Sidebar: React.FC<sidebarType> = ({ setFlag }) => {
  return (
    <div className="flex flex-col gap-24 px-4 py-10">
      <div style={{ cursor: "pointer" }} onClick={() => setFlag(true)}>
        Contact
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => setFlag(false)}>
        Charts and Maps
      </div>
    </div>
  );
};

export default Sidebar;
