import { useContext, useState } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import "./DashboardRestaurant.scss";
import { GET_RESTAURANTS_TYPES } from "../../../types/DataTypes";
import { useQuery } from "@apollo/client";
import { GetRestaurantsQuery } from "../../../gql/graphql";
import { GET_RESTAURANTS } from "../../../queries/Queries";

const DashboardRestaurant = () => {
  const appContext = useContext(AppContext);
  const [restaurants, setRestaurants] = useState<GET_RESTAURANTS_TYPES>(null);

  const { loading, refetch } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.getRestaurants) {
        setRestaurants(data.getRestaurants);
      }
    },
  });

  return (
    <section className="DashboardRestaurantSection">
      <header className="DashboardRestaurantHeader">
        <h1>Liste des Pôles</h1>
      </header>
      <main className="DashboardRestaurantList">
        {
          <table className="ListTab">
            <thead className="ListTabHeader">
              <tr className="ListTabHeaderRow">
                <td>Nom</td>
                <td>Pôle</td>
              </tr>
            </thead>
            <tbody className="ListTabBody">
              {restaurants &&
                restaurants.map((restaurant) => (
                  <tr className="ListTabBodyRow">
                    <td>{restaurant.name}</td>
                    <td>{restaurant.pole?.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        }
      </main>
      <footer className="DashboardRestaurantFooter"></footer>
    </section>
  );
};

export default DashboardRestaurant;
