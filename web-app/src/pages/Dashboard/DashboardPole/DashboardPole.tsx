import { useContext, useState } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import "./DashboardPole.scss";
import { GET_POLES_TYPES, GET_POLE_TYPES } from "../../../types/DataTypes";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreatePoleMutation,
  CreatePoleMutationVariables,
  DeletePoleMutation,
  DeletePoleMutationVariables,
  PolesQuery,
} from "../../../gql/graphql";
import { DELETE_POLE, GET_POLES } from "../../../queries/Queries";
import { CREATE_POLE } from "../../../queries/Queries";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils";
import SVGIconDelete from "../../../components/SVG/SVGIconDelete/SVGIconDelete";

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
      toast.success(`Vous avez créé un pôle avec succès.`);
      refetch();
    } catch (error) {
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
        <table className="ListTab">
          <thead className="ListTabHeader">
            <tr className="ListTabHeaderRow">
              <td>Nom</td>
              <td>Adresse</td>
              <td>Code Postale</td>
              <td>Ville</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className="ListTabBody">
            {poles &&
              poles.map((pole) => (
                <tr className="ListTabBodyRow">
                  <td>{pole.name}</td>
                  <td>{pole.address}</td>
                  <td>{pole.zipCode}</td>
                  <td>{pole.city}</td>
                  <td>{pole.email}</td>
                  <td>
                    <div className="ListTabBodyRowActionsButtonContainer">
                      <SVGIconDelete
                        onClick={async () => {
                          await confirmDelete(pole);
                        }}
                        isClickable={isClickable}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="DashboardPoleFooter"></footer>

      {/* Modal de confirmation de suppression */}
      <div
        className={
          openConfirmDeletePoleModal
            ? "dashboardPoleListModal"
            : "dashboardPoleListModalHidden"
        }
      >
        <h1 className="dashboardPoleListModalTitle">
          Voulez-vous clore le pôle "{poleName}" ?
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
    </section>
  );
};

export default DashboardPole;
