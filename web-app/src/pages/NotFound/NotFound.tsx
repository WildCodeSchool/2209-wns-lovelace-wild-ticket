import "./NotFound.scss";

import logoLightBig from "../../assets/logos/r-ticket-light-big.png";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../paths";

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className="NotFoundMain">
      <div className="NotFoundContent">
        <img className="NotFoundLogo" src={logoLightBig} alt="Logo R'Ticket" />
        <p className="NotFound404Text">404</p>
        <p className="NotFoundText">La page recherchée n'existe pas.</p>
        <button className="NotFoundButton" onClick={handleRedirect}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default NotFound;
