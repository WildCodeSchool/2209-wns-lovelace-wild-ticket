import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import DashboardTicket from "./DashboardTicket";
import {
  substractMinutesToDate,
  addMinutesToDate,
} from "../../../services/DateService";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";

import { MemoryRouter } from "react-router-dom";

const renderDashboardTicket = (mock?: any) => {
  render(
    <MockedProvider mocks={mock}>
      <MemoryRouter>
        <DashboardTicket />
      </MemoryRouter>
    </MockedProvider>
  );
};

const getEmptyTables = (
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
  tables: GET_TABLES_BY_RESTAURANT_TYPES
): GET_TABLES_BY_RESTAURANT_TYPES => {
  const placedTickets: (number | undefined)[] = [];
  const emptyTables: GET_TABLES_BY_RESTAURANT_TYPES = [];

  tickets
    ?.filter((ticket) => new Date(ticket.closedAt) > new Date())
    .map((ticket) => placedTickets.push(ticket.table?.number));

  tables
    ?.filter((table) => !placedTickets?.includes(table.number))
    .map((table) => emptyTables.push(table));

  return emptyTables;
};

const mockTickets: GET_TICKETS_BY_RESTAURANT_TYPES = [
  {
    id: "1",
    number: "1",
    name: "Vincent",
    seats: 2,
    email: "vincent@blabla.fr",
    createdAt: substractMinutesToDate(new Date(), 10),
    table: {
      id: "1",
      number: 1,
    },
    closedAt: addMinutesToDate(new Date(), 120),
  },
];

const mockTables: GET_TABLES_BY_RESTAURANT_TYPES = [
  {
    id: "1",
    number: 1,
    capacity: 2,
  },
  {
    id: "2",
    number: 2,
    capacity: 3,
  },
];

describe("DashboardTicket", () => {
  describe("function GetEmptyTables", () => {
    it("should return empty tables", () => {});
    const emptyTables = getEmptyTables(mockTickets, mockTables);
    expect(emptyTables).toEqual([
      {
        id: "2",
        number: 2,
        capacity: 3,
      },
    ]);
  });

  describe("when the user arrive on the page", () => {
    it("should render the page itself", async () => {
      renderDashboardTicket();
      expect(screen.getByText("Tickets Placés")).toBeInTheDocument();
    });
  });
});
