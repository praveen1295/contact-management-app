import React from "react";

// Define the types for props and state
interface sidebarType {
  setFlag: (flag: boolean) => void;
}

const Sidebar: React.FC<sidebarType> = ({ setFlag }) => {
  return (
    <div className="flex flex-col gap-24 px-4 py-10">
      <div style={{ cursor: "pointer" }} onClick={() => setFlag(true)}>
        <a href="" className="text-blue-500">
          Contact
        </a>
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => setFlag(false)}>
        <a className="text-blue-500" href="">
          Charts and Maps
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
