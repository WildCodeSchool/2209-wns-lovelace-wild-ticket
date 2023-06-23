import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { TableQuery, TableQueryVariables } from "../../../gql/graphql";
import { GET_TABLE_BY_ID } from "../../../queries/Queries";

import TabTables from "../../../components/Dashboard/DashboardTables/ListTables";
import ModalCreateTable from "../../../components/Dashboard/DashboardTables/ModalCreateTable";
import ModalEditTable from "../../../components/Dashboard/DashboardTables/ModalEditTable";
import ModalDeleteTable from "../../../components/Dashboard/DashboardTables/ModalDeleteTable";

import "./DashboardTable.scss";
import "../../../components/Dashboard/DashboardTables/ModalEditTable.scss";

const DashboardTable = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [tableId, setTableId] = useState<string>("");
  const [table, setTable] = useState(null);

  const handleTableId = async (table: any) => {
    setTableId(table.id);
    setTable(table);
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
    <div className="dashboard-table">
      <div className="dashboard-table-container">
        <div className="add-table-button-section">
          <button
            className="add-table-button"
            onClick={() => setShowModal(true)}
          >
            Ajout d'une table
          </button>
        </div>
        {showModal && <ModalCreateTable setShowModal={setShowModal} />}
        {showEditModal && (
          <ModalEditTable
            table={table}
            editModal={setShowEditModal}
          />
        )}
        {showDeleteModal && (
          <ModalDeleteTable
            tableId={tableId as string}
            deleteModal={setShowDeleteModal}
          />
        )}

        <TabTables
          propTableId={handleTableId}
          editModal={setShowEditModal}
          deleteModal={setShowDeleteModal}
        />
      </div>
    </div>
  );
};

export default DashboardTable;
