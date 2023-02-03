import { createContext, SetStateAction, useState } from "react";

type TicketContextType = {
  selectedId: any
  setSelectedId: any
  isDisabled: any;
  setIsDisabled: any;
};

export const TicketContext = createContext<TicketContextType | null>(null);

export function ContextProvider({ children }: any) {
  const [selectedId, setSelectedId] = useState<string>();
  const [isDisabled, setIsDisabled] = useState(true);
  
 return (
    <TicketContext.Provider
      value={{ selectedId, setSelectedId, isDisabled, setIsDisabled}}
    >
      {children}
    </TicketContext.Provider>
  );
}