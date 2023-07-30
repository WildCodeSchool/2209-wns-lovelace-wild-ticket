import "./NotFound.scss";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HOME_PATH } from "../paths";
import SVGLogo from "../../components/SVG/SVGLogo/SVGLogo";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { BIG_LOGO_DEFAULT_SIZE } from "../../constants/Constants";

const NotFound = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const handleRedirect = () => {
    navigate(HOME_PATH);
  };

  return (
    <>
      <Helmet>
        <title>R'Ticket - 404 Not Found</title>
      </Helmet>
      <div className="NotFoundMain">
        <div className="NotFoundContent">
          <SVGLogo
            logoWidth={BIG_LOGO_DEFAULT_SIZE}
            logoHeight={BIG_LOGO_DEFAULT_SIZE}
            logoFill={appContext?.userSVGColorScheme}
          />
          <p className="NotFound404Text">404</p>
          <p className="NotFoundText">La page recherchée n'existe pas.</p>
          <button className="NotFoundButton" onClick={handleRedirect}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
