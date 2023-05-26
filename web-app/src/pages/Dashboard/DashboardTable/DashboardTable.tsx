import { useState } from "react";
import TabTables from "../../../components/Dashboard/DashboardTables/ListTables";
import ModalCreateTable from "../../../components/Dashboard/DashboardTables/ModalCreateTable";
import ModalEditTable from "../../../components/Dashboard/DashboardTables/ModalEditTable";
import { TableQuery, TableQueryVariables, UpdateTableMutation, UpdateTableMutationVariables } from "../../../gql/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_TABLE_BY_ID, UPDATE_TABLE } from "../../../queries/Queries";
import { GET_TABLE_BY_ID_TYPES } from "../../../types/DataTypes";
import { DataTable } from "primereact/datatable";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";

const DashboardTable = () => {
  const [tableId, setTableId] = useState<string>("");
  const [arrayTable, setArrayTable] = useState<GET_TABLE_BY_ID_TYPES | null>(
    null
  );

  const [editNumber, setEditNumber] = useState<number | null>(
    null
  );
  const [editSeats, setEditSeats] = useState<number | null>(
    null
  );

  const handleTableId = async (tableId: string) => {
    await getTablebyId({
      variables: {
        tableId: tableId as string,
      },
    });
  };

  const [getTablebyId] = useLazyQuery<TableQuery, TableQueryVariables>(
    GET_TABLE_BY_ID,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        tableId: tableId as string,
      },

      onCompleted: (data) => {
        if (data.Table) {
          setEditNumber(data.Table.number)
          setEditSeats(data.Table.capacity)
        }
      },
    }
  );

  const [updateTable] = useMutation<
  UpdateTableMutation,
  UpdateTableMutationVariables
>(UPDATE_TABLE);

const submitEditTableForm = async () => {
  try {
    await updateTable({
      variables: {
        updateTableId: tableId as string,
        capacity: editSeats as number,
        number: editNumber as number,
      },
    });
    toast.success(`Vous avez modifié une table avec succès.`);
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <div className="AddBtnSection">
          <button className="AddBtn">Ajout d'une table</button>
        </div>
        <ModalCreateTable />
        <ModalEditTable tableNumber={editNumber} tableCapacity={editSeats} submitEdit={submitEditTableForm} setTableNumber={setEditNumber} setTableSeat={setEditSeats}/>
        <TabTables propTableId={handleTableId} />
      </div>
    </div>
  );
};

export default DashboardTable;
