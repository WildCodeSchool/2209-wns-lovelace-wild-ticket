import React from "react";

const Dashboard = ({ userData }: { userData: any }) => {
  console.log(userData);

  return (
    <div>
      <p>dashboard !</p>
      <button>Signout</button>
    </div>
  );
};

export default Dashboard;
