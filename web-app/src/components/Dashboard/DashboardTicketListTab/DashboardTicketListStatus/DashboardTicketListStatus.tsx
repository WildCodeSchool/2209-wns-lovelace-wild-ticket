import { GET_TABLES_BY_RESTAURANT_TYPES } from "../../../../types/DataTypes";
import SVGIconAlertTicket from "../../../SVG/SVGIconAlertTicket/SVGIconAlertTicket";
import SVGIconPlacedTicket from "../../../SVG/SVGIconPlacedTicket/SVGIconPlacedTicket";
import SVGIconWaitingTicket from "../../../SVG/SVGIconWaitingTicket/SVGIconWaitingTicket";
import "./DashboardTicketListStatus.scss";

export default function DashboardTicketListStatus({
  dataTickets,
  tables,
}: {
  dataTickets: {
    __typename?: "Ticket" | undefined;
    id: string;
    number: number;
    name: string;
    seats: number;
    email: string;
    phoneNumber?: string | null | undefined;
    createdAt: any;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
    table?:
      | {
          __typename?: "Table" | undefined;
          number: number;
        }
      | null
      | undefined;
  } | null;
  tables: GET_TABLES_BY_RESTAURANT_TYPES;
}) {
  const filteredTables = tables?.filter(
    (table) => table.capacity === dataTickets?.seats
  );
  if (dataTickets?.placedAt === null && filteredTables?.length !== 0) {
    return (
      <>
        <div className="DashboardTicketListStatusContainer">
          <SVGIconAlertTicket />
          <p className="DashboardTicketListStatusText">Table Disponible</p>
        </div>
      </>
    );
  }
  if (dataTickets?.deliveredAt === null) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconWaitingTicket />
        <p className="DashboardTicketListStatusText">En attente</p>
      </div>
    );
  }
  return (
    <div className="DashboardTicketListStatusContainer">
      <SVGIconPlacedTicket />
      <p className="DashboardTicketListStatusText">À table</p>
    </div>
  );
}
