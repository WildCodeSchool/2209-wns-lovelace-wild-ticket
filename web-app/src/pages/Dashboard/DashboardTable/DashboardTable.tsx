import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import TabTables from "../../../components/TabTables/TabTables";

import "../DashboardTemp.scss";

const DashboardTable = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <div className="AddBtnSection">
          <button className="AddBtn">Ajout d'une table</button>
        </div>
        <TabTables />
        <p>Connecté avec l'adresse email : {appContext?.userData.email}</p>
      </div>
    </div>
  );
};

export default DashboardTable;
