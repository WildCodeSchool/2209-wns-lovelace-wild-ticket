import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  UpdateTableMutation,
  UpdateTableMutationVariables,
} from "../../../gql/graphql";
import { UPDATE_TABLE } from "../../../queries/Queries";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";

import "./ModalEditTable.scss";

const ModalEditTable = ({ tableId }: { tableId: string }) => {
  const [editNumber, setEditNumber] = useState<number>(1);
  const [editSeats, setEditSeats] = useState<number>(2);

  const showHideClassName = show ? "edit-table-modal display-block" : "edit-table-modal display-none";

  console.log('get table id on modal edit table: ' + tableId)

  const [updateTable] = useMutation<
    UpdateTableMutation,
    UpdateTableMutationVariables
  >(UPDATE_TABLE);

  const submitEditTableForm = async () => {
    try {
      await updateTable({
        variables: {
          updateTableId: tableId,
          capacity: editSeats,
          number: editNumber,
        },
      });
      toast.success(`Vous avez modifié une table avec succès.`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="edit-table-modal">
      <form className="edit-table-form">
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
              setEditNumber(event.target.valueAsNumber);
            }}
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
              setEditSeats(event.target.valueAsNumber);
            }}
          />
        </div>
        <button className="edit-table-form-button" onClick={submitEditTableForm}>Modifier</button>
      </form>
    </div>
  );
};

export default ModalEditTable;
