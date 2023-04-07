import React from "react";
import { render, screen } from "@testing-library/react";
import Channel from "./Channel.test";
import axios from "axios";

describe("Channel component", () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render a list of posts", async () => {
    // Mock axios get request
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        listOfPosts: [
          {
            id: 1,
            title: "Post 1",
            postText: "Post 1 text",
            UserId: 1,
            username: "User 1",
            Likes: [],
          },
          {
            id: 2,
            title: "Post 2",
            postText: "Post 2 text",
            UserId: 2,
            username: "User 2",
            Likes: [],
          },
        ],
        likedPosts: [],
      },
    });

    // Render the component
    render(<Channel />);

    // Check if all posts are rendered
    expect(await screen.findAllByRole("article")).toHaveLength(2);
  });

  test("should redirect to login if user is not authenticated", async () => {
    // Mock localStorage
    window.localStorage.__proto__.getItem.mockReturnValue(null);

    // Render the component
    render(<Channel />);

    // Check if user is redirected to login
    expect(
      await screen.findByText(/Redirecting to login page.../i)
    ).toBeInTheDocument();
  });

  test("should update the list of posts after liking a post", async () => {
    // Mock axios get request
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        listOfPosts: [
          {
            id: 1,
            title: "Post 1",
            postText: "Post 1 text",
            UserId: 1,
            username: "User 1",
            Likes: [],
          },
          {
            id: 2,
            title: "Post 2",
            postText: "Post 2 text",
            UserId: 2,
            username: "User 2",
            Likes: [],
          },
        ],
        likedPosts: [],
      },
    });

    // Mock axios post request
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {
        liked: true,
      },
    });

    // Render the component
    render(<Channel />);

    // Click the like button on the first post
    const likeButton = await screen.findByAltText(/like/i);
    likeButton.click();

    // Check if the list of posts is updated
    expect(await screen.findByText(/1/i)).toBeInTheDocument();
  });
});
