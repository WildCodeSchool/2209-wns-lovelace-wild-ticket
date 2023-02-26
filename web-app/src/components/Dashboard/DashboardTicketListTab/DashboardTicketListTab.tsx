import { addMinutesToDate, waitingTime } from "../../../services/DateService";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import DashboardTicketListStatus from "./DashboardTicketListStatus/DashboardTicketListStatus";
import "./DashboardTicketListTab.scss";

export default function DashboardTicketListTab({
  dataHead,
  tickets,
  tables,
  isLoading,
}: {
  dataHead: string[];
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  tables: GET_TABLES_BY_RESTAURANT_TYPES;
  isLoading: boolean;
}) {
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <table className="ListTab">
      <thead className="ListTabHeader">
        <tr className="ListTabHeaderRow">
          {dataHead.map((headContent) => (
            <th key={headContent}>{headContent}</th>
          ))}
        </tr>
      </thead>
      <tbody className="ListTabBody">
        <tr>
          <td
            colSpan={6}
            style={{ textAlign: "center", backgroundColor: "lightgrey" }}
          >
            Tickets non placés
          </td>
        </tr>
        {tickets &&
          tickets
            .filter(
              (ticket) =>
                ticket.placedAt === null &&
                ((ticket.deliveredAt !== null &&
                  addMinutesToDate(new Date(ticket.closedAt), 1) > new Date())
                  || ticket.closedAt === null)
            )
            .sort((a, b) => a.number - b.number)
            .map((ticket) => (
              <tr key={ticket.number} className="ListTabBodyRow">
                <td>{ticket.number}</td>
                <td>{ticket.name}</td>
                <td>{ticket.seats}</td>
                <td>{waitingTime(ticket.createdAt)}</td>
                <td>
                  <DashboardTicketListStatus
                    ticket={ticket}
                    tables={tables}
                  />
                </td>
                <td>TO DO</td>
              </tr>
            ))}
        <tr>
          <td
            colSpan={6}
            style={{ textAlign: "center", backgroundColor: "lightgrey" }}
          >
            Tickets Placés
          </td>
        </tr>
        {tickets &&
          tickets
            .filter(
              (ticket) =>
                ticket.deliveredAt !== null &&
                ticket.placedAt !== null &&
                new Date(ticket.closedAt) > addMinutesToDate(new Date(), 5)
            )
            .sort((a, b) => a.number - b.number)
            .map((ticket) => (
              <tr key={ticket.number} className="ListTabBodyRow">
                <td>{ticket.number}</td>
                <td>{ticket.name}</td>
                <td>{ticket.seats}</td>
                <td>-</td>
                <td>
                  <DashboardTicketListStatus
                    ticket={ticket}
                    tables={tables}
                  />
                </td>
                <td>Cloture</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
