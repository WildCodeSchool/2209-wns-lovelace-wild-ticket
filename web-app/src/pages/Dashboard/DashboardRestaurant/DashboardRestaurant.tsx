import { useContext, useState } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import "./DashboardRestaurant.scss";
import {
  GET_POLES_TYPES,
  GET_RESTAURANTS_TYPES,
  GET_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
  GetRestaurantsQuery,
  PolesQuery,
  UpdateRestaurantMutation,
  UpdateRestaurantMutationVariables,
} from "../../../gql/graphql";
import {
  CREATE_RESTAURANT,
  GET_POLES,
  GET_RESTAURANTS,
  UPDATE_RESTAURANT,
} from "../../../queries/Queries";
import DashboardRestaurantListTab from "../../../components/Dashboard/DashboardRestaurantListTab/DashboardRestaurantListTab";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";
import ImageService from "../../../services/ImageService";

const DashboardRestaurant = () => {
  // Chargement du contexte
  const appContext = useContext(AppContext);

  // Fonction pour la conversion d'une image en base64
  const convertImage = (e: any) => {
    const file = e.target.files[0];
    ImageService.validateAndConvertImageToBase64(
      file,
      (error: any, base64Image: any) => {
        if (error) {
          toast.error(error);
          e.target.value = null;
        } else {
          setSelectedPicture(base64Image);
          setEditRestaurantPicture(base64Image);
        }
      }
    );
  };

  // Chargement des restaurants
  const [restaurants, setRestaurants] = useState<GET_RESTAURANTS_TYPES>(null);
  const { loading, refetch } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.getRestaurants) {
        setRestaurants(data.getRestaurants);
      }
    },
  });

  // Chargement des poles
  const [poles, setPoles] = useState<GET_POLES_TYPES>(null);
  const { loading: loadingPoles } = useQuery<PolesQuery>(GET_POLES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.poles) {
        setPoles(data.poles);
      }
    },
  });

  const [isClickable, setIsClickable] = useState<boolean>(true);

  // Création d'un restaurant
  const [openAddRestaurantModal, setOpenAddRestaurantModal] =
    useState<boolean>(false);
  const [name, setName] = useState("");
  const [selectedPicture, setSelectedPicture] = useState<string | null>(null);
  const [pole, setPole] = useState("");
  const [createRestaurant] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATE_RESTAURANT);

  const submitAddRestaurantForm = async () => {
    try {
      await createRestaurant({
        variables: {
          name: name,
          picture: selectedPicture,
          ticketWaitingLimit: 5,
          notComingTicketDisapearDelay: 2,
          pole: pole,
        },
      });
      setName("");
      setPole("");
      toast.success(`Vous avez créé un restaurant avec succès.`);
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Modification d'un restaurant
  const [openEditRestaurantModal, setOpenEditRestaurantModal] =
    useState<boolean>(false);
  const [editRestaurantId, setEditRestaurantId] = useState<string>("");
  const [editRestaurantName, setEditRestaurantName] = useState<string>("");
  const [editRestaurantPicture, setEditRestaurantPicture] = useState<string>(
    "" as any
  );

  const [editRestaurant] = useMutation<
    UpdateRestaurantMutation,
    UpdateRestaurantMutationVariables
  >(UPDATE_RESTAURANT);

  const editRestaurantForm = async (restaurant: GET_RESTAURANT_TYPES) => {
    setEditRestaurantId(restaurant?.id as string);
    setEditRestaurantName(restaurant?.name as string);
    setEditRestaurantPicture(restaurant?.picture as string);
    setOpenEditRestaurantModal(true);
  };

  const submitEditRestaurantForm = async () => {
    try {
      await editRestaurant({
        variables: {
          name: editRestaurantName,
          picture: editRestaurantPicture,
          updateRestaurantId: editRestaurantId,
          ticketWaitingLimit: 5,
          notComingTicketDisapearDelay: 2,
        },
      });
      setEditRestaurantId("");
      setEditRestaurantName("");
      setEditRestaurantPicture("");
      toast.success(
        `Vous avez modifié le pôle "${editRestaurantName}" avec succès.`
      );
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className="DashboardRestaurantSection">
      <header className="DashboardRestaurantHeader">
        <div className="DashboardRestaurantHeaderButtonContainer">
          <button
            className="DashboardRestaurantHeaderButton"
            onClick={() => {
              setOpenAddRestaurantModal(true);
              setIsClickable(false);
            }}
          >
            + Ajouter un Restaurant
          </button>
        </div>
      </header>
      <main className="DashboardRestaurantList">
        {/*         {
          <table className="ListTab">
            <thead className="ListTabHeader">
              <tr className="ListTabHeaderRow">
                <td>Nom</td>
                <td>Logo</td>
                <td>Pôle</td>
              </tr>
            </thead>
            <tbody className="ListTabBody">
              {restaurants &&
                restaurants.map((restaurant) => (
                  <tr className="ListTabBodyRow">
                    <td>{restaurant.name}</td>
                    <td>
                      {restaurant.picture ? (
                        <img src={restaurant.picture} alt={restaurant.name} />
                      ) : (
                        "Pas d'image"
                      )}
                    </td>
                    <td>{restaurant.pole?.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        } */}
        <DashboardRestaurantListTab
          restaurants={restaurants}
          isClickable={isClickable}
          editRestaurantForm={editRestaurantForm}
          /* confirmDelete={confirmDelete} */
        />
      </main>

      {/* Modal d'ajout d'un nouveau restaurant */}
      <div
        className={
          openAddRestaurantModal
            ? "dashboardRestaurantListModal"
            : "dashboardRestaurantListModalHidden"
        }
      >
        <h1 className="dashboardRestaurantListModalTitle">
          Enregistement d'un nouveau restaurant
        </h1>
        <div className="dashboardRestaurantListModalTablesContainer">
          <form className="add-restaurant-form">
            <div className="add-restaurant-form-input">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                required
                autoComplete="name"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="add-restaurant-form-input-file">
              <label htmlFor="picture">Logo</label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                onChange={(event) => {
                  convertImage(event);
                }}
              />
            </div>
            <div className="add-restaurant-form-input-file">
              <label htmlFor="pole">Pôle</label>
              <select
                id="pole"
                name="pole"
                value={pole}
                onChange={(event) => {
                  setPole(event.target.value);
                }}
              >
                {poles ? (
                  poles.map((poleOption) => (
                    <option key={poleOption.id} value={poleOption.id}>
                      {poleOption.name}
                    </option>
                  ))
                ) : (
                  <option value="">Chargement des pôles...</option>
                )}
              </select>
            </div>
          </form>
        </div>
        <div className="dashboardRestaurantListModalButtonContainer">
          <button
            className="dashboardRestaurantListModalButton"
            onClick={async () => {
              await submitAddRestaurantForm();
              setOpenAddRestaurantModal(false);
              setIsClickable(true);
            }}
          >
            Enregister
          </button>
          <button
            className="dashboardRestaurantListModalButton"
            onClick={() => {
              setOpenAddRestaurantModal(false);
              setIsClickable(true);
            }}
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Modal d'édition d'un restaurant */}
      <div
        className={
          openEditRestaurantModal
            ? "dashboardRestaurantListModal"
            : "dashboardRestaurantListModalHidden"
        }
      >
        <h1 className="dashboardRestaurantListModalTitle">
          Modification d'un restaurant
        </h1>
        <div className="dashboardRestaurantListModalTablesContainer">
          <form className="add-restaurant-form">
            <div className="add-restaurant-form-input">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                required
                autoComplete="name"
                id="name"
                name="name"
                value={editRestaurantName}
                onChange={(event) => {
                  setEditRestaurantName(event.target.value);
                }}
              />
            </div>
            <div className="add-restaurant-form-input">
              <label htmlFor="name">Logo</label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                onChange={(event) => {
                  convertImage(event);
                }}
              />
            </div>
          </form>
        </div>
        <div className="dashboardRestaurantListModalButtonContainer">
          <button
            className="dashboardRestaurantListModalButton"
            onClick={async () => {
              await submitEditRestaurantForm();
              setOpenEditRestaurantModal(false);
              setIsClickable(true);
            }}
          >
            Modifier
          </button>
          <button
            className="dashboardRestaurantListModalButton"
            onClick={() => {
              setOpenEditRestaurantModal(false);
              setIsClickable(true);
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </section>
  );
};

export default DashboardRestaurant;
