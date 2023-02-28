import "./NotFound.scss";

import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../paths";
import SVGLogo from "../../components/SVG/SVGLogo/SVGLogo";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { BIG_LOGO_DEFAULT_SIZE } from "../../constants/Constants";

const NotFound = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleRedirect = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className="NotFoundMain">
      <div className="NotFoundContent">
        <SVGLogo
          logoWidth={BIG_LOGO_DEFAULT_SIZE}
          logoHeight={BIG_LOGO_DEFAULT_SIZE}
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
