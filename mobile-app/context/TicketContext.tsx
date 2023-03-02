import { createContext, Dispatch, SetStateAction, useState } from "react";

type TicketContextType = {
  selectedId: number;
  setSelectedId: Dispatch<SetStateAction<number>>;
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  initialState: () => void;
};

export const TicketContext = createContext<TicketContextType | null>(null);

export function ContextProvider({ children }: any) {
  const [selectedId, setSelectedId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const initialState = () => {
    setSelectedId(0);
    setIsDisabled(true);
  };

  return (
    <TicketContext.Provider
      value={{
        selectedId,
        setSelectedId,
        isDisabled,
        setIsDisabled,
        initialState,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
