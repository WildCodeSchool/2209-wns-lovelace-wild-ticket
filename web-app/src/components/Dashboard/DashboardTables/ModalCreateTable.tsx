import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateTableMutation,
  CreateTableMutationVariables,
} from "../../../gql/graphql";
import { CREATE_TABLE } from "../../../queries/Queries";
import { AppContext } from "../../../context/AppContext";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";

const ModalCreateTable = ({ setShowModal }: { setShowModal: any }) => {
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
    <div className="add-table-modal">
      <form className="add-table-form">
        <h2>Ajout d'une table</h2>
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
        <div className="form-buttons">
          <button
            className="add-table-form-button"
            onClick={submitAddTableForm}
          >
            Ajouter
          </button>
          <button
            className="delete-table-form-button-close"
            onClick={() => setShowModal(false)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCreateTable;
