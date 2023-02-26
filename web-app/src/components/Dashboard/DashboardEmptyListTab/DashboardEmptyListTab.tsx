/* Modify "empty" word to requested category */
import "./DashboardEmptyListTab.scss";

export default function DashboardEmptyListTab() {
  return (
    <table className="ListTab">
      <thead className="ListTabHeader">
        <tr className="ListTabHeaderRow">
          <th>Option 1</th>
          <th>Option 2</th>
          <th>Option 3</th>
          <th>Option 4</th>
          <th>Option 5</th>
          <th>Option 6</th>
        </tr>
      </thead>
      <tbody className="ListTabBody">
        <tr className="ListTabBodyRow">
          <td>Résultat 1</td>
          <td>Résultat 2</td>
          <td>Résultat 3</td>
          <td>Résultat 4</td>
          <td>Résultat 5</td>
          <td>Résultat 6</td>
        </tr>
      </tbody>
    </table>
  );
}
