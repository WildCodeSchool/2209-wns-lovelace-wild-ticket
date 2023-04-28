import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

/* PRIME REACT */
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

/* PATHS */
import {
  HOME_PATH,
  SIGN_IN_PATH,
  FORGOT_PASSWORD_PATH,
  UPDATE_PASSWORD_PATH,
  DASHBOARD_HOME,
  DASHBOARD_OPTIONS,
  DASHBOARD_POLE,
  DASHBOARD_RESTAURANT,
  DASHBOARD_STATS,
  DASHBOARD_TABLE,
  DASHBOARD_TICKET,
  DASHBOARD_USER,
} from "./pages/paths";

/* PAGES */
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import ForgotPassword from "./pages/SignIn/ForgotPassword";
import UpdatePassword from "./pages/SignIn/UpdatePassword";
import DashboardHome from "./pages/Dashboard/DashboardHome/DashboardHome";
import DashboardRestaurant from "./pages/Dashboard/DashboardRestaurant/DashboardRestaurant";
import DashboardPole from "./pages/Dashboard/DashboardPole/DashboardPole";
import DashboardUser from "./pages/Dashboard/DashboardUser/DashboardUser";
import DashboardTicket from "./pages/Dashboard/DashboardTicket/DashboardTicket";
import DashboardTable from "./pages/Dashboard/DashboardTable/DashboardTable";
import DashboardStats from "./pages/Dashboard/DashboardStats/DashboardStats";
import DashboardOptions from "./pages/Dashboard/DashboardOptions/DashboardOptions";

/* COMPONENTS */
import Protected from "./components/Protected/Protected";
import ProtectedAdmin from "./components/Protected/ProtectedAdmin/ProtectedAdmin";
import ProtectedRestaurant from "./components/Protected/ProtectedRestaurant/ProtectedRestaurant";
import DashBoardHeader from "./components/Dashboard/DashboardHeader/DashboardHeader";
import SideBar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();

  return (
    <>
      <main>
        {location.pathname.includes(DASHBOARD_HOME) && <SideBar />}
        <>
          {location.pathname.includes(DASHBOARD_HOME) && <DashBoardHeader />}
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={SIGN_IN_PATH} element={<SignIn />} />
            <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
            <Route path={UPDATE_PASSWORD_PATH} element={<UpdatePassword />} />
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
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </>
  );
}

export default App;
