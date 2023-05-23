import "./DashboardOptionsRestaurantForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsRestaurantForm = () => {
  return (
    <div className="DashboardOptionsRestaurantContainer">
      <div className="titleContainer">
        <i className="pi pi-home titleIcon" />
        <p className="titleText">Restaurant</p>
      </div>
      <form className="DashboardOptionsRestaurantForm">
        <div className="DashboardOptionsRestaurantFormTextInputContainer">
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
        <div className="DashboardOptionsRestaurantFormTextInputContainer">
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
