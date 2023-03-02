import { render } from "@testing-library/react";
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
});
