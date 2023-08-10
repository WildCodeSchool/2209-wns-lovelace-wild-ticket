import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import TabTables from "../../../components/Dashboard/DashboardTables/ListTables";
import ModalCreateTable from "../../../components/Dashboard/DashboardTables/ModalCreateTable";
import ModalEditTable from "../../../components/Dashboard/DashboardTables/ModalEditTable";
import ModalDeleteTable from "../../../components/Dashboard/DashboardTables/ModalDeleteTable";

import "./DashboardTable.scss";
import "../../../components/Dashboard/DashboardTables/ModalEditTable.scss";
import { AppContext } from "../../../context/AppContext";
import { GET_TABLES_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";

const DashboardTable = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [tableId, setTableId] = useState<string>("");
  const [table, setTable] = useState(null);
  const [tablesOf2, setTablesOf2] = useState<number>(0);
  const [tablesOf4, setTablesOf4] = useState<number>(0);
  const [tablesOf6, setTablesOf6] = useState<number>(0);
  const [tablesOf8, setTablesOf8] = useState<number>(0);
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const tables = useContext(AppContext)
    ?.tables as GET_TABLES_BY_RESTAURANT_TYPES;
  const refetchTables = useContext(AppContext)?.tablesRefetch;

  const handleTableId = async (table: any) => {
    setTableId(table.id);
    setTable(table);
  };

  useEffect(() => {
    let tablesOf2 = 0;
    let tablesOf4 = 0;
    let tablesOf6 = 0;
    let tablesOf8 = 0;
    let totalSeats = 0;

    tables?.map((table) => {
      if (table.capacity === 2) {
        tablesOf2++;
      } else if (table.capacity === 4) {
        tablesOf4++;
      } else if (table.capacity === 6) {
        tablesOf6++;
      } else if (table.capacity === 8) {
        tablesOf8++;
      }
      return (totalSeats += table.capacity);
    });
    setTablesOf2(tablesOf2);
    setTablesOf4(tablesOf4);
    setTablesOf6(tablesOf6);
    setTablesOf8(tablesOf8);
    setTotalSeats(totalSeats);
  }, [tables]);

  return (
    <>
      <Helmet>
        <title>R'Ticket - Tables</title>
      </Helmet>
      <section className="DashboardTableSection">
        <header className="DashboardTableHeader">
          <div className="DashboardTableHeaderButtonContainer">
            <button
              className="DashboardTableHeaderButton"
              onClick={() => {
                setShowModal(true);
              }}
            >
              + Ajouter une table
            </button>
          </div>
        </header>

        <main className="DashboardTableList">
          <TabTables
            propTableId={handleTableId}
            editModal={setShowEditModal}
            deleteModal={setShowDeleteModal}
          />
        </main>
        <footer className="DashboardTableFooter">
          <div className="DashboardTableFooterTitle">
            <h2>Actuellement en salle</h2>
          </div>
          <div className="DashboardTableFooterContentList">
            <div className="DashboardTableFooterContent">
              <h3>Tables de 2 &#10140;</h3>
              <h3>{tablesOf2}</h3>
            </div>
            <div className="DashboardTableFooterContent">
              <h3>Tables de 4 &#10140;</h3>
              <h3>{tablesOf4}</h3>
            </div>
            <div className="DashboardTableFooterContent">
              <h3>Tables de 6 &#10140;</h3>
              <h3>{tablesOf6}</h3>
            </div>
            <div className="DashboardTableFooterContent">
              <h3>Tables de 8 &#10140;</h3>
              <h3>{tablesOf8}</h3>
            </div>
          </div>
          <div className="DashboardTableFooterTotal">
            <h2>Soit un total de {totalSeats} couverts</h2>
          </div>
        </footer>
      </section>
      <div className="dashboard-table">
        <div className="dashboard-table-container">
          {showModal && (
            <ModalCreateTable
              setShowModal={setShowModal}
              refetch={refetchTables}
            />
          )}
          {showEditModal && (
            <ModalEditTable
              table={table}
              editModal={setShowEditModal}
              refetch={refetchTables}
            />
          )}
          {showDeleteModal && (
            <ModalDeleteTable
              tableId={tableId as string}
              deleteModal={setShowDeleteModal}
              refetch={refetchTables}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTable;
