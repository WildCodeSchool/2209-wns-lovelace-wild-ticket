import { useMutation } from "@apollo/client";
import {
  DeleteTableMutation,
  DeleteTableMutationVariables,
} from "../../../gql/graphql";
import { DELETE_TABLE } from "../../../queries/Queries";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";

import "./ModalEditTable.scss";

const ModalDeleteTable = ({
  tableId,
  deleteModal,
  refetch,
}: {
  tableId: string;
  deleteModal: any;
  refetch: any;
}) => {
  const [deleteTable] = useMutation<
    DeleteTableMutation,
    DeleteTableMutationVariables
  >(DELETE_TABLE);

  const confirmDeleteTable = async () => {
    try {
      await deleteTable({ variables: { deleteTableId: tableId } });
      toast.success(`Vous avez supprimé cette table avec succès.`);
      deleteModal(false);
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="delete-table-modal">
      <div className="delete-table-container">
        <h2>Suppression d'une table</h2>
        <p className="delete-table-text">
          Etes-vous sur de vouloir supprimer cette table ?
        </p>
        <div className="form-buttons">
          <button
            className="delete-table-form-button"
            onClick={confirmDeleteTable}
          >
            Supprimer
          </button>
          <button
            className="delete-table-form-button-close"
            onClick={() => deleteModal(false)}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteTable;
