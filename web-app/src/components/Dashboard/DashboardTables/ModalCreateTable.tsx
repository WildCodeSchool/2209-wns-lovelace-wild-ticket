import React, { DetailedHTMLProps, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateTableMutation,
  CreateTableMutationVariables,
} from "../../../gql/graphql";
import { CREATE_TABLE } from "../../../queries/Queries";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";

const ModalCreateTable = () => {
  const appContext = useContext(AppContext);
  const restaurantId = appContext?.userData.restaurant.id;

  // Création d'une table
  const [number, setNumber] = useState<number | null>(null);
  const [seats, setSeats] = useState<number | null>(null);

  const [createTable] = useMutation<
    CreateTableMutation,
    CreateTableMutationVariables
  >(CREATE_TABLE);
  const submitAddTableForm = async () => {
    try {
      await createTable({
        variables: {
          restaurant: restaurantId as string,
          capacity: seats as number,
          number: number as number,
        },
      });
      toast.success(`Vous avez créé une table avec succès.`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <form className="add-table-form" >
        <div className="add-table-form-input">
          <label htmlFor="number">N° de table</label>
          <input
            type="number"
            required
            id="number"
            name="number"
            onChange={(event) => {
              setNumber(event.target.valueAsNumber);
            }}
          />
        </div>
        <div className="add-table-form-input">
          <label htmlFor="seats">Capacité</label>
          <input
            type="number"
            required
            id="seats"
            name="seats"
            onChange={(event) => {
              setSeats(event.target.valueAsNumber);
            }}
          />
        </div>
      </form>
      <button onClick={submitAddTableForm}>Valider</button>
    </div>
  );
};

export default ModalCreateTable;
