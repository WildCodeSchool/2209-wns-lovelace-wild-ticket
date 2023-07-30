import { useNavigate } from "react-router-dom";
import { DASHBOARD_HOME, SIGN_IN_PATH } from "../paths";
import "./Home.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SVGLogo from "../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DEFAULT_SIZE } from "../../constants/Constants";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleButton = (): void => {
    if (appContext?.isAuthenticated) {
      navigate(DASHBOARD_HOME);
    } else {
      navigate(SIGN_IN_PATH);
    }
  };

  //TODO: FAIRE LA PAGE D'ACCUEIL (PRESENTATION EQUIPE + BOUTON ACCES DASHBOARD)
  return (
    <>
      <Helmet>
        <title>R'Ticket - Bienvenue</title>
      </Helmet>
      <div className="HomePage">
        <div className="HomePageButtonContainer">
          <SVGLogo
            logoWidth={BIG_LOGO_DEFAULT_SIZE}
            logoHeight={BIG_LOGO_DEFAULT_SIZE}
            logoFill={appContext?.userSVGColorScheme}
          />
          <button className="HomePageButton" onClick={handleButton}>
            Accès au dashboard R'Ticket
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
