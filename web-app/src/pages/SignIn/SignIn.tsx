import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";
import { SectionTitle } from "../../styles/base-styles";
import { getErrorMessage } from "../../utils";
import { HOME_PATH } from "../paths";

const SIGN_IN = gql`
  mutation SignIn($emailAddress: String!, $password: String!) {
    signIn(emailAddress: $emailAddress, password: $password) {
      id
      emailAddress
      firstName
      lastName
    }
  }
`;

const SignIn = ({ onSuccess }: { onSuccess: () => {} }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { loading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
      toast.success(`Vous vous êtes connecté avec succès.`);
      onSuccess();
      navigate(HOME_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <SectionTitle>Connexion</SectionTitle>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}
      >
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
            autoComplete="current-password"
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

export default SignIn;
