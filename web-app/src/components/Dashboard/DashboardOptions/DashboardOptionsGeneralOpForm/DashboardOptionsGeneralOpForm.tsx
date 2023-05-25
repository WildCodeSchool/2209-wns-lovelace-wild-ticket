import "../DashboardOptionsForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsGeneralOpForm = ({ data }: any) => {
  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-ticket DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Tickets</p>
      </div>
      <form className="DashboardOptionsForm">
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            Délai délivrance (en mn)
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="number"
            required
            autoComplete="email"
            id="email"
            name="email"
            value={data.restaurant.ticketWaitingLimit}
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

export default DashboardOptionsGeneralOpForm;
