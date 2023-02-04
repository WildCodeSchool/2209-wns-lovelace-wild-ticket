// TODO: Quand toutes les pages seront créées, modifier l'import sur toutes les autres pages dashboard comme suit.
import DashboardListTab from "../../../components/Dashboard/DashboardListTab/DashboardListTab";
import "../DashboardMain.scss";

const DashboardTicket = () => {
  return (
    <section className="DashboardMainSection">
      {/* TODO: Le header sera utilisé pour les filtres, bouton d'ajout etc. (cf. maquette) */}
      <header className="DashboardMainHeader">
        <h1>FILTRES ET BOUTONS</h1>
        <p className="DashboardText">Under Construction...</p>
      </header>
      <main className="DashboardMainList">
        <DashboardListTab />
      </main>
      <footer className="DashboardMainFooter">
        <h1>PAGINATION</h1>
        <p className="DashboardText">Under Construction...</p>
      </footer>
    </section>
  );
};

export default DashboardTicket;
