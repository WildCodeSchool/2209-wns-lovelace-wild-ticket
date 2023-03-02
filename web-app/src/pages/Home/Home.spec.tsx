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
  it("should render", () => {
    renderHome();
  });

  it("should render a button used to go to Sign-In page", () => {
    renderHome();
    expect(screen.getByRole('button', {name: "Accès au dashboard R'Ticket"})).toBeInTheDocument();

    describe("on button click", () => {
      describe("if user's logged in", () => {
        const isAuthenticated = true;
        it("should redirect him on 'DASHBOARD_HOME", () => {});
      });
      describe("if user's not logged in", () => {
        const isAuthenticated = false;
        it("should redirect him on 'SIGN_IN_PATH", () => {});
      });
    });
  });
});
