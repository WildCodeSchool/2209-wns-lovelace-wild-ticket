import { waitingTime } from "../../../services/DateService";
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";
import "./DashboardTicketListTab.scss";

export default function DashboardTicketListTab({
  dataHead,
  dataTickets,
  isLoading,
}: {
  dataHead: string[];
  dataTickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  isLoading: any;
}) {
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <table className="ListTab">
      <thead className="ListTabHeader">
        <tr className="ListTabHeaderRow">
          {dataHead.map((headContent) => (
            <th key={ headContent }>{ headContent }</th>
          ))}
        </tr>
      </thead>
      <tbody className="ListTabBody">
        {dataTickets &&
          dataTickets
            .filter((ticket) => ticket.placedAt === null)
            .map((ticket) => (
              <tr key={ticket.id} className="ListTabBodyRow">
                <td>{ticket.number}</td>
                <td>{ticket.name}</td>
                <td>{ticket.seats}</td>
                <td>{waitingTime(ticket.createdAt)}</td>
                <td>TO DO</td>
                <td>TO DO</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
