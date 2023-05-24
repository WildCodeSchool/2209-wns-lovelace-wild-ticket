import "./DashboardOptionsRestaurantForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsRestaurantForm = () => {
  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-home DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Restaurant</p>
      </div>
      <form className="DashboardOptionsForm">
        <div className="DashboardOptionsFormTextInputContainer">
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
        <div className="DashboardOptionsFormFileInputContainer">
          <label htmlFor="email">Logo</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            //onChange={handleImageChange}
          />
        </div>{" "}
        <button style={{ width: "20%" }}>Valider</button>
      </form>
    </div>
  );
};

export default DashboardOptionsRestaurantForm;
