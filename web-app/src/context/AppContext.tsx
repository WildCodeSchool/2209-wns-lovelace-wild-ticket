import { useQuery } from "@apollo/client";
import { createContext, useState } from "react";
import {
  BIG_LOGO_DARK_THEME,
  BIG_LOGO_LIGHT_THEME,
} from "../constants/Constants";
import {
  MyProfileQuery,
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables,
  TicketsByRestaurantQuery,
  TicketsByRestaurantQueryVariables,
} from "../gql/graphql";
import {
  GET_TABLES_BY_RESTAURANT,
  GET_TICKETS_BY_RESTAURANT,
  MY_PROFILE,
} from "../queries/Queries";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../types/DataTypes";

type AppContextType = {
  userData: any;
  userSVGColorScheme: string;
  isAuthenticated: boolean;
  loading: boolean;
  refetch: () => {};
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  ticketsLoading: boolean;
  ticketsRefetch: () => {};
  tables: GET_TABLES_BY_RESTAURANT_TYPES;
  tablesRefetch: () => {};
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: any) {
  const [isAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [restaurantId, setRestaurantId] = useState<string | undefined>(
    undefined
  );

  const userSVGColorScheme = window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? BIG_LOGO_LIGHT_THEME
    : BIG_LOGO_DARK_THEME;

  /**
   * ************** MY_PROFILE ******************
   */
  const { loading, refetch } = useQuery<MyProfileQuery>(MY_PROFILE, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.myProfile) {
        setIsUserAuthenticated(true);
        setUserData(data.myProfile);
        setRestaurantId(data.myProfile.restaurant?.id as string);
      }
    },
    onError: () => {
      setIsUserAuthenticated(false);
    },
  });

  /**
   * ************ TICKETS BY RESTAURANT ***********************
   */
  const [tickets, setTickets] = useState<GET_TICKETS_BY_RESTAURANT_TYPES>(null);

  const { loading: ticketsLoading, refetch: ticketsRefetch } = useQuery<
    TicketsByRestaurantQuery,
    TicketsByRestaurantQueryVariables
  >(GET_TICKETS_BY_RESTAURANT, {
    skip: restaurantId === undefined,
    notifyOnNetworkStatusChange: true,
    variables: { ticketsByRestaurantId: restaurantId as string },
    onCompleted: (data) => {
      if (data.TicketsByRestaurant) {
        setTickets(data.TicketsByRestaurant);
      }
    },
  });

  /**
   * ***************** TABLES BY RESTAURANT *********************
   */
  const [tables, setTables] = useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);

  const { refetch: tablesRefetch } = useQuery<
    TablesByRestaurantQuery,
    TablesByRestaurantQueryVariables
  >(GET_TABLES_BY_RESTAURANT, {
    skip: restaurantId === undefined,
    notifyOnNetworkStatusChange: true,
    variables: { tablesByRestaurantId: restaurantId as string },
    onCompleted: (data) => {
      if (data.TablesByRestaurant) {
        setTables(data.TablesByRestaurant);
      }
    },
  });

  return (
    <AppContext.Provider
      value={{
        userData,
        userSVGColorScheme,
        isAuthenticated,
        loading,
        refetch,
        tickets,
        ticketsLoading,
        ticketsRefetch,
        tables,
        tablesRefetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
