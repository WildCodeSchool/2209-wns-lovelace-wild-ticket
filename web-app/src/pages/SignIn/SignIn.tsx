import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { DASHBOARD_HOME, FORGOT_PASSWORD_PATH } from "../paths";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppContext";
import { InfinitySpin } from "react-loader-spinner";
import { SIGN_IN } from "../../queries/Queries";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const appContext = useContext(AppContext);

  const [signIn, { loading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signIn({
        variables: { email, password, rememberMe: Boolean(rememberMe) },
      });
      toast.success(`Vous vous êtes connecté avec succès.`);
      appContext?.refetch();
      navigate(DASHBOARD_HOME);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="signin-form-container">
        <h1>Connexion</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await submit();
          }}
        >
          <div className="signin-form-input">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              required
              autoComplete="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="signin-form-input">
            <label htmlFor="password">Mot de passe</label>
            <input
              data-testid="password"
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
          </div>
          <div className="signin-form-input2">
            <div className="remember-me-container">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                checked={rememberMe}
                onChange={(event) => {
                  setRememberMe(event.target.checked);
                }}
              />
              <label>Se souvenir de moi</label>
            </div>
            <Link to={FORGOT_PASSWORD_PATH}>Mot de passe oublié ?</Link>
          </div>
          <button disabled={loading}>
            {loading ? (
              <div className="loadingSpinner">
                <InfinitySpin width="100" color="#d1d5db" />
              </div>
            ) : (
              "Valider"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
