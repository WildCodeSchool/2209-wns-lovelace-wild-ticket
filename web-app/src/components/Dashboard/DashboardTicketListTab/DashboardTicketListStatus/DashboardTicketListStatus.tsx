import { addMinutesToDate } from "../../../../services/DateService";
import { GET_TABLES_BY_RESTAURANT_TYPES } from "../../../../types/DataTypes";
import SVGIconAlertTicket from "../../../SVG/SVGIconAlertTicket/SVGIconAlertTicket";
import SVGIconDeliveredTicket from "../../../SVG/SVGIconDeliveredTicket/SvgIconDeliveredTicket";
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

  if (
    dataTickets?.deliveredAt !== null &&
    dataTickets?.placedAt !== null &&
    new Date(dataTickets?.closedAt) > addMinutesToDate(new Date(), 5) &&
    new Date(dataTickets?.closedAt) > new Date()
  ) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconPlacedTicket />
        <p className="DashboardTicketListStatusText">Table {dataTickets?.table?.number}</p>
      </div>
    );
  }

  if (
    dataTickets?.deliveredAt !== null &&
    new Date(dataTickets?.closedAt) > new Date()
  ) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconDeliveredTicket />
        <p className="DashboardTicketListStatusText">Attendu table {dataTickets?.table?.number}</p>
      </div>
    );
  }

  if (
    dataTickets?.deliveredAt !== null &&
    addMinutesToDate(new Date(dataTickets?.closedAt), 1) > new Date()
  ) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconAlertTicket />
        <p className="DashboardTicketListStatusText">Table {dataTickets?.table?.number} libérée</p>
      </div>
    );
  }

  //TODO: Delete this when we automaticly give a table to a ticket
  if (
    dataTickets?.placedAt === null &&
    dataTickets?.closedAt === null &&
    filteredTables?.length !== 0
  ) {
    return (
      <>
        <div className="DashboardTicketListStatusContainer">
          <SVGIconAlertTicket />
          <p className="DashboardTicketListStatusText">Table Disponible</p>
        </div>
      </>
    );
  }

  return (
    <div className="DashboardTicketListStatusContainer">
      <SVGIconWaitingTicket />
      <p className="DashboardTicketListStatusText">En attente</p>
    </div>
  );
}
