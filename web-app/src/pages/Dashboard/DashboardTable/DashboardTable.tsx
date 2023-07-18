import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

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

  return (
    <HelmetProvider>
      <Helmet>
        <title>R'Ticket - Tables</title>
      </Helmet>
      <div className="dashboard-table">
        <div className="add-table-button-section">
          <button
            className="add-table-button"
            onClick={() => setShowModal(true)}
          >
            Ajout d'une table
          </button>
        </div>
        <div className="dashboard-table-container">
          {showModal && <ModalCreateTable setShowModal={setShowModal} />}
          {showEditModal && (
            <ModalEditTable table={table} editModal={setShowEditModal} />
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
    </HelmetProvider>
  );
};

export default DashboardTable;
