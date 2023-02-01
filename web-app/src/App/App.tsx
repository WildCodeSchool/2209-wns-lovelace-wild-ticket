import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyProfileQuery } from "../gql/graphql";

import Home from "../pages/Home/Home";
import { HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH, FORGOT_PASSWORD_PATH } from "../pages/paths";
import SignIn from "../pages/SignIn/SignIn";
import ForgotPassword from "../pages/SignIn/ForgotPassword";
import SignUp from "../pages/SignUp/SignUp";

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      email
    }
  }
`;

function App() {
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE);

  return (
    <>
      <header>
        <div>
          <h1>
            <Link to={HOME_PATH}>R'Ticket</Link>
          </h1>
          {data?.myProfile ? (
            <i>{data?.myProfile.email}</i>
          ) : (
            <nav>
              <Link to={SIGN_UP_PATH}>Inscription</Link>
              {" | "}
              <Link to={SIGN_IN_PATH}>Connexion</Link>
              {" | "}
              <Link to={FORGOT_PASSWORD_PATH}>ForgotPassword</Link>
            </nav>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={SIGN_IN_PATH} element={<SignIn onSuccess={refetch} />} />
          <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
        </Routes>
      </main>
      <footer>
        <div></div>
      </footer>
      <ToastContainer />
    </>
  );
}

export default App;
