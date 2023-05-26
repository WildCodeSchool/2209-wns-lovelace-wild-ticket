import React, { useState, useEffect, useContext } from "react";
import { DataTable, DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
import { GET_TABLES_BY_RESTAURANT } from "../../../queries/Queries";
import { useQuery } from "@apollo/client";
import {
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables,
} from "../../../gql/graphql";
import { GET_TABLES_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";
import { AppContext } from "../../../context/AppContext";

import SVGIconEdit from "../../SVG/SVGIconEdit/SVGIconEdit";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";

const ListTables = ({propTableId} : {propTableId:  (tableId: string) => Promise<void> }) => {
  const appContext = useContext(AppContext);
  const restaurantId = appContext?.userData.restaurant.id;

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [seats, setSeats] = useState<number | null>(null);
  const [tables, setTables] = useState<
    GET_TABLES_BY_RESTAURANT_TYPES | undefined
  >(undefined);

  console.log(tables);

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
            openModal();
            await propTableId(table.id as string)
          }}
          isClickable={isClickable}
        />
        <SVGIconDelete onClick={async () => {}} isClickable={isClickable} />
      </div>
    );
  };

  return (
    <div>
      <DataTable
        tableStyle={{ minWidth: "50rem" }}
        value={tables as DataTableValueArray}
      > 
        <Column field="id" header="Test id"></Column>
        <Column field="number" header="N° de table"></Column>
        <Column field="capacity" header="Couverts"></Column>
        <Column
          header="Action"
          body={(table: GET_TABLES_BY_RESTAURANT_TYPES) => actionButton(table)}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ListTables;
