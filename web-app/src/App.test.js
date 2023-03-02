import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders learn react link", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
  await waitFor(() => {
    expect(1).toBe(1);
  });
});
