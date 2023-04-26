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

const DashboardStatsList = ({ data }: { data: any }) => {
  const [rows, setRows] = useState(15);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const ticketsLoading = useContext(AppContext)?.ticketsLoading;

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    console.log(filters);
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const changeDateFormat = (date: any) => {
    if (!date) {
      return "";
    }
    const dateToFormat = new Date(date);
    const day = dateToFormat.getDate().toString().padStart(2, "0");
    const month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0");
    const year = dateToFormat.getFullYear().toString();
    const hours = dateToFormat.getHours().toString().padStart(2, "0");
    const minutes = dateToFormat.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    function updateDataTableRows() {
      const width = window.innerWidth;

      if (width < 768) {
        setRows(6);
      } else if (width < 1200) {
        setRows(10);
      } else {
        setRows(15);
      }
    }

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
        <p className="DashboardStatsListHeaderExportText">Exports de données</p>
        <Button
          type="button"
          title="CSV"
          className="DashboardStatsListHeaderExportButton"
          icon="pi pi-file"
          rounded
          onClick={() => alert("ok")}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          title="XLSX"
          className="DashboardStatsListHeaderExportButton"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={() => alert("ok")}
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
    <div className="card DashboardStatsListContainer">
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
        ></Column>
        <Column
          field="placedAt"
          header="Placé le"
          sortable
          body={(ticket) => changeDateFormat(ticket.placedAt)}
        ></Column>
        <Column
          field="closedAt"
          header="Clos le"
          sortable
          body={(ticket) => changeDateFormat(ticket.closedAt)}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DashboardStatsList;
