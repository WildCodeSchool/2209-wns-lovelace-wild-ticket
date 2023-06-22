import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { GET_RESTAURANT_TYPES } from "../../../types/DataTypes";
import SVGIconEdit from "../../SVG/SVGIconEdit/SVGIconEdit";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";

export default function DashboardRestaurantListTab({
  restaurants,
  isClickable,
  editRestaurantForm,
  confirmDelete,
}: 
{
  restaurants: any;
  isClickable: boolean;
  editRestaurantForm: any;
  confirmDelete: (restaurant: GET_RESTAURANT_TYPES) => Promise<void>;
}) {
  const actionButton = (restaurant: GET_RESTAURANT_TYPES) => {
    return (
      <div className="ListTabBodyRowActionsButtonContainer">
        <SVGIconEdit
          onClick={async () => {
            editRestaurantForm(restaurant);
          }}
          isClickable={isClickable}
        />
        <SVGIconDelete
          onClick={async () => {
            await confirmDelete(restaurant);
          }}
          isClickable={isClickable}
        />
      </div>
    );
  };

  const imageBodyTemplate = (restaurant: any) => {
    return restaurant.picture ? (
      <img
        className="restaurant-logo"
        src={restaurant.picture}
        alt={restaurant.name}
      />
    ) : (
      "Image indisponible"
    );
  };

  const [filters] = useState<DataTableFilterMeta>({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    picture: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pole: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <div className="card" style={{ width: "100%" }}>
      <DataTable
        value={restaurants}
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
          header="Logo"
          style={{ flex: "0 0 4rem", minWidth: "10rem" }}
          body={imageBodyTemplate}
        ></Column>
        <Column
          field="pole.name"
          header="Pôle"
          filter
          filterPlaceholder="Pôle"
          style={{ minWidth: "10rem" }}
          sortable
        ></Column>
        <Column
          header="Actions"
          style={{ flex: "0 0 4rem", minWidth: "10rem" }}
          body={(restaurant: GET_RESTAURANT_TYPES) => actionButton(restaurant)}
        ></Column>
      </DataTable>
    </div>
  );
}
