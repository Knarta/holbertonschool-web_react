import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer.jsx";

test("should render footer with copyright text", () => {
  render(<Footer />);
  expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
});

test("should render footer with current year", () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
});
