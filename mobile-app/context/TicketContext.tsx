import { createContext, Dispatch, SetStateAction, useState } from "react";

type TicketContextType = {
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  isActive: any;
  setIsActive: any;
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  ticketNumber: number;
  setTicketNumber: Dispatch<SetStateAction<number>>;
  isAvailableTable: boolean;
  setIsAvailableTable: Dispatch<SetStateAction<boolean>>;
  initialState: () => void;
};

export const TicketContext = createContext<TicketContextType | null>(null);

export function ContextProvider({ children }: any) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isActive, setIsActive] = useState(0);
  const [ticketNumber, setTicketNumber] = useState(0);
  const [isAvailableTable, setIsAvailableTable] = useState(false);

  const initialState = () => {
    setSelectedId(null);
    setIsDisabled(true);
    setIsActive(0);
    setTicketNumber(0);
    setIsAvailableTable(false);
  };

  return (
    <TicketContext.Provider
      value={{
        selectedId,
        setSelectedId,
        isDisabled,
        setIsDisabled,
        initialState,
        isActive,
        setIsActive,
        ticketNumber,
        setTicketNumber,
        isAvailableTable,
        setIsAvailableTable,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
