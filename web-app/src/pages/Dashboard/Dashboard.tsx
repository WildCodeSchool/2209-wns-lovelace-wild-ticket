import React from "react";
import './Dashboard.scss';
import logoLightBig from "../../assets/logos/r-ticket-light-big.png";

const Dashboard = ({ userData }: { userData: any }) => {
  console.log(userData);

  return (
      <div className="DashboardMain">
        <div className="DashboardContent">
          <img className="DashboardLogo" src={logoLightBig} alt="Logo R'Ticket" />
          <p className="DashboardText">Page Under Construction...</p>
          <p>Connecté avec l'adresse email : {userData.email}</p>
          <button className="DashboardButton">Déconnexion</button>
        </div>
      </div>
  );
};

export default Dashboard;
