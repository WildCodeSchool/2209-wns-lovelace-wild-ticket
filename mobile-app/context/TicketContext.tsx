import { createContext, Dispatch, SetStateAction, useState } from "react";

type TicketContextType = {
  selectedId: number;
  setSelectedId: Dispatch<SetStateAction<number>>;
  isActive: any;
  setIsActive: any;
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  ticketNumber: number;
  setTicketNumber: Dispatch<SetStateAction<number>>;
  initialState: () => void;
};

export const TicketContext = createContext<TicketContextType | null>(null);

export function ContextProvider({ children }: any) {
  const [selectedId, setSelectedId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isActive, setIsActive] = useState(0);
  const [ticketNumber, setTicketNumber] = useState(0);

  const initialState = () => {
    setSelectedId(0);
    setIsDisabled(true);
    setIsActive(0);
    setTicketNumber(0);
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
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
