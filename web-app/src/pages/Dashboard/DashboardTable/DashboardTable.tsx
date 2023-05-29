import { useState } from "react";
import TabTables from "../../../components/Dashboard/DashboardTables/ListTables";
import ModalCreateTable from "../../../components/Dashboard/DashboardTables/ModalCreateTable";
import ModalEditTable from "../../../components/Dashboard/DashboardTables/ModalEditTable";
import { GET_TABLE_BY_ID_TYPES } from "../../../types/DataTypes";
import { useLazyQuery } from "@apollo/client";
import { TableQuery, TableQueryVariables } from "../../../gql/graphql";
import { GET_TABLE_BY_ID } from "../../../queries/Queries";

const DashboardTable = () => {
  const [tableId, setTableId] = useState<string>("");
  const [arrayTable, setArrayTable] = useState<GET_TABLE_BY_ID_TYPES | null>(
    null
  );
  
  console.log('get table id: ' + tableId)

  const handleTableId = async (tableId: string) => {
    // await getTablebyId({
    //   variables: {
    //     tableId: tableId as string,
    //   },
    // });
    setTableId(tableId)
  };

  const [getTablebyId] = useLazyQuery<TableQuery, TableQueryVariables>(
    GET_TABLE_BY_ID,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        tableId: tableId as string,
      },
    }
  );
  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <div className="AddBtnSection">
          <button className="AddBtn">Ajout d'une table</button>
        </div>
        <ModalCreateTable />
        <ModalEditTable tableId={tableId as string} />
        <TabTables propTableId={handleTableId} />
      </div>
    </div>
  );
};

export default DashboardTable;
