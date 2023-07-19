import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../DashboardTemp.scss";
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
  DeleteRestaurantMutation,
  DeleteRestaurantMutationVariables,
  GetRestaurantsQuery,
  PolesQuery,
  UpdateRestaurantMutation,
  UpdateRestaurantMutationVariables,
} from "../../../gql/graphql";
import {
  CREATE_RESTAURANT,
  DELETE_RESTAURANT,
  GET_POLES,
  GET_RESTAURANTS,
  UPDATE_RESTAURANT,
} from "../../../queries/Queries";
import DashboardRestaurantListTab from "../../../components/Dashboard/DashboardRestaurantListTab/DashboardRestaurantListTab";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";
import ImageService from "../../../services/ImageService";

const DashboardRestaurant = () => {
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
  const { refetch } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.getRestaurants) {
        setRestaurants(data.getRestaurants);
      }
    },
  });

  // Chargement des poles
  const [poles, setPoles] = useState<GET_POLES_TYPES>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      if (!name) {
        toast.error("Vous devez saisir un nom.");
        return;
      }
      if (!selectedPicture) {
        toast.error("Vous devez sélectionner une image.");
        return;
      }
      if (!pole) {
        toast.error("Vous devez sélectionner un pôle.");
        return;
      }
      await createRestaurant({
        variables: {
          name: name,
          picture: selectedPicture,
          ticketWaitingLimit: 5,
          notComingTicketDisapearDelay: 2,
          pole: pole,
        },
      });
      setOpenAddRestaurantModal(false);
      setIsClickable(true);
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

  const oldRestaurant = restaurants?.find(
    (restaurant) => restaurant.id === editRestaurantId
  );

  const restaurantIsModified = () => {
    if (
      oldRestaurant?.name === editRestaurantName &&
      oldRestaurant?.picture === editRestaurantPicture
    ) {
      return false;
    }
    return true;
  };

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
      if (restaurantIsModified()) {
        await editRestaurant({
          variables: {
            name: editRestaurantName,
            picture: editRestaurantPicture,
            updateRestaurantId: editRestaurantId,
            ticketWaitingLimit: 5,
            notComingTicketDisapearDelay: 2,
          },
        });
        setOpenEditRestaurantModal(false);
        setIsClickable(true);
        setEditRestaurantId("");
        setEditRestaurantName("");
        setEditRestaurantPicture("");
        toast.success(
          `Vous avez modifié le pôle "${editRestaurantName}" avec succès.`
        );
        refetch();
      } else {
        toast.error("Les champs ne comportent aucune modification.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Suppression d'un restaurant
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [
    openConfirmDeleteRestaurantModal,
    setOpenConfirmDeleteRestaurantModal,
  ] = useState<boolean>(false);
  const [deleteRestaurant] = useMutation<
    DeleteRestaurantMutation,
    DeleteRestaurantMutationVariables
  >(DELETE_RESTAURANT);

  const confirmDelete = async (restaurant: GET_RESTAURANT_TYPES) => {
    setRestaurantId(restaurant?.id as string);
    setRestaurantName(restaurant?.name as string);
    setOpenConfirmDeleteRestaurantModal(true);
    setIsClickable(false);
  };

  const confirmDeleteRestaurant = async () => {
    try {
      await deleteRestaurant({
        variables: { deleteRestaurantId: restaurantId },
      });
      toast.success(
        `Vous avez supprimé le pôle "${restaurantName}" avec succès.`
      );
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Rendu de la page
  return (
    <HelmetProvider>
      <Helmet>
        <title>R'Ticket - Restaurants</title>
      </Helmet>
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
          <DashboardRestaurantListTab
            restaurants={restaurants}
            isClickable={isClickable}
            editRestaurantForm={editRestaurantForm}
            confirmDelete={confirmDelete}
          />
        </main>

        {/* Modal d'ajout d'un nouveau restaurant */}
        <div className={openAddRestaurantModal ? "modalOverlay" : ""}>
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
                    <option value="">
                      -- Veuillez sélectionner un Pôle --
                    </option>
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
        </div>

        {/* Modal d'édition d'un restaurant */}
        <div className={openEditRestaurantModal ? "modalOverlay" : ""}>
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
                <div className="add-restaurant-form-input-file">
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
        </div>

        {/* Modal de confirmation de suppression d'un restaurant */}
        <div className={openConfirmDeleteRestaurantModal ? "modalOverlay" : ""}>
          <div
            className={
              openConfirmDeleteRestaurantModal
                ? "dashboardRestaurantListModal"
                : "dashboardRestaurantListModalHidden"
            }
          >
            <h1 className="dashboardRestaurantListModalTitle">
              Voulez-vous supprimer le restaurant "{restaurantName}" ?
            </h1>
            <div className="dashboardRestaurantListModalButtonContainer">
              <button
                className="dashboardRestaurantListModalButton"
                onClick={async () => {
                  await confirmDeleteRestaurant();
                  setOpenConfirmDeleteRestaurantModal(false);
                  setIsClickable(true);
                }}
              >
                Oui
              </button>
              <button
                className="dashboardRestaurantListModalButton"
                onClick={() => {
                  setOpenConfirmDeleteRestaurantModal(false);
                  setIsClickable(true);
                }}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default DashboardRestaurant;
