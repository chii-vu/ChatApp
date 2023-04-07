import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

test("renders App component", () => {
  render(<App />);
});

jest.mock("axios");

test("axios call is made with correct endpoint and headers", async () => {
  axios.get.mockResolvedValueOnce({ data: {} });
  render(<App />);
  expect(axios.get).toHaveBeenCalledWith("http://localhost:8081/auth/auth", {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  });
});

test("logout function clears access token and resets auth state", () => {
  localStorage.setItem("accessToken", "test_token");
  const { getByText } = render(<App />);
  fireEvent.click(screen.getByText("Sign Out"));
  expect(localStorage.getItem("accessToken")).toBeNull();
  expect(screen.getByText("Login")).toBeInTheDocument();
});

test("renders correct Links based on auth status", () => {
  const { getByText, queryByText } = render(<App />);
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Registration")).toBeInTheDocument();
  expect(screen.queryByText("Channels")).toBeNull();
  expect(screen.queryByText("Users")).toBeNull();
  expect(screen.queryByText("Posts")).toBeNull();
});

test("renders correct page based on URL", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Channels")).toBeInTheDocument();
  expect(screen.queryByText("All Posts")).toBeNull();
});

test("renders 404 page for unknown URLs", () => {
  render(
    <MemoryRouter initialEntries={["/unknown"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("404 Page Not Found")).toBeInTheDocument();
});
