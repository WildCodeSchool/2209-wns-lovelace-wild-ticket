/* Modify "empty" word to requested category */
import "./DashboardEmptyListTab.scss";

export default function DashboardEmptyListTab() {
  return (
    <table className="ListTab">
      <thead className="ListTabHeader">
        <tr className="ListTabHeaderRow">
          <th>N° Ticket</th>
          <th>Nom</th>
          <th>Couverts</th>
          <th>Temps d'attente</th>
          <th>Statut</th>
          <th>Notification</th>
        </tr>
      </thead>
      <tbody className="ListTabBody">
        <tr className="ListTabBodyRow">
          <td>Nom</td>
          <td>N° Ticket</td>
          <td>Couverts</td>
          <td>Temps d'attente</td>
          <td>aa</td>
          <td>aaa</td>
        </tr>
      </tbody>
    </table>
  );
}
