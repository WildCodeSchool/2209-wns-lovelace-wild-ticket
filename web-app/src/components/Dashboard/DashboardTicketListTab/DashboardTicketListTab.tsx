import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import {
  BUTTON_DISAPPEAR_DELAY,
  MAX_DELIVERED_TICKET_DELAY,
  TICKET_DISAPPEAR_DELAY,
} from "../../../constants/Constants";
import {
  addMinutesToDate,
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
  dataHead,
  tickets,
  tables,
  isLoading,
  handleDelete,
  handleDeliver,
  handlePlace,
}: {
  dataHead: string[];
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES;
  tables: GET_TABLES_BY_RESTAURANT_TYPES;
  isLoading: boolean;
  handleDelete: (ticketId: string) => Promise<void>;
  handleDeliver: (ticketId: string, tableId: string) => Promise<void>;
  handlePlace: (ticketId: string) => Promise<void>;
}) {
  const [ticketId, setTicketId] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");
  const [ticketNumber, setTicketNumber] = useState<number>(0);
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
    const convertedSeatsToTableCapacity = (seatsTicket % 2 === 0) ? seatsTicket : seatsTicket + 1;
    const availableTables: GET_TABLES_BY_RESTAURANT_TYPES | undefined =
      tables?.filter(
        (table) => table.capacity === convertedSeatsToTableCapacity
      );

    return availableTables && availableTables.length !== 0 ? true : false;
  };

  const confirmDeliver = async (ticket: GET_TICKET_BY_RESTAURANT_TYPES) => {
    const ticketSeats = ticket?.seats as number;
    setAvailableTables((ticketSeats % 2 === 0) ? ticketSeats : ticketSeats + 1);
    setTicketId(ticket?.id as string);
    setOpenConfirmDeliveredAtModal(true);
    setIsClickable(false);
  };

  const confirmPlace = async (ticket: GET_TICKET_BY_RESTAURANT_TYPES) => {
    setTicketId(ticket?.id as string);
    setTicketNumber(ticket?.number as number);
    setOpenConfirmPlacedAtModal(true);
    setIsClickable(false);
  };

  const confirmDelete = async (ticket: GET_TICKET_BY_RESTAURANT_TYPES) => {
    setTicketNumber(ticket?.number as number);
    setTicketId(ticket?.id as string);
    setOpenConfirmClosedAtModal(true);
    setIsClickable(false);
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
          Voulez-vous placer le ticket n° {ticketNumber} ?
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
          Voulez-vous clore le ticket n° {ticketNumber} ?
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
      <table className="ListTab">
        <thead className="ListTabHeader">
          <tr className="ListTabHeaderRow">
            {dataHead.map((headContent) => (
              <th key={headContent}>{headContent}</th>
            ))}
          </tr>
        </thead>
        <tbody className="ListTabBody">
          <tr>
            <td colSpan={6} className="ListTabBodyTitleRow">
              Tickets non placés
            </td>
          </tr>
          {tickets &&
            tickets
              .filter(
                (ticket) =>
                  ticket.placedAt === null &&
                  ((ticket.deliveredAt !== null &&
                    addMinutesToDate(
                      new Date(ticket.closedAt),
                      TICKET_DISAPPEAR_DELAY
                    ) > new Date()) ||
                    ticket.closedAt === null)
              )
              .sort((a, b) => a.number - b.number)
              .map((ticket) => (
                <tr key={ticket.number} className="ListTabBodyRow">
                  <td>{ticket.number}</td>
                  <td>{ticket.name}</td>
                  <td>{ticket.seats}</td>
                  <td>{waitingTime(ticket.createdAt)} mn</td>
                  <td>
                    <DashboardTicketListStatus
                      ticket={ticket}
                      tables={tables}
                    />
                  </td>
                  <td className="ListTabBodyActions">
                    <div className="ListTabBodyRowActionsButtonContainer">
                      {ticket?.deliveredAt !== null &&
                        new Date(ticket?.closedAt) >
                          substractMinutesToDate(
                            new Date(),
                            BUTTON_DISAPPEAR_DELAY
                          ) && (
                          <SVGIconValid
                            onClick={async () => {
                              await confirmPlace(ticket);
                            }}
                            isClickable={isClickable}
                          />
                        )}
                      {ticket?.placedAt === null &&
                        ticket?.closedAt === null &&
                        isTableAvailable(tables, ticket.seats) && (
                          <SVGIconAdd
                            onClick={async () => {
                              await confirmDeliver(ticket);
                            }}
                            isClickable={isClickable}
                          />
                        )}
                      {((ticket.deliveredAt !== null &&
                        new Date(ticket.closedAt) > new Date()) ||
                        ticket.closedAt === null) && (
                        <SVGIconDelete
                          onClick={async () => {
                            await confirmDelete(ticket);
                          }}
                          isClickable={isClickable}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          <tr>
            <td colSpan={6} className="ListTabBodyTitleRow">
              Tickets Placés
            </td>
          </tr>
          {tickets &&
            tickets
              .filter(
                (ticket) =>
                  ticket.deliveredAt !== null &&
                  ticket.placedAt !== null &&
                  new Date(ticket.closedAt) >
                    addMinutesToDate(new Date(), MAX_DELIVERED_TICKET_DELAY)
              )
              .sort((a, b) => a.number - b.number)
              .map((ticket) => (
                <tr key={ticket.number} className="ListTabBodyRow">
                  <td>{ticket.number}</td>
                  <td>{ticket.name}</td>
                  <td>{ticket.seats}</td>
                  <td>-</td>
                  <td>
                    <DashboardTicketListStatus
                      ticket={ticket}
                      tables={tables}
                    />
                  </td>
                  <td className="ListTabBodyActions">
                    <div className="ListTabBodyRowActionsButtonContainer">
                      <SVGIconDelete
                        onClick={async () => {
                          await confirmDelete(ticket);
                        }}
                        isClickable={isClickable}
                      />
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}
