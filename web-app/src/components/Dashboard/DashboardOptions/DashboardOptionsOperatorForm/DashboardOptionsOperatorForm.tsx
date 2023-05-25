import "../DashboardOptionsForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsOperatorForm = ({ data }: any) => {
  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-user DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Opérateur</p>
      </div>
      <form className="DashboardOptionsForm">
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            E-mail
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="email"
            required
            autoComplete="email"
            id="email"
            name="email"
            value={data.email}
            //onChange={}
          />
        </div>
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            Ancien mot de passe
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="password"
            required
            autoComplete="email"
            id="email"
            name="email"
            value="password"
            //onChange={}
          />
        </div>
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            Nouveau mot de passe
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="password"
            required
            autoComplete="email"
            id="email"
            name="email"
            value="password"
            //onChange={}
          />
        </div>
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            Confirmer mot de passe
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="password"
            required
            autoComplete="email"
            id="email"
            name="email"
            value="password"
            //onChange={}
          />
        </div>

        <button className="DashboardOptionsFormButton" style={{ width: "20%" }}>
          Modifier
        </button>
        <div></div>
      </form>
    </div>
  );
};

export default DashboardOptionsOperatorForm;
