import { useContext, useState } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import "./DashboardPole.scss";
import { GET_POLES_TYPES } from "../../../types/DataTypes";
import { useQuery } from "@apollo/client";
import { PolesQuery } from "../../../gql/graphql";
import { GET_POLES } from "../../../queries/Queries";

const DashboardPole = () => {
  const appContext = useContext(AppContext);
  const [poles, setPoles] = useState<GET_POLES_TYPES>(null);

  const { loading, refetch } = useQuery<PolesQuery>(GET_POLES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.poles) {
        setPoles(data.poles);
      }
    },
  });

  return (
    <section className="DashboardPoleSection">
      <header className="DashboardPoleHeader">
        <h1>Liste des Pôles</h1>
      </header>
      <main className="DashboardPoleList">
        <table className="ListTab">
          <thead className="ListTabHeader">
            <tr className="ListTabHeaderRow">
              <td>Nom</td>
              <td>Adresse</td>
              <td>Code Postale</td>
              <td>Ville</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody className="ListTabBody">
            {poles &&
              poles.map((pole) => (
                <tr className="ListTabBodyRow">
                  <td>{pole.name}</td>
                  <td>{pole.address}</td>
                  <td>{pole.zipCode}</td>
                  <td>{pole.city}</td>
                  <td>{pole.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
      <footer className="DashboardPoleFooter"></footer>
    </section>
  );
};

export default DashboardPole;
