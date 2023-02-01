import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import SignIn from "../pages/SignIn/SignIn";
import Protected from "../components/Protected/Protected";

import { DASHBOARD_HOME, HOME_PATH, SIGN_IN_PATH } from "../pages/paths";
import SideBar from "../components/Sidebar/Sidebar";

function App() {
  const location = useLocation();

  return (
    <>
      <main>
        {location.pathname.includes(DASHBOARD_HOME) && <SideBar />}
        <>
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={SIGN_IN_PATH} element={<SignIn />} />
            <Route
              path={DASHBOARD_HOME}
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
