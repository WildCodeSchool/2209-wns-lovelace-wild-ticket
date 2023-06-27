import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { GET_POLE_TYPES } from "../../../types/DataTypes";
import SVGIconEdit from "../../SVG/SVGIconEdit/SVGIconEdit";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";

export default function DashboardPoleListTab({
  poles,
  isClickable,
  editPoleForm,
  confirmDelete,
  setIsClickable,
}: {
  poles: any;
  isClickable: boolean;
  editPoleForm: any;
  confirmDelete: (pole: GET_POLE_TYPES) => Promise<void>;
  setIsClickable: any;
}) {
  const actionButton = (pole: GET_POLE_TYPES) => {
    return (
      <div className="ListTabBodyRowActionsButtonContainer">
        <SVGIconEdit
          onClick={async () => {
            editPoleForm(pole);
            setIsClickable(false);
          }}
          isClickable={isClickable}
        />
        <SVGIconDelete
          onClick={async () => {
            await confirmDelete(pole);
            setIsClickable(false);
          }}
          isClickable={isClickable}
        />
      </div>
    );
  };

  const [filters] = useState<DataTableFilterMeta>({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    zipCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <div className="card" style={{ width: "100%" }}>
      <DataTable
        value={poles}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        size="small"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
      >
        <Column
          field="name"
          header="Nom"
          filter
          filterPlaceholder="Nom"
          style={{ minWidth: "10rem" }}
          sortable
        ></Column>
        <Column
          field="address"
          header="Adresse"
          filter
          filterPlaceholder="Adresse"
          style={{ minWidth: "10rem" }}
          sortable
        ></Column>
        <Column
          field="zipCode"
          header="Code Postal"
          filter
          filterPlaceholder="Code Postal"
          style={{ minWidth: "10rem" }}
          sortable
        ></Column>
        <Column
          field="city"
          header="Ville"
          filter
          filterPlaceholder="Ville"
          style={{ minWidth: "10rem" }}
          sortable
        ></Column>
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Email"
          style={{ minWidth: "10rem" }}
          sortable
        ></Column>
        <Column
          header="Actions"
          style={{ flex: "0 0 4rem", minWidth: "10rem" }}
          body={(pole: GET_POLE_TYPES) => actionButton(pole)}
        ></Column>
      </DataTable>
    </div>
  );
}
