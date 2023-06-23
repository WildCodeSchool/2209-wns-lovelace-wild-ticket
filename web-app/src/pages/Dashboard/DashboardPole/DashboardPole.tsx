import "./DashboardPole.scss";
import "../DashboardTemp.scss";
import DashboardPoleListTab from "../../../components/Dashboard/DashboardPoleListTab/DashboardPoleListTab";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";
import { GET_POLES_TYPES, GET_POLE_TYPES } from "../../../types/DataTypes";
import {
  DELETE_POLE,
  GET_POLES,
  CREATE_POLE,
  UPDATE_POLE,
} from "../../../queries/Queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreatePoleMutation,
  CreatePoleMutationVariables,
  DeletePoleMutation,
  DeletePoleMutationVariables,
  PolesQuery,
  UpdatePoleMutation,
  UpdatePoleMutationVariables,
} from "../../../gql/graphql";

const DashboardPole = () => {
  // Chargement du contexte
  const appContext = useContext(AppContext);

  // Chargement des poles
  const [poles, setPoles] = useState<GET_POLES_TYPES>(null);
  const { loading, refetch } = useQuery<PolesQuery>(GET_POLES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.poles) {
        setPoles(data.poles);
      }
    },
  });

  // Création d'un pole
  const [openAddPoleModal, setOpenAddPoleModal] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [createPole] = useMutation<
    CreatePoleMutation,
    CreatePoleMutationVariables
  >(CREATE_POLE);

  const submitAddPoleForm = async () => {
    try {
      await createPole({
        variables: { name, address, zipCode, city, email },
      });
      setName("");
      setAddress("");
      setZipCode("");
      setCity("");
      setEmail("");
      toast.success(`Vous avez créé un pôle avec succès.`);
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Modification d'un pole
  const [openEditPoleModal, setOpenEditPoleModal] = useState<boolean>(false);
  const [editPoleId, setEditPoleId] = useState<string>("");
  const [editPoleName, setEditPoleName] = useState<string>("");
  const [editPoleAddress, setEditPoleAddress] = useState<string>("");
  const [editPoleZipCode, setEditPoleZipCode] = useState<string>("");
  const [editPoleCity, setEditPoleCity] = useState<string>("");
  const [editPoleEmail, setEditPoleEmail] = useState<string>("");

  const oldPole = poles?.find((pole) => pole.id === editPoleId);

  const poleIsModified = () => {
    if (
      oldPole?.name === editPoleName &&
      oldPole?.address === editPoleAddress &&
      oldPole?.zipCode === editPoleZipCode &&
      oldPole?.city === editPoleCity &&
      oldPole?.email === editPoleEmail
    ) {
      return false;
    }
    return true;
  };

  const [editPole] = useMutation<
    UpdatePoleMutation,
    UpdatePoleMutationVariables
  >(UPDATE_POLE);

  const editPoleForm = async (pole: GET_POLE_TYPES) => {
    setEditPoleId(pole?.id as string);
    setEditPoleName(pole?.name as string);
    setEditPoleAddress(pole?.address as string);
    setEditPoleZipCode(pole?.zipCode as string);
    setEditPoleCity(pole?.city as string);
    setEditPoleEmail(pole?.email as string);
    setOpenEditPoleModal(true);
  };

  const submitEditPoleForm = async () => {
    try {
      if (poleIsModified()) {
        await editPole({
          variables: {
            name: editPoleName,
            address: editPoleAddress,
            zipCode: editPoleZipCode,
            city: editPoleCity,
            email: editPoleEmail,
            updatePoleId: editPoleId,
          },
        });
        setOpenEditPoleModal(false);
        setIsClickable(true);
        setEditPoleId("");
        setEditPoleName("");
        setEditPoleAddress("");
        setEditPoleZipCode("");
        setEditPoleCity("");
        setEditPoleEmail("");
        toast.success(`Vous avez modifié le pôle "${editPoleName}" avec succès.`);
        refetch();
      } else {
        toast.info(`Les champs ne comportent aucune modification pour le pôle "${editPoleName}".`);
      }
    } catch (error) {
      setOpenEditPoleModal(false);
      setIsClickable(true);
      toast.error(getErrorMessage(error));
    }
  };

  // Suppression d'un pole
  const [poleId, setPoleId] = useState<string>("");
  const [poleName, setPoleName] = useState<string>("");
  const [openConfirmDeletePoleModal, setOpenConfirmDeletePoleModal] =
    useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [deletePole] = useMutation<
    DeletePoleMutation,
    DeletePoleMutationVariables
  >(DELETE_POLE);

  const confirmDelete = async (pole: GET_POLE_TYPES) => {
    setPoleId(pole?.id as string);
    setPoleName(pole?.name as string);
    setOpenConfirmDeletePoleModal(true);
    setIsClickable(false);
  };

  const confirmDeletePole = async () => {
    try {
      await deletePole({ variables: { deletePoleId: poleId } });
      toast.success(`Vous avez supprimé le pôle "${poleName}" avec succès.`);
      refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Rendu de la page
  return (
    <section className="DashboardPoleSection">
      {/* Header */}
      <header className="DashboardPoleHeader">
        <div className="DashboardPoleHeaderButtonContainer">
          <button
            className="DashboardPoleHeaderButton"
            onClick={() => {
              setOpenAddPoleModal(true);
              setIsClickable(false);
            }}
          >
            + Ajouter un Pôle
          </button>
        </div>
      </header>

      {/* Main avec tableau des poles */}
      <main className="DashboardPoleList">
        <DashboardPoleListTab
          poles={poles}
          isClickable={isClickable}
          editPoleForm={editPoleForm}
          confirmDelete={confirmDelete}
        />
      </main>

      {/* Modal de confirmation de suppression */}
      <div
        className={
          openConfirmDeletePoleModal
            ? "dashboardPoleListModal"
            : "dashboardPoleListModalHidden"
        }
      >
        <h1 className="dashboardPoleListModalTitle">
          Voulez-vous supprimer le pôle "{poleName}" ?
        </h1>
        <div className="dashboardPoleListModalButtonContainer">
          <button
            className="dashboardPoleListModalButton"
            onClick={async () => {
              await confirmDeletePole();
              setOpenConfirmDeletePoleModal(false);
              setIsClickable(true);
            }}
          >
            Oui
          </button>
          <button
            className="dashboardPoleListModalButton"
            onClick={() => {
              setOpenConfirmDeletePoleModal(false);
              setIsClickable(true);
            }}
          >
            Non
          </button>
        </div>
      </div>

      {/* Modal d'ajout d'un nouveau pole */}
      <div
        className={
          openAddPoleModal
            ? "dashboardPoleListModal"
            : "dashboardPoleListModalHidden"
        }
      >
        <h1 className="dashboardPoleListModalTitle">
          Enregistement d'un nouveau pôle
        </h1>
        <div className="dashboardPoleListModalTablesContainer">
          <form className="add-pole-form">
            <div className="add-pole-form-input">
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
            <div className="add-pole-form-input">
              <label htmlFor="name">Adresse</label>
              <input
                type="text"
                required
                autoComplete="address"
                id="address"
                name="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="zipCode">Code Postal</label>
              <input
                type="text"
                required
                autoComplete="zipCode"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={(event) => {
                  setZipCode(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                required
                autoComplete="city"
                id="city"
                name="city"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
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
          </form>
        </div>
        <div className="dashboardPoleListModalButtonContainer">
          <button
            className="dashboardPoleListModalButton"
            onClick={async () => {
              await submitAddPoleForm();
              setOpenAddPoleModal(false);
              setIsClickable(true);
            }}
          >
            Enregister
          </button>
          <button
            className="dashboardPoleListModalButton"
            onClick={() => {
              setOpenAddPoleModal(false);
              setIsClickable(true);
            }}
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Modal d'édition d'un pole */}
      <div
        className={
          openEditPoleModal
            ? "dashboardPoleListModal"
            : "dashboardPoleListModalHidden"
        }
      >
        <h1 className="dashboardPoleListModalTitle">Modification d'un pôle</h1>
        <div className="dashboardPoleListModalTablesContainer">
          <form className="add-pole-form">
            <div className="add-pole-form-input">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                required
                autoComplete="name"
                id="name"
                name="name"
                value={editPoleName}
                onChange={(event) => {
                  setEditPoleName(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="name">Adresse</label>
              <input
                type="text"
                required
                autoComplete="address"
                id="address"
                name="address"
                value={editPoleAddress}
                onChange={(event) => {
                  setEditPoleAddress(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="zipCode">Code Postal</label>
              <input
                type="text"
                required
                autoComplete="zipCode"
                id="zipCode"
                name="zipCode"
                value={editPoleZipCode}
                onChange={(event) => {
                  setEditPoleZipCode(event.target.value);
                }}
              />
            </div>
            <div className="add-pole-form-input">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                required
                autoComplete="city"
                id="city"
                name="city"
                value={editPoleCity}
                onChange={(event) => {
                  setEditPoleCity(event.target.value);
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
                value={editPoleEmail}
                onChange={(event) => {
                  setEditPoleEmail(event.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <div className="dashboardPoleListModalButtonContainer">
          <button
            className="dashboardPoleListModalButton"
            onClick={async () => {
              await submitEditPoleForm();
            }}
          >
            Modifier
          </button>
          <button
            className="dashboardPoleListModalButton"
            onClick={() => {
              setOpenEditPoleModal(false);
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

export default DashboardPole;
