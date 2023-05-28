import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import { useEffect } from "react";

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
import DashBoardHeader from "./components/Header/Header";
import SideBar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();

  const currentPage = window.location.pathname;

  const primeReactMinThemePages = [DASHBOARD_POLE, DASHBOARD_RESTAURANT];
  const primeReactLaraLightIndigoThemePages = [
    DASHBOARD_POLE,
    DASHBOARD_RESTAURANT,
  ];
  const primeReactNanoThemePages = [
    DASHBOARD_HOME,
    DASHBOARD_TICKET,
    DASHBOARD_TABLE,
    DASHBOARD_STATS,
  ];

  // Fonction pour créer un lien de thème dans le DOM
  function createThemeLink(themeLink: string, themePages: string) {
    const newLink = document.createElement("link");
    newLink.id = "theme-link";
    newLink.rel = "stylesheet";
    newLink.href = themeLink;
    newLink.className = themePages;
    document.head.appendChild(newLink);
  }

  // Fontion pour supprimer les liens ayant la classe "theme-link"
  function removeThemeLinks(className: string) {
    const themeLinks = document.getElementsByClassName(className);
    if (themeLinks.length > 0) {
      for (let i = 0; i < themeLinks.length; i++) {
        themeLinks[i].remove();
      }
    }
  }

  useEffect(() => {
    // Vérification de l'existence des liens de thème dans le DOM
    const primeReactMinThemePagesLinkInHead =
      document.getElementsByClassName("primeReactMinThemePages").length > 0;
    const primeReactLaraLightIndigoThemePagesLinkInHead =
      document.getElementsByClassName("primeReactLaraLightIndigoThemePages")
        .length > 0;
    const primeReactNanoThemePagesLinkInHead =
      document.getElementsByClassName("primeReactNanoThemePages").length > 0;

    // Condition pour déterminer les liens de thème à utiliser
    let themeLink = null;

    // Si la page courante est dans le tableau des pages nécessitant le thème "primereact-min"
    if (
      primeReactMinThemePages.includes(currentPage) &&
      !primeReactMinThemePagesLinkInHead
    ) {
      themeLink = "/themes/primereact-min/primereact.min.css";
      createThemeLink(themeLink, "primeReactMinThemePages");
    } else if (!primeReactMinThemePages.includes(currentPage)) {
      removeThemeLinks("primeReactMinThemePages");
    }
    // Si la page courante est dans le tableau des pages nécessitant le thème "primereact-lara-light-indigo"
    if (
      primeReactLaraLightIndigoThemePages.includes(currentPage) &&
      !primeReactLaraLightIndigoThemePagesLinkInHead
    ) {
      themeLink = "/themes/lara-light-indigo/theme.css";
      createThemeLink(themeLink, "primeReactLaraLightIndigoThemePages");
    } else if (!primeReactLaraLightIndigoThemePages.includes(currentPage)) {
      removeThemeLinks("primeReactLaraLightIndigoThemePages");
    }
    // Si la page courante est dans le tableau des pages nécessitant le thème "primereact-nano"
    if (
      primeReactNanoThemePages.includes(currentPage) &&
      !primeReactNanoThemePagesLinkInHead
    ) {
      themeLink = "/themes/nano/theme.css";
      createThemeLink(themeLink, "primeReactNanoThemePages");
    } else if (!primeReactNanoThemePages.includes(currentPage)) {
      removeThemeLinks("primeReactNanoThemePages");
    }
  }, [
    currentPage,
    primeReactLaraLightIndigoThemePages,
    primeReactNanoThemePages,
    primeReactMinThemePages,
  ]);

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
