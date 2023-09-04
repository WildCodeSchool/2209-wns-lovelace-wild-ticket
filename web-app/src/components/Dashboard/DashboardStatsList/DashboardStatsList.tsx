import {
  DataTable,
  DataTablePageEvent,
  DataTableSortMeta,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { InfinitySpin } from "react-loader-spinner";
import DashboardStatsExportModal from "../DashboardStatsExportModal/DashboardStatsExportModal";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  ExportTicketsByRestaurantQuery,
  ExportTicketsByRestaurantQueryVariables,
  PaginatedAndSortedTicketsQuery,
  PaginatedAndSortedTicketsQueryVariables,
} from "../../../gql/graphql";
import {
  EXPORT_TICKETS_BY_RESTAURANT,
  GET_PAGINATED_AND_SORTED_TICKETS_BY_RESTAURANT,
} from "../../../queries/Queries";
import ExportService from "../../../services/ExportService";
import { toast } from "react-toastify";
import DateService from "../../../services/DateService";
import "primeicons/primeicons.css";
import "./DashboardStatsList.scss";
import {
  DATA_TABLE_LAZY_STATE_TYPES,
  GET_PAGINATED_AND_SORTED_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";

const DashboardStatsList = () => {
  const appContext = useContext(AppContext);
  const restaurantName = appContext?.userData.restaurant.name;
  const restaurantId = appContext?.userData.restaurant.id;

  const [tickets, setTickets] =
    useState<GET_PAGINATED_AND_SORTED_TICKETS_BY_RESTAURANT_TYPES>(null);
  const [openExportModal, setOpenExportModal] = useState<boolean>(false);
  const [exportTypeFile, setExportTypeFile] = useState<string>("");
  const [isPortraitTabletView, setIsPortraitTabletView] =
    useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [lazyState, setlazyState] = useState<DATA_TABLE_LAZY_STATE_TYPES>({
    globalFilter: "",
    first: 0,
    rows: 18,
    page: 1,
    sortField: ["number"],
    sortOrder: [-1],
  });

  // Data Table Data Filtering, Sorting, and Paginating
  const { loading } = useQuery<
    PaginatedAndSortedTicketsQuery,
    PaginatedAndSortedTicketsQueryVariables
  >(GET_PAGINATED_AND_SORTED_TICKETS_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      restaurantId: restaurantId as string,
      globalFilter: lazyState.globalFilter,
      pageNumber: lazyState.page,
      pageSize: lazyState.rows,
      sort: lazyState.sortField,
      order: lazyState.sortOrder,
    },
    onCompleted: (data) => {
      if (data.PaginatedAndSortedTickets) {
        setTickets(data.PaginatedAndSortedTickets);
        setTotalCount(data.PaginatedAndSortedTickets.totalCount);
      }
    },
  });

  const getMultipleSortMetaFromObjectToArray = (): DataTableSortMeta[] => {
    return lazyState.sortField.map((sortField, index) => ({
      field: sortField,
      order: lazyState.sortOrder[index],
    })) as DataTableSortMeta[];
  };

  const onPage = (event: DataTablePageEvent): void => {
    setlazyState({
      ...lazyState,
      first: event.first,
      page: (event.page as number) + 1,
    });
  };

  const onSort = (event: DataTablePageEvent): void => {
    const sortField: string[] = [];
    const sortOrder: number[] = [];
    event.multiSortMeta.forEach((sortMeta: DataTablePageEvent[string]) => {
      sortField.push(sortMeta.field);
      sortOrder.push(sortMeta.order);
    });
    setlazyState({
      ...lazyState,
      sortField: sortField,
      sortOrder: sortOrder,
    });
  };

  const onChange = (event: any): void => {
    setlazyState({
      ...lazyState,
      globalFilter: event.target.value,
    });
  };

  // CSV and XLSX Export
  const [getTicketsToExport, { loading: exportLoading }] = useLazyQuery<
    ExportTicketsByRestaurantQuery,
    ExportTicketsByRestaurantQueryVariables
  >(EXPORT_TICKETS_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.ExportTicketsByRestaurant) {
        ExportService.exportTickets(
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

  const handleOpenModalExport = (exportType: string): void => {
    setOpenExportModal(true);
    setExportTypeFile(exportType);
  };

  const handleExport = async (value: Date[]): Promise<void> => {
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

  const updateDataTableRows = useCallback((): void => {
    const width = window.innerWidth;
    const isPortraitTablet = width < 1190;
    const isLargeDesktop = width >= 1400;

    setIsPortraitTabletView(isPortraitTablet);

    setlazyState((prevState: DATA_TABLE_LAZY_STATE_TYPES) => ({
      ...prevState,
      rows: isPortraitTablet ? 17 : isLargeDesktop ? 15 : 11,
    }));
  }, [setIsPortraitTabletView, setlazyState]);

  useEffect(() => {
    updateDataTableRows();

    const handleResize = () => {
      updateDataTableRows();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDataTableRows]);

  const header = (
    <div className="DashboardStatsListHeader">
      <div className="DashboardStatsListHeaderSearch">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            id="nameFilter"
            name="nameFilter"
            autoFocus
            className="DashboardStatsListHeaderSearchInput"
            value={lazyState.globalFilter}
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

  return loading ? (
    <div className="loadingSpinContainer">
      <div className="loadingSpin">
        <InfinitySpin width="200" color="#155e75" />
      </div>
    </div>
  ) : (
    tickets && (
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
            lazy
            header={header}
            value={tickets.tickets}
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalCount}
            onPage={onPage}
            onSort={onSort}
            onChange={onChange}
            multiSortMeta={getMultipleSortMetaFromObjectToArray()}
            sortMode="multiple"
            tableStyle={{ minWidth: "100%" }}
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
              body={(ticket) =>
                DateService.changeDateToStringFormatWithDateAndHours(
                  ticket.createdAt
                )
              }
            ></Column>
            <Column
              field="deliveredAt"
              header="Délivré le"
              sortable
              body={(ticket) =>
                DateService.changeDateToStringFormatWithDateAndHours(
                  ticket.deliveredAt
                )
              }
              hidden={isPortraitTabletView === true ? true : false}
            ></Column>
            <Column
              field="placedAt"
              header="Placé le"
              sortable
              body={(ticket) =>
                DateService.changeDateToStringFormatWithDateAndHours(
                  ticket.placedAt
                )
              }
              hidden={isPortraitTabletView === true ? true : false}
            ></Column>
            <Column
              field="closedAt"
              header="Clos le"
              sortable
              body={(ticket) =>
                DateService.changeDateToStringFormatWithDateAndHours(
                  ticket.closedAt
                )
              }
              hidden={isPortraitTabletView === true ? true : false}
            ></Column>
          </DataTable>
        </div>
      </div>
    )
  );
};

export default DashboardStatsList;
