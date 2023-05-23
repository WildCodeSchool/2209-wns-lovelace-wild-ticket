import "./DashboardOptionsGeneralOpForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsGeneralOpForm = () => {
  return (
    <div className="DashboardOptionsContainer">
      <div className="titleContainer">
        <i className="pi pi-cog titleIcon" />
        <p className="titleText">Général</p>
      </div>
      <form className="DashboardOptionsForm">
        <div>
          <label htmlFor="email">Durée limite ticket</label>
          <input
            type="email"
            required
            autoComplete="email"
            id="email"
            name="email"
            value="aaa"
            //onChange={}
          />
        </div>
        <div>
          <label htmlFor="email">Mode Jour/Nuit</label>
          <input
            type="email"
            required
            autoComplete="email"
            id="email"
            name="email"
            value="aaa"
            //onChange={}
          />
        </div>
        <button style={{ width: "20%" }}>Valider</button>
      </form>
    </div>
  );
};

export default DashboardOptionsGeneralOpForm;
