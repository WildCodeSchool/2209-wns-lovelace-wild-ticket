import { useContext, useState } from "react";
import "../DashboardOptionsForm.scss";
import "primeicons/primeicons.css";
import { AppContext } from "../../../../context/AppContext";
import {
  UpdateRestaurantMutation,
  UpdateRestaurantMutationVariables,
} from "../../../../gql/graphql";
import { UPDATE_RESTAURANT } from "../../../../queries/Queries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const DashboardOptionsGeneralOpForm = () => {
  const appContext = useContext(AppContext);
  const userData = appContext?.userData;
  const restaurantId = userData?.restaurant?.id;
  const restaurantName = userData?.restaurant.name;
  const restaurantPicture = userData?.restaurant.picture;
  const [ticketWaitingLimit, setTicketWaitingLimit] = useState<number>(
    userData?.restaurant?.ticketWaitingLimit
  );

  const [updateRestaurant] = useMutation<
    UpdateRestaurantMutation,
    UpdateRestaurantMutationVariables
  >(UPDATE_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateRestaurantId: restaurantId,
      ticketWaitingLimit: ticketWaitingLimit,
      name: restaurantName,
      picture: restaurantPicture,
    },
    onCompleted: () => {
      appContext?.refetch();
      toast.success("Mise à jour effectuée avec succès");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateRestaurant();
  };

  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-ticket DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Tickets</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="DashboardOptionsForm"
      >
        <div className="DashboardOptionsFormTextInputContainer">
          <label className="DashboardOptionsFormTextLabel" htmlFor="email">
            Délai maximal (en mn)
          </label>
          <input
            className="DashboardOptionsFormTextInput"
            type="number"
            min="0"
            required
            value={ticketWaitingLimit}
            onChange={(e) => setTicketWaitingLimit(parseInt(e.target.value))}
          />
        </div>
        <button className="DashboardOptionsFormButton" style={{ width: "20%" }}>
          Modifier
        </button>
      </form>
    </div>
  );
};

export default DashboardOptionsGeneralOpForm;
