import React, { Dispatch, SetStateAction} from "react";

const ModalEditTable = ({
  tableNumber,
  tableCapacity,
  setTableNumber,
  setTableSeat,
  submitEdit
}: {
  tableNumber: number | null,
  tableCapacity : number | null,
  setTableNumber: Dispatch<SetStateAction<number | null>>,
  setTableSeat: Dispatch<SetStateAction<number | null>>
  submitEdit : () => void
}) => {
 
  console.log(3333, tableNumber);
  console.log(2222, tableCapacity);


  return (
    <div>
      <form className="edit-table-form" onSubmit={submitEdit}>
        <div className="edit-table-form-input">
          <label htmlFor="number">N° de table</label>
          <input
            type="text"
            required
            id="number"
            name="number"
              value={tableNumber as number}
            onChange={(event) => {
              setTableNumber(event.target.valueAsNumber);
            }}
          />
        </div>
        
        <div className="edit-table-form-input">
          <label htmlFor="seats">Capacité</label>
        <input
            type="text"
            required
            id="seats"
            name="seats"
            value={tableCapacity ? tableCapacity : 0}
            onChange={(event) => {
              setTableSeat(event.target.valueAsNumber);
            }}
          />
          
        </div>
        <button>Valider</button>
      </form>
    </div>
  );
};

export default ModalEditTable;
