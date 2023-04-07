import React from "react";
import axios from "axios";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ChannelsList from "./ChannelsList";
import { AuthContext } from "../helpers/AuthContext";

jest.mock("axios");

describe("ChannelsList", () => {
  const channels = [
    { id: 1, channelName: "News" },
    { id: 2, channelName: "Sports" },
    { id: 3, channelName: "Music" },
  ];

  const authState = {
    status: "authenticated",
    username: "admin",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all channels fetched from the server", async () => {
    axios.get.mockResolvedValue({ data: channels });

    render(
      <MemoryRouter>
        <ChannelsList />
      </MemoryRouter>
    );

    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
  });

  test("renders a delete button for each channel if the user is admin", async () => {
    axios.get.mockResolvedValue({ data: channels });

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ authState }}>
          <ChannelsList />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Delete Channel")).toHaveLength(3);
    });
  });

  test("does not render delete buttons if the user is not admin", async () => {
    axios.get.mockResolvedValue({ data: channels });

    const userAuthState = {
      status: "authenticated",
      username: "user",
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ authState: userAuthState }}>
          <ChannelsList />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Delete Channel")).not.toBeInTheDocument();
    });
  });

  test("calls the delete channel API when the delete button is clicked", async () => {
    axios.get.mockResolvedValue({ data: channels });
    axios.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ authState }}>
          <ChannelsList />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const deleteButtons = await screen.findAllByText("Delete Channel");
    fireEvent.click(deleteButtons[0]);

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8081/channels/1",
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    );
  });

  test("removes the channel from the list when the delete button is clicked", async () => {
    axios.get.mockResolvedValue({ data: channels });
    axios.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ authState }}>
          <ChannelsList />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const deleteButtons = await screen.findAllByText("Delete Channel");
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("News")).not.toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
  });
});
