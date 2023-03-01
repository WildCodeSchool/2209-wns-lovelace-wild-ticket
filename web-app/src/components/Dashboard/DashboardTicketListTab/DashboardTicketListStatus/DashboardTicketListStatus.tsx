import {
  MAX_DELIVERED_TICKET_DELAY,
  TICKET_DISAPPEAR_DELAY,
} from "../../../../constants/Constants";
import { addMinutesToDate } from "../../../../services/DateService";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKET_BY_RESTAURANT_TYPES,
} from "../../../../types/DataTypes";
import SVGIconAlertTicket from "../../../SVG/SVGIconAlertTicket/SVGIconAlertTicket";
import SVGIconDeliveredTicket from "../../../SVG/SVGIconDeliveredTicket/SvgIconDeliveredTicket";
import SVGIconPlacedTicket from "../../../SVG/SVGIconPlacedTicket/SVGIconPlacedTicket";
import SVGIconWaitingTicket from "../../../SVG/SVGIconWaitingTicket/SVGIconWaitingTicket";
import "./DashboardTicketListStatus.scss";

export default function DashboardTicketListStatus({
  ticket,
  tables,
}: {
  ticket: GET_TICKET_BY_RESTAURANT_TYPES;
  tables: GET_TABLES_BY_RESTAURANT_TYPES;
}) {
  const filteredTables: GET_TABLES_BY_RESTAURANT_TYPES | undefined =
    tables?.filter((table) => table.capacity === ticket?.seats);

  if (
    ticket?.deliveredAt !== null &&
    ticket?.placedAt !== null &&
    new Date(ticket?.closedAt) >
      addMinutesToDate(new Date(), MAX_DELIVERED_TICKET_DELAY) &&
    new Date(ticket?.closedAt) > new Date()
  ) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconPlacedTicket />
        <p className="DashboardTicketListStatusText">
          Table {ticket?.table?.number}
        </p>
      </div>
    );
  }

  if (ticket?.deliveredAt !== null && new Date(ticket?.closedAt) > new Date()) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconDeliveredTicket />
        <p className="DashboardTicketListStatusText">
          Attendu table {ticket?.table?.number}
        </p>
      </div>
    );
  }

  if (
    ticket?.deliveredAt !== null &&
    addMinutesToDate(new Date(ticket?.closedAt), TICKET_DISAPPEAR_DELAY) >
      new Date()
  ) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconAlertTicket />
        <p className="DashboardTicketListStatusText">
          Table {ticket?.table?.number} libérée
        </p>
      </div>
    );
  }

  if (
    ticket?.placedAt === null &&
    ticket?.closedAt === null &&
    filteredTables &&
    filteredTables.length !== 0
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
