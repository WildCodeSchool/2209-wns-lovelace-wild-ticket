import { useNavigate } from "react-router-dom";
import { DASHBOARD_HOME, SIGN_IN_PATH } from "../paths";
import "./Home.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SVGLogo from "../../components/SVGLogo/SVGLogo";

const Home = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const logoSize = "500";

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
      <SVGLogo logoWidth={logoSize} logoHeight={logoSize} />
        <button className="HomePageButton" onClick={handleButton}>
          Accès au dashboard R'Ticket
        </button>
      </div>
    </div>
  );
};

export default Home;
