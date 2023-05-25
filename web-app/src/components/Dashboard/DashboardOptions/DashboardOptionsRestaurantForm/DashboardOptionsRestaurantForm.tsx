import "../DashboardOptionsForm.scss";
import "primeicons/primeicons.css";

const DashboardOptionsRestaurantForm = ({ data }: any) => {
  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-home DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Restaurant</p>
      </div>
      <form className="DashboardOptionsForm">
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            Nom
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="email"
            required
            autoComplete="email"
            id="email"
            name="email"
            value={data.restaurant.name}
            //onChange={}
          />
        </div>
        <div className="DashboardOptionsFormFileInputContainer">
          <label className="DashboardOptionsFormFileLabel" htmlFor="email">
            Logo
          </label>
          <div className="DashboardOptionsFormFileInputImage">
            <input
              className="DashboardOptionsFormFileInput"
              type="file"
              id="imageInput"
              accept="image/*"
              //onChange={handleImageChange}
            />
            <div className="DashboardOptionsFormImageContainer">
              <img
                className="DashboardOptionsFormImage"
                src={data.restaurant.picture}
                alt="restaurant's logo"
              />{" "}
            </div>
            <button
              className="DashboardOptionsFormRestaurantButton"
              style={{ width: "20%" }}
            >
              Modifier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardOptionsRestaurantForm;
