import "./DashboardOptionsOperatorForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsOperatorForm = () => {
  return (
    <div className="DashboardOptionsContainer">
      <div className="titleContainer">
        <i className="pi pi-user titleIcon" />
        <p className="titleText">Opérateur</p>
      </div>
      <form className="DashboardOptionsForm">
        <div>
          <label htmlFor="email">Nom</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="email">Mot de passe</label>
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
          <label htmlFor="email">Confirmer le mot de passe</label>
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

export default DashboardOptionsOperatorForm;
