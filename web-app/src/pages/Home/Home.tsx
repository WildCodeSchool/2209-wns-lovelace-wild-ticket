import { useNavigate } from "react-router-dom";
import { DASHBOARD_HOME, SIGN_IN_PATH } from "../paths";
import './Home.scss';

const Home = ({isUserAuth }: { isUserAuth: boolean }) => {

  const navigate = useNavigate();

  console.log(isUserAuth);

  const handleButton = (): void => {
    if (isUserAuth) {
      navigate(DASHBOARD_HOME);
    } else {
      navigate(SIGN_IN_PATH);
    }
  }

  //TODO: FAIRE LA PAGE D'ACCUEIL (PRESENTATION EQUIPE + BOUTON ACCES DASHBOARD)
  return (
    <div className='HomePage'>
      <div className='HomePageButtonContainer'>
        <button onClick={handleButton}>Accès au dashboard R'Ticket</button>
      </div>
    </div>
  );
};

export default Home;
