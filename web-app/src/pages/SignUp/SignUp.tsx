import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { SignUpMutation, SignUpMutationVariables } from "../../gql/graphql";
import { SectionTitle } from "../../styles/base-styles";
import { getErrorMessage } from "../../utils";
import { SIGN_IN_PATH } from "../paths";

const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      password: $password
    ) {
      id
      emailAddress
    }
  }
`;

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [signUp, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signUp({
        variables: { firstName, lastName, emailAddress, password },
      });
      toast.success(
        `Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`
      );
      navigate(SIGN_IN_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <SectionTitle>Inscription</SectionTitle>
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
        <label>
          Adresse email
          <br />
          <input
            type="email"
            required
            autoComplete="email"
            id="emailAddress"
            name="emailAddress"
            value={emailAddress}
            onChange={(event) => {
              setEmailAddress(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Mot de passe
          <br />
          <input
            type="password"
            required
            autoComplete="new-password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <br />
        <button disabled={loading}>{loading ? <Loader /> : "Valider"}</button>
      </form>
    </>
  );
};

export default SignUp;
