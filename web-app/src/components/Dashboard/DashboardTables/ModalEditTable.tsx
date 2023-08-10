import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  UpdateTableMutation,
  UpdateTableMutationVariables,
} from "../../../gql/graphql";
import { UPDATE_TABLE } from "../../../queries/Queries";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";

import "./ModalEditTable.scss";

const ModalEditTable = ({
  table,
  editModal,
  refetch,
}: {
  table: any;
  editModal: any;
  refetch: any;
}) => {
  const [editNumber, setEditNumber] = useState<string>(table.number);
  const [editSeats, setEditSeats] = useState<string>(table.capacity);

  const [updateTable] = useMutation<
    UpdateTableMutation,
    UpdateTableMutationVariables
  >(UPDATE_TABLE);

  const submitEditTableForm = async (e: any) => {
    e.preventDefault();
    if (parseInt(editSeats) < 2 || parseInt(editSeats) > 8) {
      toast.error("Le nombre de couverts doit être entre 2 et 8.");
      return;
    }
    if (parseInt(editSeats) % 2 !== 0) {
      toast.error("Le nombre de couverts doit être pair.");
      return;
    }
    try {
      await updateTable({
        variables: {
          updateTableId: table.id,
          capacity: parseInt(editSeats),
          number: parseInt(editNumber),
        },
      });
      toast.success(`Vous avez modifié une table avec succès.`);
      editModal(false);
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleChangeEditNumber = (e: any) => {
    if (parseInt(e.target.value) <= 0 || isNaN(parseInt(e.target.value))) {
      setEditNumber("0");
      return;
    }

    let numberValue = parseInt(e.target.value).toString();
    setEditNumber(numberValue);
  };

  const handleChangeCapacityNumber = (e: any) => {
    if (parseInt(e.target.value) <= 0 || isNaN(parseInt(e.target.value))) {
      setEditSeats("0");
      return;
    }

    let capacityValue = parseInt(e.target.value).toString();
    setEditSeats(capacityValue);
  };

  return (
    <div className="edit-table-modal">
      <form className="edit-table-form">
        <h2>Modification d'une table</h2>
        <div className="edit-table-form-input">
          <label htmlFor="number">N° de table</label>
          <input
            type="number"
            required
            id="number"
            name="number"
            min="0"
            value={editNumber}
            onChange={(event) => {
              handleChangeEditNumber(event);
            }}
            disabled
          />
        </div>
        <div className="edit-table-form-input">
          <label htmlFor="seats">Capacité</label>
          <input
            type="number"
            required
            id="seats"
            name="seats"
            min="0"
            value={editSeats}
            onChange={(event) => {
              handleChangeCapacityNumber(event);
            }}
          />
        </div>
        <div className="form-buttons">
          <button
            className="edit-table-form-button"
            onClick={(e) => {
              submitEditTableForm(e);
            }}
          >
            Modifier
          </button>
          <button
            className="edit-table-form-button-close"
            onClick={() => editModal(false)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEditTable;
