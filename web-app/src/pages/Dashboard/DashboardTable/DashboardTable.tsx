import { useState } from "react";
import TabTables from "../../../components/Dashboard/DashboardTables/ListTables";
import ModalCreateTable from "../../../components/Dashboard/DashboardTables/ModalCreateTable";
import ModalEditTable from "../../../components/Dashboard/DashboardTables/ModalEditTable";

const DashboardTable = () => {
  const [tableId, setTableId] = useState<string>("");

  const handleTableId = (tableId: string) => {
    setTableId(tableId)
  }
  
  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <div className="AddBtnSection">
          <button className="AddBtn">Ajout d'une table</button>
        </div>
        <ModalCreateTable />
        <ModalEditTable tableId={tableId}/>
        <TabTables setTableId={handleTableId} />
      </div>
    </div>
  );
};

export default DashboardTable;
