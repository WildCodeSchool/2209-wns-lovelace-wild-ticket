import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "../pages/Home/Home";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import NotFound from "../pages/NotFound/NotFound";
import SignIn from "../pages/SignIn/SignIn";
import Protected from "../components/Protected/Protected";

import {
  DASHBOARD_HOME,
  DASHBOARD_OPTIONS,
  DASHBOARD_POLE,
  DASHBOARD_RESTAURANT,
  DASHBOARD_STATS,
  DASHBOARD_TABLE,
  DASHBOARD_TICKET,
  DASHBOARD_USER,
  HOME_PATH,
  SIGN_IN_PATH,
} from "../pages/paths";
import SideBar from "../components/Sidebar/Sidebar";
import DashboardRestaurant from "../pages/Dashboard/DashboardRestaurant/DashboardRestaurant";
import DashboardPole from "../pages/Dashboard/DashboardPole/DashboardPole";
import DashboardUser from "../pages/Dashboard/DashboardUser/DashboardUser";
import DashboardTicket from "../pages/Dashboard/DashboardTicket/DashboardTicket";
import DashboardTable from "../pages/Dashboard/DashboardTable/DashboardTable";
import DashboardStats from "../pages/Dashboard/DashboardStats/DashboardStats";
import DashboardOptions from "../pages/Dashboard/DashboardOptions/DashboardOptions";
import ProtectedAdmin from "../components/Protected/ProtectedAdmin/ProtectedAdmin";
import ProtectedRestaurant from "../components/Protected/ProtectedRestaurant/ProtectedRestaurant";

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
                  <DashboardHome />
                </Protected>
              }
            />
            <Route
              path={DASHBOARD_RESTAURANT}
              element={
                <ProtectedAdmin>
                  <DashboardRestaurant />
                </ProtectedAdmin>
              }
            />
            <Route
              path={DASHBOARD_POLE}
              element={
                <ProtectedAdmin>
                  <DashboardPole />
                </ProtectedAdmin>
              }
            />
            <Route
              path={DASHBOARD_USER}
              element={
                <ProtectedAdmin>
                  <DashboardUser />
                </ProtectedAdmin>
              }
            />
            <Route
              path={DASHBOARD_TICKET}
              element={
                <ProtectedRestaurant>
                  <DashboardTicket />
                </ProtectedRestaurant>
              }
            />
            <Route
              path={DASHBOARD_TABLE}
              element={
                <ProtectedRestaurant>
                  <DashboardTable />
                </ProtectedRestaurant>
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
