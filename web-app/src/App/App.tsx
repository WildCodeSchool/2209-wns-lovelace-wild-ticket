import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* PATHS */
import {
  HOME_PATH,
  SIGN_IN_PATH,
  FORGOT_PASSWORD_PATH,
  DASHBOARD_HOME,
  DASHBOARD_OPTIONS,
  DASHBOARD_POLE,
  DASHBOARD_RESTAURANT,
  DASHBOARD_STATS,
  DASHBOARD_TABLE,
  DASHBOARD_TICKET,
  DASHBOARD_USER,
} from "../pages/paths";

/* PAGES */
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import SignIn from "../pages/SignIn/SignIn";
import ForgotPassword from "../pages/SignIn/ForgotPassword";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import DashboardRestaurant from "../pages/Dashboard/DashboardRestaurant/DashboardRestaurant";
import DashboardPole from "../pages/Dashboard/DashboardPole/DashboardPole";
import DashboardUser from "../pages/Dashboard/DashboardUser/DashboardUser";
import DashboardTicket from "../pages/Dashboard/DashboardTicket/DashboardTicket";
import DashboardTable from "../pages/Dashboard/DashboardTable/DashboardTable";
import DashboardStats from "../pages/Dashboard/DashboardStats/DashboardStats";
import DashboardOptions from "../pages/Dashboard/DashboardOptions/DashboardOptions";

/* COMPONENTS */
import SideBar from "../components/Sidebar/Sidebar";
import Protected from "../components/Protected/Protected";

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
            <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
            <Route
              path={DASHBOARD_HOME}
              element={
                <Protected>
                  <DashboardHome />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_RESTAURANT}
              element={
                <Protected>
                  <DashboardRestaurant />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_POLE}
              element={
                <Protected>
                  <DashboardPole />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_USER}
              element={
                <Protected>
                  <DashboardUser />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_TICKET}
              element={
                <Protected>
                  <DashboardTicket />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_TABLE}
              element={
                <Protected>
                  <DashboardTable />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_STATS}
              element={
                <Protected>
                  <DashboardStats />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_OPTIONS}
              element={
                <Protected>
                  <DashboardOptions />
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
