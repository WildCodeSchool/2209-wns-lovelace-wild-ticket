import { waitingTime } from "../../../services/DateService";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import DashboardTicketListStatus from "./DashboardTicketListStatus/DashboardTicketListStatus";
import "./DashboardTicketListTab.scss";

export default function DashboardTicketListTab({
  dataHead,
  dataTickets,
  dataTables,
  isLoading,
}: {
  dataHead: string[];
  dataTickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  dataTables: GET_TABLES_BY_RESTAURANT_TYPES;
  isLoading: any;
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
        {dataTickets &&
          dataTickets
            .filter((ticket) => ticket.placedAt === null)
            .sort((a, b) => a.number - b.number)
            .map((ticket) => (
              <tr key={ticket.number} className="ListTabBodyRow">
                <td>{ticket.number}</td>
                <td>{ticket.name}</td>
                <td>{ticket.seats}</td>
                <td>{waitingTime(ticket.createdAt)}</td>
                <td>
                  <DashboardTicketListStatus
                    dataTickets={ticket}
                    tables={dataTables}
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
        {dataTickets &&
          dataTickets
            .filter(
              (ticket) =>
                ticket.closedAt !== null &&
                new Date(ticket.closedAt) > new Date()
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
                    dataTickets={ticket}
                    tables={dataTables}
                  />
                </td>
                <td>Cloture</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
