import { useState, useEffect, useContext } from "react";
import { DataTable, DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
import { useQuery } from "@apollo/client";
import { AppContext } from "../../../context/AppContext";
import {
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables,
} from "../../../gql/graphql";
import { GET_TABLES_BY_RESTAURANT } from "../../../queries/Queries";
import { GET_TABLES_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";

import SVGIconEdit from "../../SVG/SVGIconEdit/SVGIconEdit";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";
import "./ListTables.scss";

const ListTables = ({
  propTableId,
  editModal,
  deleteModal,
}: {
  propTableId: (tableId: string) => Promise<void>;
  editModal: any;
  deleteModal: any;
}) => {
  const appContext = useContext(AppContext);
  const restaurantId = appContext?.userData.restaurant.id;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isClickable, setIsClickable] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seats, setSeats] = useState<number | null>(null);
  const [tables, setTables] = useState<
    GET_TABLES_BY_RESTAURANT_TYPES | undefined
  >(undefined);

  const { refetch: tablesRefetch } = useQuery<
    TablesByRestaurantQuery,
    TablesByRestaurantQueryVariables
  >(GET_TABLES_BY_RESTAURANT, {
    skip: restaurantId === undefined,
    variables: {
      restaurantId: restaurantId as string,
      capacity: seats,
    },
    onCompleted: (data) => {
      if (data.TablesByRestaurant) {
        setTables(data.TablesByRestaurant);
      }
    },
  });

  useEffect(() => {
    tablesRefetch();
  }, [tablesRefetch]);

  const actionButton = (table: any) => {
    return (
      <div className="ListTabBodyRowActionsButtonContainer">
        <SVGIconEdit
          onClick={async () => {
            editModal(true);
            await propTableId(table);
          }}
          isClickable={isClickable}
        />
        <SVGIconDelete
          onClick={async () => {
            deleteModal(true);
            await propTableId(table);
          }}
          isClickable={isClickable}
        />
      </div>
    );
  };

  return (
    <div className="card DashboardTableListContainer">
      <DataTable
        paginator
        rows={7}
        sortField="number"
        sortOrder={1}
        value={tables as DataTableValueArray}
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="number"
          header="N° de table"
          sortable
          style={{ textAlign: "center", height: "60px" }}
        ></Column>
        <Column
          field="capacity"
          header="Couverts"
          sortable
          style={{ textAlign: "center" }}
        ></Column>
        <Column
          header="Action"
          body={(table: GET_TABLES_BY_RESTAURANT_TYPES) => actionButton(table)}
          style={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ListTables;
