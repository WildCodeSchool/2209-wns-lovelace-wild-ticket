import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import {
  CreateWilderMutation,
  CreateWilderMutationVariables,
} from "../../gql/graphql";

import { SectionTitle } from "../../styles/base-styles";
import { getErrorMessage } from "../../utils";

const CREATE_WILDER = gql`
  mutation CreateWilder($firstName: String!, $lastName: String!) {
    createWilder(firstName: $firstName, lastName: $lastName) {
      id
      firstName
    }
  }
`;

const CreateWilder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [createWilder, { loading }] = useMutation<
    CreateWilderMutation,
    CreateWilderMutationVariables
  >(CREATE_WILDER);

  const submit = async () => {
    try {
      await createWilder({ variables: { firstName, lastName } });
      toast.success(`Wilder ${firstName} ${lastName} créé avec succès.`);
      setFirstName("");
      setLastName("");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <SectionTitle>Ajouter un nouveau Wilder</SectionTitle>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}
      >
        <label>
          Prénom
          <br />
          <input
            type="text"
            required
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Nom
          <br />
          <input
            type="text"
            required
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        <br />
        <button disabled={loading}>{loading ? <Loader /> : "Valider"}</button>
      </form>
    </>
  );
};

export default CreateWilder;
