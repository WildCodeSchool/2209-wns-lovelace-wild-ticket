import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { addMinutesToDate, substractMinutesToDate } from "../../../../services/DateService";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKET_BY_RESTAURANT_TYPES,
} from "../../../../types/DataTypes";
import DashboardTicketListStatus from "./DashboardTicketListStatus";

const renderDashboardTicketListStatus = (
  ticket: GET_TICKET_BY_RESTAURANT_TYPES,
  tables: GET_TABLES_BY_RESTAURANT_TYPES,
  mock?: any,
) => {
  render(
    <MockedProvider mocks={mock}>
      <MemoryRouter>
        <DashboardTicketListStatus ticket={ticket} tables={tables} />
      </MemoryRouter>
    </MockedProvider>
  );
};

const mockTicketCreatedAt: GET_TICKET_BY_RESTAURANT_TYPES =
  {
    __typename : "Ticket",
    id: "1",
    number: 1,
    name: "Vincent",
    seats: 2,
    email: "vincent@blabla.fr",
    phoneNumber: null,
    createdAt: substractMinutesToDate(new Date(), 10),
    deliveredAt: null,
    placedAt: null,
    closedAt: null,
    table: {
      __typename: 'Table',
      id: "1",
      number: 1,
    },
  };

  const mockTicketOkDeliveredAt: GET_TICKET_BY_RESTAURANT_TYPES =
  {
    __typename : "Ticket",
    id: "1",
    number: 1,
    name: "Vincent",
    seats: 2,
    email: "vincent@blabla.fr",
    phoneNumber: null,
    createdAt: substractMinutesToDate(new Date(), 1),
    deliveredAt: substractMinutesToDate(new Date(), 1),
    placedAt: null,
    closedAt: addMinutesToDate(new Date(), 4),
    table: {
      __typename: 'Table',
      id: "1",
      number: 1,
    },
  };

  const mockTicketNokDeliveredAt: GET_TICKET_BY_RESTAURANT_TYPES =
  {
    __typename : "Ticket",
    id: "1",
    number: 1,
    name: "Vincent",
    seats: 2,
    email: "vincent@blabla.fr",
    phoneNumber: null,
    createdAt: substractMinutesToDate(new Date(), 6),
    deliveredAt: substractMinutesToDate(new Date(), 6),
    placedAt: null,
    closedAt: new Date(),
    table: {
      __typename: 'Table',
      id: "1",
      number: 1,
    },
  };

  const mockTicketPlacedAt: GET_TICKET_BY_RESTAURANT_TYPES = 
  {
    __typename : "Ticket",
    id: "1",
    number: 1,
    name: "Vincent",
    seats: 2,
    email: "vincent@blabla.fr",
    phoneNumber: null,
    createdAt: substractMinutesToDate(new Date(), 10),
    deliveredAt: substractMinutesToDate(new Date(), 10),
    placedAt: substractMinutesToDate(new Date(), 10),
    closedAt: addMinutesToDate(new Date(), 180),
    table: {
      __typename: 'Table',
      id: "1",
      number: 1,
    },
  };

const mockAvailableTables: GET_TABLES_BY_RESTAURANT_TYPES = [
  {
    id: "1",
    number: 1,
    capacity: 4,
  },
  {
    id: "2",
    number: 2,
    capacity: 2,
  },
];

const mockNoAvailableTables: GET_TABLES_BY_RESTAURANT_TYPES = [
  {
    id: "1",
    number: 1,
    capacity: 4,
  },
  {
    id: "2",
    number: 2,
    capacity: 6,
  },
];

describe("DashboardTicketListStatus", () => {
  describe("when a ticket is created", () => {
    describe("when a table is not available", () => {
      it("should render 'waiting list' status", async () => {
        renderDashboardTicketListStatus(mockTicketCreatedAt, mockNoAvailableTables);
        expect(screen.getByText('En attente')).toBeInTheDocument();
      });
    })

    describe("when a table is available", () => {
      it("should render 'available table' status", async () => {
        renderDashboardTicketListStatus(mockTicketCreatedAt, mockAvailableTables);
        expect(screen.getByText('Table Disponible')).toBeInTheDocument();
      });
    })

  });

  describe("when a ticket is delivered", () => {
    describe("when the delay is respected", () => {
      it("should render 'waiting table' status", async () => {
        renderDashboardTicketListStatus(mockTicketOkDeliveredAt, mockAvailableTables);
        expect(screen.getByText('Attendu table 1')).toBeInTheDocument();
      });
    })

    describe("when the ticket is outdated", () => {
      it("should render 'free table' status", async () => {
        renderDashboardTicketListStatus(mockTicketNokDeliveredAt, mockAvailableTables);
        expect(screen.getByText('Table 1 libérée')).toBeInTheDocument();
      });
    })

  });

  describe("when the ticket is placed", () => {
    it("should render the table where the client is placed", async () => {
      renderDashboardTicketListStatus(mockTicketPlacedAt, mockAvailableTables);
      expect(screen.getByText('Table 1')).toBeInTheDocument();
    });
  })
});