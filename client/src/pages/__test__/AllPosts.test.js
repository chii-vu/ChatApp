import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import AllPosts from "./AllPosts";

jest.mock("axios");

describe("AllPosts", () => {
  beforeEach(() => {
    localStorage.setItem("accessToken", "mocktoken");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders All Posts header", async () => {
    axios.get.mockResolvedValueOnce({
      data: { listOfPosts: [], likedPosts: [] },
    });
    render(<AllPosts />);
    const headerElement = screen.getByText(/All Posts/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("fetches and displays posts correctly", async () => {
    const mockPosts = [
      {
        id: 1,
        title: "Post 1",
        postText: "This is post 1",
        username: "user1",
        createdAt: "2021-04-06T15:40:00.000Z",
        updatedAt: "2021-04-06T15:40:00.000Z",
        Likes: [{}, {}, {}],
      },
      {
        id: 2,
        title: "Post 2",
        postText: "This is post 2",
        username: "user2",
        createdAt: "2021-04-06T15:45:00.000Z",
        updatedAt: "2021-04-06T15:45:00.000Z",
        Likes: [{}, {}],
      },
    ];
    axios.get.mockResolvedValueOnce({
      data: { listOfPosts: mockPosts, likedPosts: [1] },
    });
    render(<AllPosts />);
    const postElements = await screen.findAllByRole("article");
    expect(postElements).toHaveLength(2);
    expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/This is post 2/i)).toBeInTheDocument();
  });

  test("filters posts by keyword", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", postText: "This is post 1" },
      { id: 2, title: "Post 2", postText: "This is post 2" },
      { id: 3, title: "Another post", postText: "This is another post" },
    ];
    axios.get.mockResolvedValueOnce({
      data: { listOfPosts: mockPosts, likedPosts: [] },
    });
    render(<AllPosts />);
    const searchInput = screen.getByPlaceholderText(/Keyword/i);
    fireEvent.change(searchInput, { target: { value: "post" } });
    const postElements = await screen.findAllByRole("article");
    expect(postElements).toHaveLength(2);
    expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/This is post 2/i)).toBeInTheDocument();
  });

  test("filters posts by username", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", username: "user1" },
      { id: 2, title: "Post 2", username: "user2" },
      { id: 3, title: "Another post", username: "user1" },
    ];
    axios.get.mockResolvedValueOnce({
      data: { listOfPosts: mockPosts, likedPosts: [] },
    });
    render(<AllPosts />);
    const searchInput = screen.getByPlaceholderText(/User/i);
    fireEvent.change(searchInput, { target: { value: "user1" } });
    const postElements = await screen.findAllByRole("article");
    expect(postElements).toHaveLength(2);
    expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Another post/i)).toBeInTheDocument();
  });
});
