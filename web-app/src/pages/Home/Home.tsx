import { useNavigate } from "react-router-dom";
import { DASHBOARD_HOME, SIGN_IN_PATH } from "../paths";
import "./Home.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SVGLogo from "../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DEFAULT_SIZE } from "../../constants/Constants";

const Home = () => {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleButton = (): void => {
    if (userContext?.isAuthenticated) {
      navigate(DASHBOARD_HOME);
    } else {
      navigate(SIGN_IN_PATH);
    }
  };

  //TODO: FAIRE LA PAGE D'ACCUEIL (PRESENTATION EQUIPE + BOUTON ACCES DASHBOARD)
  return (
    <div className="HomePage">
      <div className="HomePageButtonContainer">
        <SVGLogo
          logoWidth={BIG_LOGO_DEFAULT_SIZE}
          logoHeight={BIG_LOGO_DEFAULT_SIZE}
          logoFill={userContext?.userSVGColorScheme}
        />
        <button className="HomePageButton" onClick={handleButton}>
          Accès au dashboard R'Ticket
        </button>
      </div>
    </div>
  );
};

export default Home;
