import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";
import TabTables from "../../../components/Dashboard/DashboardTables/ListTables";

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
      </div>
    </div>
  );
};

export default DashboardTable;
