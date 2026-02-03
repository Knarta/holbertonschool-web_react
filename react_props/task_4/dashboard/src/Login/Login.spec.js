import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Login from "./Login.jsx";

test("should render login text", () => {
  render(<Login />);
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
});

test("should render two input fields", () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("should render email label and input", () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("should render password label and input", () => {
  render(<Login />);
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("should render OK button", () => {
  render(<Login />);
  expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
});
