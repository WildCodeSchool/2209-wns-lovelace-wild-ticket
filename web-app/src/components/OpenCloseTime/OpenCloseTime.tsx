import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useMutation } from "@apollo/client";
import { DatePicker } from "rsuite";
import {
  UpdateRestaurantOpeningTimeMutation,
  UpdateRestaurantOpeningTimeMutationVariables,
} from "../../gql/graphql";
import { UPDATE_RESTAURANTS_TIME } from "../../queries/Queries";

import "rsuite/dist/rsuite-no-reset.min.css";
import "../OpenCloseTime/OpenCloseTime.scss";
import { toast } from "react-toastify";

const OpenCloseTime = () => {
  const appContext = useContext(AppContext);
  //UPDATE OPENING AND CLOSED TIME
  const [openAt, setOpenAt] = React.useState<Date | null>(
    new Date(appContext?.userData.restaurant.openAt)
  );
  const [closedAt, setClosedAt] = React.useState<Date | null>(
    new Date(appContext?.userData.restaurant.closeAt)
  );
  const restaurantId = appContext?.userData.restaurant.id as string;

  let openHour = openAt?.getHours() as number;
  let openMinute = openAt?.getMinutes() as number;
  let closeHour = closedAt?.getHours() as number;
  let closeMinute = closedAt?.getMinutes() as number;

  if (openMinute === 0) {
    openMinute = 0o0;
  }

  if (closeMinute === 0) {
    closeMinute = 0o0;
  }

  const [updateRestaurantOpeningTime] = useMutation<
    UpdateRestaurantOpeningTimeMutation,
    UpdateRestaurantOpeningTimeMutationVariables
  >(UPDATE_RESTAURANTS_TIME, {
    variables: {
      updateRestaurantOpeningTimeId: restaurantId,
      hourOpenAt: openHour,
      minutesOpenAt: openMinute,
      hourCloseAt: closeHour,
      minutesCloseAt: closeMinute,
    },
    onCompleted: async (data) => {
      setOpenAt(new Date(data.updateRestaurantOpeningTime.openAt));
      setClosedAt(new Date(data.updateRestaurantOpeningTime.closeAt));
      appContext?.refetch();
      toast.success(
        "Les horaires d'ouverture et de fermeture ont été mis à jour avec succès !"
      );
    },
    onError: () => {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    },
  });

  console.log(openAt, closedAt);
  return (
    <div className="contentBottom">
      <div className="openClose">
        <div className="open">
          <h2>Ouverture de la réservation</h2>
          <div className="field">
            <DatePicker
              id="clearValue"
              format="HH:mm"
              editable={true}
              onChange={(open) => setOpenAt(open)}
              value={
                openAt != null && openAt.getDate === new Date().getDate
                  ? openAt
                  : null
              }
              placement="auto"
              placeholder="Ouverture"
              size="lg"
              style={{ width: 260 }}
            />
          </div>
        </div>
        <div className="close">
          <h2>Fermeture de la réservation</h2>
          <div className="field">
            <DatePicker
              id="clearValue1"
              format="HH:mm"
              editable={true}
              onChange={(close) => setClosedAt(close)}
              value={
                closedAt != null && closedAt.getDate === new Date().getDate
                  ? closedAt
                  : null
              }
              placement="auto"
              placeholder="Fermeture"
              size="lg"
              style={{ width: 260 }}
            />
          </div>
        </div>
      </div>
      <button
        className="openCloseBtn"
        onClick={() => {
          updateRestaurantOpeningTime();
        }}
      >
        Valider
      </button>
    </div>
  );
};

export default OpenCloseTime;
