import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GET_POLE_TYPES } from "../../../types/DataTypes";
import SVGIconEdit from "../../SVG/SVGIconEdit/SVGIconEdit";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";

export default function DashboardPoleListTab({
  poles,
  isClickable,
  editPoleForm,
  confirmDelete,
}: {
  poles: any;
  isClickable: boolean;
  editPoleForm: any;
  confirmDelete: (pole: GET_POLE_TYPES) => Promise<void>;
}) {
  const actionButton = (pole: GET_POLE_TYPES) => {
    return (
      <div className="ListTabBodyRowActionsButtonContainer">
        <SVGIconEdit
          onClick={async () => {
            editPoleForm(pole);
          }}
          isClickable={isClickable}
        />
        <SVGIconDelete
          onClick={async () => {
            await confirmDelete(pole);
          }}
          isClickable={isClickable}
        />
      </div>
    );
  };

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
      >
        <Column field="name" header="Nom"></Column>
        <Column field="address" header="Adresse"></Column>
        <Column field="zipCode" header="Code Postal"></Column>
        <Column field="city" header="Ville"></Column>
        <Column field="email" header="Email"></Column>
        <Column
          header="Actions"
          style={{ flex: "0 0 4rem" }}
          body={(pole: GET_POLE_TYPES) => actionButton(pole)}
        ></Column>
      </DataTable>
    </div>
  );
}
