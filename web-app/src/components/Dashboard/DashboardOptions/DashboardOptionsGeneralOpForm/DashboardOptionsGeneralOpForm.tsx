import { SyntheticEvent, useContext, useState } from "react";
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
  const [notComingTicketDisapearDelay, setNotComingTicketDisapearDelay] =
    useState<number>(userData?.restaurant?.notComingTicketDisapearDelay);

  const [updateRestaurant] = useMutation<
    UpdateRestaurantMutation,
    UpdateRestaurantMutationVariables
  >(UPDATE_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateRestaurantId: restaurantId,
      ticketWaitingLimit: ticketWaitingLimit,
      notComingTicketDisapearDelay: notComingTicketDisapearDelay,
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateRestaurant();
  };

  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-ticket DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">
          Tickets{" "}
          <span style={{ fontSize: "14px" }}>
            (modifiable en début de journée uniquement.)
          </span>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="DashboardOptionsForm"
      >
        <div className="DashboardOptionsFormTextInputContainer">
          <label
            className="DashboardOptionsFormTextLabel"
            htmlFor="maxDelayTicket"
          >
            Délai maximal
          </label>
          <div style={{ width: "60%" }}>
            <input
              id="maxDelayTicket"
              name="maxDelayTicket"
              className="DashboardOptionsFormTextInput"
              style={{ width: "100%" }}
              type="number"
              min="0"
              required
              value={ticketWaitingLimit}
              onChange={(e) => setTicketWaitingLimit(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="DashboardOptionsFormTextInputContainer">
          <label
            className="DashboardOptionsFormTextLabel"
            htmlFor="notComingTicketDisapearDelay"
          >
            Délai disparition ticket
          </label>
          <div style={{ width: "60%" }}>
            <input
              id="notComingTicketDisapearDelay"
              name="notComingTicketDisapearDelay"
              className="DashboardOptionsFormTextInput"
              style={{ width: "100%" }}
              type="number"
              min="0"
              required
              value={notComingTicketDisapearDelay}
              onChange={(e) =>
                setNotComingTicketDisapearDelay(parseInt(e.target.value))
              }
            />
          </div>
        </div>

        <button className="DashboardOptionsFormButton" style={{ width: "20%" }}>
          Modifier
        </button>
      </form>
    </div>
  );
};

export default DashboardOptionsGeneralOpForm;
