import "./NotFound.scss";

import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../paths";
import SVGLogo from "../../components/SVGLogo/SVGLogo";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const logoSize = "500";

  const handleRedirect = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className="NotFoundMain">
      <div className="NotFoundContent">
        <SVGLogo
          logoWidth={logoSize}
          logoHeight={logoSize}
          logoFill={userContext?.userSVGColorScheme}
        />
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
