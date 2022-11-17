import React from "react";
import { Link } from "react-router-dom";

import { CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import Loader from "../../components/Loader";
import { SectionTitle } from "../../styles/base-styles";
import { CREATE_WILDER_PATH } from "../paths";
import { useQuery, gql } from "@apollo/client";
import { GetWildersQuery } from "../../gql/graphql";

const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      firstName
      lastName
      skills {
        id
        skillName
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error, refetch } = useQuery<GetWildersQuery>(
    GET_WILDERS,
    { fetchPolicy: "cache-and-network" }
  );

  const renderMainContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.wilders?.length) {
      return "Aucun wilder à afficher.";
    }
    return (
      <CardRow>
        {data.wilders.map((wilder) => (
          <Wilder
            key={wilder.id}
            id={wilder.id}
            firstName={wilder.firstName}
            lastName={wilder.lastName}
            skills={wilder.skills}
            onDelete={refetch}
          />
        ))}
      </CardRow>
    );
  };

  return (
    <>
      <SectionTitle>Wilders</SectionTitle>
      <Link to={CREATE_WILDER_PATH}>Ajouter un nouveau Wilder</Link>
      <br />
      <br />
      {renderMainContent()}
    </>
  );
};

export default Home;
