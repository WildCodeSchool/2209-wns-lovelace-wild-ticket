import "./NotFound.scss";

import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../paths";
import SVGLogoBig from "../../components/SVGLogoBig/SVGLogoBig";

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className="NotFoundMain">
      <div className="NotFoundContent">
        <SVGLogoBig />
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
