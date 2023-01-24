import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { HOME_PATH } from "../paths";
import "react-toastify/dist/ReactToastify.css";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SignIn = ({ onSuccess }: { onSuccess: () => {} }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { loading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signIn({
        variables: { email, password },
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
      <h1>Connexion</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          console.log(email);
          console.log(password);
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
            id="email"
            name="email"
            value={email}
            onChange={(event) => {
              setemail(event.target.value);
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
