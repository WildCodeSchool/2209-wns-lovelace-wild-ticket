import "./DashboardUser.scss";
import "../DashboardTemp.scss";
import DashboardUserListTab from "../../../components/Dashboard/DashboardUserListTab/DashboardUserListTab";
import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";
import {
  GET_RESTAURANTS_TYPES,
  GET_USERS_TYPES,
  GET_USER_TYPES,
} from "../../../types/DataTypes";
import {
  GET_USERS,
  CREATE_USER,
  GET_RESTAURANTS,
  UPDATE_USER,
  DELETE_USER,
} from "../../../queries/Queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetRestaurantsQuery,
  GetUsersQuery,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "../../../gql/graphql";
import { ROLE_ADMIN } from "../../../constants/Constants";

const DashboardUser = () => {
  // Chargement des utilisateurs
  const [users, setUsers] = useState<GET_USERS_TYPES>(null);
  const { refetch: userRefetch } = useQuery<GetUsersQuery>(GET_USERS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.getUsers) {
        setUsers(data.getUsers);
      }
    },
  });

  // Chargement des restaurants
  const [restaurants, setRestaurants] = useState<GET_RESTAURANTS_TYPES>(null);
  const { refetch: restaurantsRefetch } = useQuery<GetRestaurantsQuery>(
    GET_RESTAURANTS,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        if (data.getRestaurants) {
          setRestaurants(data.getRestaurants);
        }
      },
    }
  );

  // Création d'un utilisateur
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER);

  const submitAddUserForm = async () => {
    try {
      await createUser({
        variables: {
          firstname,
          lastname,
          email,
          role,
          restaurant: restaurantId,
        },
      });
      setFirstname("");
      setLastname("");
      setEmail("");
      setRole("");
      setRestaurantId("");
      toast.success(
        `Création réalisée avec succès. Un email a été envoyé à l'utilisateur pour initialisation de mot de passe.`
      );
      userRefetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
      setFirstname("");
      setLastname("");
      setEmail("");
      setRole("");
      setRestaurantId("");
    }
  };

  // Modification d'un utilisateur
  const [openEditUserModal, setOpenEditUserModal] = useState<boolean>(false);
  const [editUserId, setEditUserId] = useState<string>("");
  const [editFirstname, setEditFirstname] = useState<string>("");
  const [editLastname, setEditLastname] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editRole, setEditRole] = useState<string>("");
  const [editRestaurantId, setEditRestaurantId] = useState<string>("");
  const [editUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);
  const oldUserData = users?.find((user) => user.id === editUserId);

  const compareOldAndNewData = () => {
    if (
      oldUserData?.firstname === editFirstname &&
      oldUserData?.lastname === editLastname &&
      oldUserData?.email === editEmail &&
      oldUserData?.role === editRole &&
      oldUserData?.restaurant?.id === editRestaurantId
    ) {
      return true;
    } else {
      return false;
    }
  };

  const editUserForm = async (user: GET_USER_TYPES) => {
    setEditUserId(user?.id as string);
    setEditFirstname(user?.firstname as string);
    setEditLastname(user?.lastname as string);
    setEditEmail(user?.email as string);
    setEditRole(user?.role as string);
    setEditRestaurantId(user?.restaurant?.id as string);
    setOpenEditUserModal(true);
  };

  const submitEditUserForm = async () => {
    if (ROLE_ADMIN.includes(editRole)) {
      setEditRestaurantId("");
    }

    try {
      if (compareOldAndNewData()) {
        toast.info(`Aucune modification apportée.`);
        return;
      }
      await editUser({
        variables: {
          firstname: editFirstname,
          lastname: editLastname,
          email: editEmail,
          role: editRole,
          restaurant: editRestaurantId,
          updateUserId: editUserId,
        },
      });
      setEditFirstname("");
      setEditLastname("");
      setEditEmail("");
      setEditRole("");
      setEditRestaurantId("");
      toast.success(`Utilisateur modifié avec succès.`);
      userRefetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Suppression d'un utilisateur
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [openConfirmDeleteUserModal, setOpenConfirmDeleteUserModal] =
    useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [deleteUser] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DELETE_USER);

  const confirmDelete = async (user: GET_USER_TYPES) => {
    setUserId(user?.id as string);
    setUserName(`${user?.firstname as string} ${user?.lastname as string}`);
    setOpenConfirmDeleteUserModal(true);
    setIsClickable(false);
  };

  const confirmDeleteUser = async () => {
    console.log(userId);
    try {
      await deleteUser({ variables: { deleteUserId: userId } });
      toast.success(
        `Vous avez supprimé l'utilisateur "${userName}" avec succès.`
      );
      userRefetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Rendu de la page
  return (
    <section className="DashboardUserSection">
      {/* Header */}
      <header className="DashboardUserHeader">
        <div className="DashboardUserHeaderButtonContainer">
          <button
            className="DashboardUserHeaderButton"
            onClick={() => {
              setOpenAddUserModal(true);
              setIsClickable(false);
            }}
          >
            + Ajouter un Utilisateur
          </button>
        </div>
      </header>

      {/* Main avec tableau des utilisateurs */}
      <main className="DashboardUserList">
        <DashboardUserListTab
          users={users}
          isClickable={isClickable}
          editUserForm={editUserForm}
          confirmDelete={confirmDelete}
        />
      </main>

      {/* Modal de confirmation de suppression */}
      <div
        className={
          openConfirmDeleteUserModal
            ? "DashboardUserListModal"
            : "DashboardUserListModalHidden"
        }
      >
        <h1 className="DashboardUserListModalTitle">
          Voulez-vous supprimer l'utilisateur "{userName}" ?
        </h1>
        <div className="DashboardUserListModalButtonContainer">
          <button
            className="DashboardUserListModalButton"
            onClick={async () => {
              await confirmDeleteUser();
              setOpenConfirmDeleteUserModal(false);
              setIsClickable(true);
            }}
          >
            Oui
          </button>
          <button
            className="DashboardUserListModalButton"
            onClick={() => {
              setOpenConfirmDeleteUserModal(false);
              setIsClickable(true);
            }}
          >
            Non
          </button>
        </div>
      </div>

      {/* Modal d'ajout d'un nouvel utilisateur */}
      <div
        className={
          openAddUserModal
            ? "DashboardUserListModal"
            : "DashboardUserListModalHidden"
        }
      >
        <h1 className="DashboardUserListModalTitle">
          Enregistement d'un nouvel utilisateur
        </h1>
        <div className="DashboardUserListModalTablesContainer">
          <form
            className="add-pole-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await submitAddUserForm();
              setOpenAddUserModal(false);
              setIsClickable(true);
            }}
          >
            <div className="add-pole-form-input">
              <label htmlFor="name">Prénom</label>
              <input
                type="text"
                required
                autoComplete="firstname"
                id="firstname"
                name="firstname "
                value={firstname}
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                required
                autoComplete="lastname"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                required
                autoComplete="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="role">Rôle</label>
              <select
                name="role"
                id="role"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Sélectionner un rôle
                </option>
                <option value="ROLE_ADMIN">Administrateur</option>
                <option value="ROLE_RESTAURANT">Restaurateur</option>
              </select>
            </div>
            {role === "ROLE_RESTAURANT" ? (
              <div className="add-pole-form-input">
                <label htmlFor="restaurant">Restaurant</label>
                <select
                  name="restaurant"
                  id="restaurant"
                  onChange={(event) => {
                    setRestaurantId(event.target.value);
                  }}
                  required
                  value={restaurantId}
                >
                  <option value="" disabled>
                    Sélectionner un restaurant
                  </option>
                  {restaurants &&
                    restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.pole?.name + " - " + restaurant.name}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
              <div className="add-pole-form-input">
                <label htmlFor="restaurant">Restaurant</label>
                <select
                  name="restaurant"
                  id="restaurant"
                  onChange={() => {
                    setRestaurantId("");
                  }}
                  required
                  value=""
                  disabled
                >
                  <option value="">Uniquement si "Rôle Restaurateur"</option>
                </select>
              </div>
            )}
            <div className="DashboardUserListModalButtonContainer">
              <button className="DashboardUserListModalButton">
                Enregister
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal d'édition d'un utilisateur */}
      <div
        className={
          openEditUserModal
            ? "DashboardUserListModal"
            : "DashboardUserListModalHidden"
        }
      >
        <h1 className="DashboardUserListModalTitle">
          Modification d'un utilisateur
        </h1>
        <div className="DashboardUserListModalTablesContainer">
          <form className="add-pole-form">
            <div className="add-pole-form-input">
              <label htmlFor="name">Prénom</label>
              <input
                type="text"
                required
                autoComplete="firstname"
                id="firstname"
                name="firstname "
                value={editFirstname}
                onChange={(event) => {
                  setEditFirstname(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                required
                autoComplete="lastname"
                id="lastname"
                name="lastname"
                value={editLastname}
                onChange={(event) => {
                  setEditLastname(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                required
                autoComplete="email"
                id="email"
                name="email"
                value={editEmail}
                onChange={(event) => {
                  setEditEmail(event.target.value);
                }}
              />
            </div>
            {editRole === "ROLE_RESTAURANT" && (
              <div className="add-pole-form-input">
                <label htmlFor="restaurant">Restaurant</label>
                <select
                  name="restaurant"
                  id="restaurant"
                  onChange={(event) => {
                    setEditRestaurantId(event.target.value);
                  }}
                  required
                  value={editRestaurantId} // Assurez-vous d'avoir défini restaurantId avec useState
                >
                  {restaurants &&
                    restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.pole?.name + " - " + restaurant.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </form>
        </div>
        <div className="DashboardUserListModalButtonContainer">
          <button
            className="DashboardUserListModalButton"
            onClick={async () => {
              await submitEditUserForm();
              setOpenEditUserModal(false);
              setIsClickable(true);
            }}
          >
            Modifier
          </button>
          <button
            className="DashboardUserListModalButton"
            onClick={() => {
              setOpenEditUserModal(false);
              setIsClickable(true);
              userRefetch();
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </section>
  );
};

export default DashboardUser;
