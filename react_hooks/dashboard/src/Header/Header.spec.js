import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Header from "./Header.jsx";

test("should render header with logo", () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test("should render header with title", () => {
  render(<Header />);
  expect(screen.getByRole("heading")).toHaveTextContent(/School dashboard/i);
});
