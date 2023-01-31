import "./NotFound.scss";

import logoLightBig from "../../assets/logos/r-ticket-light-big.png";

const NotFound = () => {
  return (
    <div className="NotFoundMain">
      <div className="NotFoundContent">
        <img className="NotFoundLogo" src={logoLightBig} alt="Logo R'Ticket" />
        <p className="NotFound404Text">404</p>
        <p className="NotFoundText">La page recherchée n'existe pas.</p>
        <button className="NotFoundButton">Retour à l'accueil</button>
      </div>
    </div>
  );
};

export default NotFound;
