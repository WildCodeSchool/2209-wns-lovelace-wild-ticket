import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "./Home";
import { MemoryRouter } from "react-router";

const renderHome = (mock?: any) => {
  render(
    <MockedProvider mocks={mock}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("home", () => {
  describe("When accessing into the homepage", () => {
    it("should render the page itself", () => {
      renderHome();
    });

    it("should render a button used to access the dashboard", () => {
      renderHome();
      expect(
        screen.getByRole("button", { name: "Accès au dashboard R'Ticket" })
      ).toBeInTheDocument();
    });
  });
});
