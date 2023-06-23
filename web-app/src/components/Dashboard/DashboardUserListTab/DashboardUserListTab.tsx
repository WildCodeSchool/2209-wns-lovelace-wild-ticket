import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { GET_USER_TYPES } from "../../../types/DataTypes";
import SVGIconEdit from "../../SVG/SVGIconEdit/SVGIconEdit";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import DateService from "../../../services/DateService";

export default function DashboardUserListTab({
  users,
  isClickable,
  editUserForm,
  confirmDelete,
}: {
  users: any;
  isClickable: boolean;
  editUserForm: any;
  confirmDelete: (user: GET_USER_TYPES) => Promise<void>;
}) {
  const actionButton = (user: GET_USER_TYPES) => {
    return (
      <div
        style={{ height: "50px" }}
        className="ListTabBodyRowActionsButtonContainer"
      >
        {(user?.role as string) !== "ROLE_SUPER_ADMIN" && (
          <>
            <SVGIconEdit
              onClick={async () => {
                editUserForm(user);
              }}
              isClickable={isClickable}
            />

            <SVGIconDelete
              onClick={async () => {
                await confirmDelete(user);
              }}
              isClickable={isClickable}
            />
          </>
        )}
      </div>
    );
  };

  console.log(users);

  const [filters] = useState<DataTableFilterMeta>({
    firstname: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastname: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <div className="card" style={{ width: "100%" }}>
      <DataTable
        value={users}
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
          field="firstname"
          header="Prénom"
          filter
          filterPlaceholder="Prénom"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="lastname"
          header="Nom"
          filter
          filterPlaceholder="Nom"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Email"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="role"
          header="Rôle"
          filterPlaceholder="Rôle"
          style={{ minWidth: "10rem" }}
          body={(user) =>
            user.role === "ROLE_SUPER_ADMIN"
              ? "Super Administrateur"
              : user.role === "ROLE_ADMIN"
              ? "Administrateur"
              : "Restaurateur"
          }
        ></Column>
        <Column
          field="restaurant.name"
          header="Restaurant"
          filterPlaceholder="Restaurant"
          style={{ minWidth: "10rem" }}
          body={(user) =>
            user.role === "ROLE_RESTAURANT"
              ? user.restaurant?.pole.name + " - " + user.restaurant?.name
              : "-"
          }
        ></Column>
        <Column
          field="createdAt"
          header="Crée le"
          filterPlaceholder="Crée le"
          style={{ minWidth: "10rem" }}
          body={(user) =>
            DateService.changeDateToStringFormatWithDateAndHours(user.createdAt)
          }
        ></Column>
        <Column
          header="Actions"
          style={{ flex: "0 0 4rem", minWidth: "10rem" }}
          body={(user: GET_USER_TYPES) => actionButton(user)}
        ></Column>
      </DataTable>
    </div>
  );
}
