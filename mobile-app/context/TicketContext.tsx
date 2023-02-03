import { createContext, SetStateAction, useState } from "react";

type TicketContextType = {
  selectedId: any
  setSelectedId: any
};

export const TicketContext = createContext<TicketContextType | null>(null);

export function ContextProvider({ children }: any) {
  const [selectedId, setSelectedId] = useState<string>();
 console.log(selectedId);
  
 return (
    <TicketContext.Provider
      value={{ selectedId, setSelectedId }}
    >
      {children}
    </TicketContext.Provider>
  );
}