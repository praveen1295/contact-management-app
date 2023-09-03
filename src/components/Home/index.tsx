import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Contact from "./Contact";
import Chart from "./Chart";

// Define the types for props and state
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [flag, setFlag] = useState<boolean>(true); // Use type annotation for state

  return (
    <div className="flex bg-gray-200" style={{ height: "90%" }}>
      <div className="fixed left-0 min-h-full bg-white flex-none w-48 border-r-4 border-indigo-500">
        <Sidebar setFlag={setFlag} />
      </div>
      <div className="flex-1 w-64 ml-48 overflow-y-auto">
        {flag ? <Contact /> : <Chart />}
      </div>
    </div>
  );
};

export default Home;
