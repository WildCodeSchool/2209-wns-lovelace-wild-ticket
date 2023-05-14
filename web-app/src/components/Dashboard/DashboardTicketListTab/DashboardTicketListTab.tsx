import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InfinitySpin } from "react-loader-spinner";
import { BUTTON_DISAPPEAR_DELAY } from "../../../constants/Constants";
import {
  substractMinutesToDate,
  waitingTime,
} from "../../../services/DateService";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
  GET_TICKET_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import SVGIconAdd from "../../SVG/SVGIconAdd/SVGIconAdd";
import SVGIconDelete from "../../SVG/SVGIconDelete/SVGIconDelete";
import SVGIconValid from "../../SVG/SVGIconValid/SVGIconValid";
import DashboardTicketListStatus from "./DashboardTicketListStatus/DashboardTicketListStatus";
import "./DashboardTicketListTab.scss";

export default function DashboardTicketListTab({
  waitingTickets,
  placedTickets,
  tables,
  isLoading,
  handleDelete,
  handleDeliver,
  handlePlace,
}: {
  waitingTickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  placedTickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  tables: GET_TABLES_BY_RESTAURANT_TYPES;
  isLoading: boolean;
  handleDelete: (ticketId: string) => Promise<void>;
  handleDeliver: (ticketId: string, tableId: string) => Promise<void>;
  handlePlace: (ticketId: string) => Promise<void>;
}) {
  const [ticketId, setTicketId] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [openConfirmClosedAtModal, setOpenConfirmClosedAtModal] =
    useState<boolean>(false);
  const [openConfirmDeliveredAtModal, setOpenConfirmDeliveredAtModal] =
    useState<boolean>(false);
  const [openConfirmPlacedAtModal, setOpenConfirmPlacedAtModal] =
    useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [availableTables, setAvailableTables] = useState<number>(0);
  const [activeButtonTableId, setActiveButtonTableId] = useState<string>("");

  const isTableAvailable = (
    tables: GET_TABLES_BY_RESTAURANT_TYPES,
    seatsTicket: number
  ) => {
    const convertedSeatsToTableCapacity =
      seatsTicket % 2 === 0 ? seatsTicket : seatsTicket + 1;
    const availableTables: GET_TABLES_BY_RESTAURANT_TYPES | undefined =
      tables?.filter(
        (table) => table.capacity === convertedSeatsToTableCapacity
      );

    return availableTables && availableTables.length !== 0 ? true : false;
  };

  const confirmDeliver = async (ticket: GET_TICKET_BY_RESTAURANT_TYPES) => {
    const ticketSeats = ticket?.seats as number;
    setAvailableTables(ticketSeats % 2 === 0 ? ticketSeats : ticketSeats + 1);
    setTicketId(ticket?.id as string);
    setOpenConfirmDeliveredAtModal(true);
    setIsClickable(false);
  };

  const confirmPlace = async (ticket: GET_TICKET_BY_RESTAURANT_TYPES) => {
    setTicketId(ticket?.id as string);
    setTicketNumber(ticket?.number as string);
    setOpenConfirmPlacedAtModal(true);
    setIsClickable(false);
  };

  const confirmDelete = async (ticket: GET_TICKET_BY_RESTAURANT_TYPES) => {
    setTicketNumber(ticket?.number as string);
    setTicketId(ticket?.id as string);
    setOpenConfirmClosedAtModal(true);
    setIsClickable(false);
  };

  const waitingTimes = (waitingTicket: any) => {
    return <p>{waitingTime(waitingTicket.createdAt)} mn</p>;
  };

  const waitingTicketsStatus = (waitingTicket: any) => {
    return <DashboardTicketListStatus ticket={waitingTicket} tables={tables} />;
  };

  const placedTicketsStatus = (placedTicket: any) => {
    return <DashboardTicketListStatus ticket={placedTicket} tables={tables} />;
  };

  const waitingTicketsActions = (waitingTicket: any) => {
    return (
      <div className="ListTabBodyRowActionsButtonContainer">
        {waitingTicket.deliveredAt !== null &&
          new Date(waitingTicket.closedAt) >
            substractMinutesToDate(new Date(), BUTTON_DISAPPEAR_DELAY) && (
            <SVGIconValid
              onClick={async () => {
                await confirmPlace(waitingTicket);
              }}
              isClickable={isClickable}
            />
          )}
        {waitingTicket?.placedAt === null &&
          waitingTicket?.closedAt === null &&
          isTableAvailable(tables, waitingTicket.seats) && (
            <SVGIconAdd
              onClick={async () => {
                await confirmDeliver(waitingTicket);
              }}
              isClickable={isClickable}
            />
          )}
        {((waitingTicket.deliveredAt !== null &&
          new Date(waitingTicket.closedAt) > new Date()) ||
          waitingTicket.closedAt === null) && (
          <SVGIconDelete
            onClick={async () => {
              await confirmDelete(waitingTicket);
            }}
            isClickable={isClickable}
          />
        )}
      </div>
    );
  };

  const placedTicketsActions = (placedTicket: any) => {
    return (
      <div className="ListTabBodyRowActionsButtonContainer">
        <SVGIconDelete
          onClick={async () => {
            await confirmDelete(placedTicket);
          }}
          isClickable={isClickable}
        />
      </div>
    );
  };

  return isLoading ? (
    <div className="loadingSpinContainer">
      <div className="loadingSpin">
        <InfinitySpin width="200" color="#155e75" />
      </div>
    </div>
  ) : (
    <>
      <div
        className={
          openConfirmDeliveredAtModal
            ? "dashboardTicketListModal"
            : "dashboardTicketListModalHidden"
        }
      >
        <h1 className="dashboardTicketListModalTitle">
          Veuillez choisir une table disponible
        </h1>
        <div className="dashboardTicketListModalTablesContainer">
          {tables &&
            tables
              .filter((table) => table.capacity === availableTables)
              .sort((a, b) => a.number - b.number)
              .map((table, index) => (
                <button
                  key={index}
                  className={
                    activeButtonTableId === table.id
                      ? "dashboardTicketListModalButton dashboardTicketListModalButtonActive"
                      : "dashboardTicketListModalButton"
                  }
                  onClick={async () => {
                    setTableId(table.id);
                    setActiveButtonTableId(table.id);
                  }}
                >
                  {table.number}
                </button>
              ))}
        </div>
        <div className="dashboardTicketListModalButtonContainer">
          <button
            className="dashboardTicketListModalButton"
            onClick={async () => {
              await handleDeliver(ticketId, tableId);
              setOpenConfirmDeliveredAtModal(false);
              setIsClickable(true);
            }}
          >
            Sélectionner
          </button>
          <button
            className="dashboardTicketListModalButton"
            onClick={() => {
              setOpenConfirmDeliveredAtModal(false);
              setIsClickable(true);
              setActiveButtonTableId("");
            }}
          >
            Annuler
          </button>
        </div>
      </div>
      <div
        className={
          openConfirmPlacedAtModal
            ? "dashboardTicketListModal"
            : "dashboardTicketListModalHidden"
        }
      >
        <h1 className="dashboardTicketListModalTitle">
          Voulez-vous placer le ticket <br />
          n° {ticketNumber} ?
        </h1>
        <div className="dashboardTicketListModalButtonContainer">
          <button
            className="dashboardTicketListModalButton"
            onClick={async () => {
              await handlePlace(ticketId);
              setOpenConfirmPlacedAtModal(false);
              setIsClickable(true);
            }}
          >
            Oui
          </button>
          <button
            className="dashboardTicketListModalButton"
            onClick={() => {
              setOpenConfirmPlacedAtModal(false);
              setIsClickable(true);
            }}
          >
            Non
          </button>
        </div>
      </div>
      <div
        className={
          openConfirmClosedAtModal
            ? "dashboardTicketListModal"
            : "dashboardTicketListModalHidden"
        }
      >
        <h1 className="dashboardTicketListModalTitle">
          Voulez-vous clore le ticket <br />
          n° {ticketNumber} ?
        </h1>
        <div className="dashboardTicketListModalButtonContainer">
          <button
            className="dashboardTicketListModalButton"
            onClick={async () => {
              await handleDelete(ticketId);
              setOpenConfirmClosedAtModal(false);
              setIsClickable(true);
            }}
          >
            Oui
          </button>
          <button
            className="dashboardTicketListModalButton"
            onClick={() => {
              setOpenConfirmClosedAtModal(false);
              setIsClickable(true);
            }}
          >
            Non
          </button>
        </div>
      </div>
      <div className="DashboardTicketListTabContainer">
        {waitingTickets && (
          <DataTable
            value={undefined}
            rows={0}
            className="DashboardTicketListTabHeaderTable"
            tableStyle={{ width: "100%" }}
            size="small"
          >
            <Column
              style={{ textAlign: "center" }}
              className="DashboardTicketListTabNumberColumn"
              header="N° Ticket"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              className="DashboardTicketListTabNameColumn"
              header="Nom"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              className="DashboardTicketListTabSeatsColumn"
              header="Couverts"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              className="DashboardTicketListTabWaitingColumn"
              header="Attente"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              className="DashboardTicketListTabStatusColumn"
              header="Statut"
            ></Column>
            <Column
              style={{ textAlign: "center" }}
              className="DashboardTicketListTabActionsColumn"
              header="Action"
            ></Column>
          </DataTable>
        )}
        <div className="DashboardTicketListTabWaitingDataTableContainer">
          {waitingTickets && (
            <DataTable
              value={waitingTickets}
              className="DashboardTicketListTabWaitingDataTable"
              tableStyle={{ width: "100%" }}
              size="small"
              emptyMessage="Aucun ticket en attente"
            >
              <Column
                style={{ textAlign: "center" }}
                className="DashboardTicketListTabNumberColumn"
                body={(ticket) => {
                  return parseInt(ticket.number.split("-")[2], 10);
                }}
              ></Column>
              <Column
                style={{ textAlign: "center" }}
                className="DashboardTicketListTabNameColumn"
                field="name"
              ></Column>
              <Column
                style={{ textAlign: "center" }}
                className="DashboardTicketListTabSeatsColumn"
                field="seats"
              ></Column>
              <Column
                style={{ textAlign: "center" }}
                className="DashboardTicketListTabWaitingColumn"
                body={waitingTimes}
              ></Column>
              <Column
                style={{ textAlign: "center" }}
                className="DashboardTicketListTabStatusColumn"
                body={waitingTicketsStatus}
              ></Column>
              <Column
                style={{ textAlign: "center" }}
                className="DashboardTicketListTabActionsColumn"
                body={waitingTicketsActions}
              ></Column>
            </DataTable>
          )}
        </div>
      </div>
      {placedTickets && (
        <DataTable
          value={placedTickets}
          className="DashboardTicketListTabPlacedDataTable"
          tableStyle={{ width: "100%" }}
          scrollable={true}
          size="small"
          emptyMessage="Aucun ticket placé"
        >
          <Column
            style={{ textAlign: "center" }}
            className="DashboardTicketListTabNumberColumn"
            body={(ticket) => {
              return parseInt(ticket.number.split("-")[2], 10);
            }}
          ></Column>
          <Column
            style={{ textAlign: "center" }}
            className="DashboardTicketListTabNameColumn"
            field="name"
          ></Column>
          <Column
            style={{ textAlign: "center" }}
            className="DashboardTicketListTabSeatsColumn"
            field="seats"
          ></Column>
          <Column
            style={{ textAlign: "center" }}
            className="DashboardTicketListTabWaitingColumn"
            body={<p>-</p>}
          ></Column>
          <Column
            style={{ textAlign: "center" }}
            className="DashboardTicketListTabStatusColumn"
            body={placedTicketsStatus}
          ></Column>
          <Column
            style={{ textAlign: "center" }}
            className="DashboardTicketListTabActionsColumn"
            body={placedTicketsActions}
          ></Column>
        </DataTable>
      )}
    </>
  );
}
