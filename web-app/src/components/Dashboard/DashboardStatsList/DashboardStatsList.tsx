import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/nano/theme.css";
import "primeicons/primeicons.css";
import "./DashboardStatsList.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { InfinitySpin } from "react-loader-spinner";
import DashboardStatsExportModal from "../DashboardStatsExportModal/DashboardStatsExportModal";
import { useLazyQuery } from "@apollo/client";
import {
  ExportTicketsByRestaurantQuery,
  ExportTicketsByRestaurantQueryVariables,
} from "../../../gql/graphql";
import { EXPORT_TICKETS_BY_RESTAURANT } from "../../../queries/Queries";
import { exportTickets } from "../../../services/ExportService";
import { toast } from "react-toastify";
import { changeDateFormat } from "../../../services/DateService";

const DashboardStatsList = ({ data }: { data: any }) => {
  const appContext = useContext(AppContext);
  const ticketsLoading = appContext?.ticketsLoading;
  const restaurantName = appContext?.userData.restaurant.name;
  const restaurantId = appContext?.userData.restaurant.id;

  const [openExportModal, setOpenExportModal] = useState<boolean>(false);
  const [exportTypeFile, setExportTypeFile] = useState<string>("");
  const [isPortraitTabletView, setIsPortraitTabletView] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [rows, setRows] = useState(15);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [getTicketsToExport, { loading: exportLoading }] = useLazyQuery<
    ExportTicketsByRestaurantQuery,
    ExportTicketsByRestaurantQueryVariables
  >(EXPORT_TICKETS_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.ExportTicketsByRestaurant) {
        exportTickets(
          data.ExportTicketsByRestaurant,
          exportTypeFile,
          restaurantName
        );
        toast.success(
          "Export terminé. Le fichier se trouve dans votre dossier de téléchargement."
        );
      }
    },
    onError: () => {
      toast.error("Une erreur est survenue. Merci de renouveler l'opération.");
    },
  });

  const handleOpenModalExport = (exportType: string) => {
    setOpenExportModal(true);
    setExportTypeFile(exportType);
  };

  const handleExport = async (value: any) => {
    const dateMin = value[0];
    const dateMax = value[1];
    await getTicketsToExport({
      variables: {
        restaurantId: restaurantId as string,
        dateMin: dateMin,
        dateMax: dateMax,
      },
    });
    setOpenExportModal(false);
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    const updateDataTableRows = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setIsPortraitTabletView(true);
        setRows(18);
      } else if (width < 1100) {
        setIsPortraitTabletView(false);
      } else if (width < 1200) {
        setRows(11);
      } else {
        setIsPortraitTabletView(false);
        setRows(16);
      }
    };

    updateDataTableRows();
    window.addEventListener("resize", updateDataTableRows);

    return () => {
      window.removeEventListener("resize", updateDataTableRows);
    };
  }, []);

  const header = (
    <div className="DashboardStatsListHeader">
      <div className="DashboardStatsListHeaderSearch">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="DashboardStatsListHeaderSearchInput"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Recherche par nom"
          />
        </span>
      </div>
      <div className="DashboardStatsListHeaderExport">
        <p className="DashboardStatsListHeaderExportText">Export de données</p>
        <Button
          type="button"
          title="CSV"
          className="DashboardStatsListHeaderExportButton"
          icon="pi pi-file"
          rounded
          onClick={() => {
            handleOpenModalExport("csv");
          }}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          title="XLSX"
          className="DashboardStatsListHeaderExportButton"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={() => {
            handleOpenModalExport("xlsx");
          }}
          data-pr-tooltip="XLS"
        />
      </div>
    </div>
  );

  return ticketsLoading ? (
    <div className="loadingSpinContainer">
      <div className="loadingSpin">
        <InfinitySpin width="200" color="#155e75" />
      </div>
    </div>
  ) : (
    <div>
      <DashboardStatsExportModal
        openExportModal={openExportModal}
        handleExport={handleExport}
        type={exportTypeFile}
        loading={exportLoading}
      />
      <div
        className={
          openExportModal
            ? "card DashboardStatsListContainer containerDisabled"
            : "card DashboardStatsListContainer"
        }
      >
        <DataTable
          header={header}
          value={data}
          sortMode="multiple"
          paginator
          rows={rows}
          tableStyle={{ minWidth: "100%" }}
          filters={filters}
          globalFilterFields={["name"]}
          emptyMessage="Aucun ticket trouvé."
        >
          <Column field="number" header="Numéro" sortable></Column>
          <Column field="name" header="Nom" sortable></Column>
          <Column field="seats" header="Capacité" sortable></Column>
          <Column
            field="createdAt"
            dataType="string"
            header="Crée le"
            sortable
            body={(ticket) => changeDateFormat(ticket.createdAt)}
          ></Column>
          <Column
            field="deliveredAt"
            header="Délivré le"
            sortable
            body={(ticket) => changeDateFormat(ticket.deliveredAt)}
            hidden={isPortraitTabletView === true ? true : false}
          ></Column>
          <Column
            field="placedAt"
            header="Placé le"
            sortable
            body={(ticket) => changeDateFormat(ticket.placedAt)}
            hidden={isPortraitTabletView === true ? true : false}
          ></Column>
          <Column
            field="closedAt"
            header="Clos le"
            sortable
            body={(ticket) => changeDateFormat(ticket.closedAt)}
            hidden={isPortraitTabletView === true ? true : false}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default DashboardStatsList;
