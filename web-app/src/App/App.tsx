import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyProfileQuery } from "../gql/graphql";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import { DASHBOARD_HOME, HOME_PATH, SIGN_IN_PATH } from "../pages/paths";
import SignIn from "../pages/SignIn/SignIn";
import Protected from "../components/Protected/Protected";

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      email
      role
      poles {
        id
        name
      }
      restaurant {
        id
        name
      }
    }
  }
`;

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const { refetch } = useQuery<MyProfileQuery>(MY_PROFILE, {
    onCompleted: (data) => {
      if (data.myProfile) {
        setIsUserAuthenticated(true);
        setUser(data.myProfile);
      }
    },
    onError: () => {
      setIsUserAuthenticated(false);
    },
  });

  return (
    <>
      <main>
        <Routes>
          <Route
            path={HOME_PATH}
            element={<Home isUserAuth={isUserAuthenticated} />}
          />
          <Route path={SIGN_IN_PATH} element={<SignIn onSuccess={refetch} />} />
          <Route
            path={DASHBOARD_HOME}
            element={
              <Protected userData={user}>
                <Dashboard userData={user} onSuccess={refetch} />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
