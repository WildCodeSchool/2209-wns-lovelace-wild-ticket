import "./MainMenu.scss";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARD_POLE,
  DASHBOARD_RESTAURANT,
  DASHBOARD_TICKET,
  DASHBOARD_TABLE,
  DASHBOARD_STATS,
  DASHBOARD_USER,
} from "../../pages/paths";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ROLE_ADMIN, ROLE_RESTAURANT } from "../../constants/Constants";

export default function MainMenu() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const userRole = appContext?.userData.role;

  const goToPole = () => {
    navigate(DASHBOARD_POLE);
  };

  const goToRestaurant = () => {
    navigate(DASHBOARD_RESTAURANT);
  };
  const goToTicket = () => {
    navigate(DASHBOARD_TICKET);
  };
  const goToTable = () => {
    navigate(DASHBOARD_TABLE);
  };

  const goToUser = () => {
    navigate(DASHBOARD_USER);
  };

  const goToStat = () => {
    navigate(DASHBOARD_STATS);
  };

  return (
    <div className="mainMenu-container">
      {userRole === ROLE_ADMIN && (
        <button className="mainMenu-button" onClick={goToPole}>
          Pôles restaurateurs
        </button>
      )}

      {userRole === ROLE_ADMIN && (
        <button className="mainMenu-button" onClick={goToRestaurant}>
          Restaurants
        </button>
      )}

      {userRole === ROLE_RESTAURANT && (
        <button className="mainMenu-button" onClick={goToTicket}>
          Tickets
        </button>
      )}

      {userRole === ROLE_RESTAURANT && (
        <button className="mainMenu-button" onClick={goToTable}>
          Tables
        </button>
      )}

      {userRole === ROLE_ADMIN && (
        <button className="mainMenu-button" onClick={goToUser}>
          Utilisateurs
        </button>
      )}

      {(userRole === ROLE_ADMIN || userRole === ROLE_RESTAURANT) && (
        <button className="mainMenu-button" onClick={goToStat}>
          Statistiques
        </button>
      )}
    </div>
  );
}
