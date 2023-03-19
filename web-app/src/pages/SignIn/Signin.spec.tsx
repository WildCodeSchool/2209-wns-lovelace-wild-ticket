import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignInMutation } from "../../gql/graphql";
import SignIn from "./SignIn";
import { SIGN_IN } from "../../queries/Queries";
import * as toastify from "react-toastify";

jest.mock("react-toastify");

const renderSignIn = (mock?: any) => {
  render(
    <MockedProvider mocks={mock}>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </MockedProvider>
  );
};

const submitForm = (email: string, password: string) => {
  fireEvent.change(screen.getByRole("textbox", { name: "Adresse email" }), {
    target: { value: email },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: password },
  });
  fireEvent.click(screen.getByRole("button", { name: "Valider" }));
};

const SIGN_IN_SUCCESS: MockedResponse<SignInMutation> = {
  request: {
    query: SIGN_IN,
    variables: {
      email: "vincent@r-ticket.com",
      password: "goodPassword",
      rememberMe: false,
    },
  },
  result: {
    data: {
      signIn: {
        id: "1",
        email: "vincent@r-ticket.com",
      },
    },
  },
};

const SIGN_IN_FAILURE: MockedResponse<SignInMutation> = {
  request: {
    query: SIGN_IN,
    variables: {
      email: "vincent@r-ticket.com",
      password: "wrongPassword",
      rememberMe: false,
    },
  },
  error: new Error("Argument Validation Error"),
};

describe("SignIn", () => {
  describe("before submission", () => {
    it("should render the page itself", () => {
      renderSignIn();
    });

    it("should render an authentication form", () => {
      renderSignIn();
      expect(
        screen.getByRole("textbox", { name: "Adresse email" })
      ).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Valider" })
      ).toBeInTheDocument();
    });
  });

  describe("after form submission", () => {
    describe("when user give bad credentials", () => {
      it("displays an error Toast", async () => {
        renderSignIn([SIGN_IN_FAILURE]);
        submitForm("vincent@r-ticket.com", "wrongPassword");
        await waitFor(() => {
          expect(toastify.toast.error).toHaveBeenCalled();
        });
      });
    });

    describe("when user give good credentials", () => {
      it("displays an success Toast", async () => {
        renderSignIn([SIGN_IN_SUCCESS]);
        submitForm("vincent@r-ticket.com", "goodPassword");
        await waitFor(() => {
          expect(toastify.toast.success).toHaveBeenCalled();
        });
      });
    });
  });
});
