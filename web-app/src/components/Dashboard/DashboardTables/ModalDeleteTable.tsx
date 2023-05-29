import { useMutation } from '@apollo/client';
import React from 'react'
import { DeleteTableMutation, DeleteTableMutationVariables } from '../../../gql/graphql';
import { DELETE_TABLE } from '../../../queries/Queries';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils';

const ModalDeleteTable = ({ tableId }: { tableId: string }) => {
  const [deleteTable] = useMutation<
  DeleteTableMutation,
  DeleteTableMutationVariables
>(DELETE_TABLE);

console.log('get table id on modal delete table: ' + tableId)

const confirmDeleteTable = async () => {
  try {
    await deleteTable({ variables: { deleteTableId: tableId } });
    toast.success(`Vous avez supprimé cette table avec succès.`);
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

  return (
    <div><h2>Suppression d'une table</h2>
    <p>Etes-vous sur de vouloir supprimer cette table ?</p>
      <button onClick={confirmDeleteTable}>Supprimer</button>
      <button >Annuler</button>
    </div>
    
  )
}

export default ModalDeleteTable