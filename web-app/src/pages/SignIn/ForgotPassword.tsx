import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";



const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = () => {
    setEmailSent(true);
  };

  return (
    <>
      <div className="signin-form-container">
        <h1>ForgotPassword</h1>
        <form>
          <div className="signin-form-input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button>
            Réinitialiser le mot de passe
          </button>
          {emailSent && <p>Réinitialiser le mot de passe</p>}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
