import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Contact from "./Contact";
import Chart from "./Chart";

// Define the types for props and state
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [flag, setFlag] = useState<boolean>(true); // Use type annotation for state

  return (
    <div className="flex" style={{ height: "90%" }}>
      <div className="fixed left-0 min-h-full bg-orange-300 flex-none w-48">
        <Sidebar setFlag={setFlag} />
      </div>
      <div className="flex-1 w-64 ml-48">{flag ? <Contact /> : <Chart />}</div>
    </div>
  );
};

export default Home;
