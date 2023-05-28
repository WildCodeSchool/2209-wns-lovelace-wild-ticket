import { useContext, useState } from "react";
import "../DashboardOptionsForm.scss";
import "primeicons/primeicons.css";
import { AppContext } from "../../../../context/AppContext";
import { useMutation } from "@apollo/client";
import {
  UpdateRestaurantMutation,
  UpdateRestaurantMutationVariables,
} from "../../../../gql/graphql";
import { UPDATE_RESTAURANT } from "../../../../queries/Queries";
import { toast } from "react-toastify";
import ImageService from "../../../../services/ImageService";

const DashboardOptionsRestaurantForm = () => {
  const appContext = useContext(AppContext);
  const userData = appContext?.userData;
  const restaurantId = userData?.restaurant?.id;
  const restaurantName = userData?.restaurant.name;
  const restaurantPicture = userData?.restaurant.picture;
  const ticketWaitingLimit = userData?.restaurant.ticketWaitingLimit;
  const [updatedRestaurantName, setUpdatedRestaurantName] =
    useState<string>(restaurantName);
  const [updatedRestaurantPicture, setUpdatedRestaurantPicture] =
    useState(restaurantPicture);

  const [updateRestaurant] = useMutation<
    UpdateRestaurantMutation,
    UpdateRestaurantMutationVariables
  >(UPDATE_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateRestaurantId: restaurantId,
      ticketWaitingLimit: ticketWaitingLimit,
      name: updatedRestaurantName,
      picture: updatedRestaurantPicture,
    },
    onCompleted: () => {
      appContext?.refetch();
      toast.success("Mise à jour effectuée avec succès");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const convertImage = (e: any) => {
    const file = e.target.files[0];
    ImageService.validateAndConvertImageToBase64(
      file,
      (error: any, base64Image: any) => {
        if (error) {
          toast.error(error);
          e.target.value = null;
        } else {
          setUpdatedRestaurantPicture(base64Image);
        }
      }
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateRestaurant();
  };
  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-home DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Restaurant</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="DashboardOptionsForm"
      >
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            name="name"
            className="DashboardOptionsFormTextInput"
            type="text"
            autoComplete="off"
            value={updatedRestaurantName}
            onChange={(e) => setUpdatedRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="DashboardOptionsFormFileInputContainer">
          <label className="DashboardOptionsFormFileLabel" htmlFor="picture">
            Logo
          </label>
          <div className="DashboardOptionsFormFileInputImage">
            <input
              id="picture"
              name="picture"
              className="DashboardOptionsFormFileInput"
              type="file"
              accept="image/*"
              onChange={(e) => convertImage(e)}
            />
            <p className="DashboardOptionsFormFileInputText">
              Taille max : 1000px * 1000px.
            </p>
            <p className="DashboardOptionsFormFileInputText">
              Formats autorisés: JPG, JPEG et PNG.
            </p>
            <div className="DashboardOptionsFormImageContainer">
              <img
                className="DashboardOptionsFormImage"
                src={updatedRestaurantPicture}
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
