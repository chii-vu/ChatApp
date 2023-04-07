import axios from "axios";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Post from "./Post";

jest.mock("axios");

const mockPostData = {
  id: 1,
  title: "Test post title",
  postText: "Test post body",
  username: "testuser",
};

const mockCommentData = [
  { id: 1, commentBody: "Test comment 1", username: "testuser1" },
  { id: 2, commentBody: "Test comment 2", username: "testuser2" },
];

test("fetches post and comments from API and displays them", async () => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case "http://localhost:8081/posts/byId/1":
        return Promise.resolve({ data: mockPostData });
      case "http://localhost:8081/comments/1":
        return Promise.resolve({ data: mockCommentData });
      default:
        return Promise.reject(new Error("not found"));
    }
  });

  render(
    <MemoryRouter initialEntries={["/posts/1"]}>
      <Route path="/posts/:id">
        <Post />
      </Route>
    </MemoryRouter>
  );

  expect(screen.getByText("Test post title")).toBeInTheDocument();
  expect(screen.getByText("Test post body")).toBeInTheDocument();
  expect(screen.getByText("testuser")).toBeInTheDocument();

  expect(screen.getByText("Test comment 1")).toBeInTheDocument();
  expect(screen.getByText("Test comment 2")).toBeInTheDocument();
});

test("deletes post and redirects to homepage", async () => {
  axios.get.mockResolvedValue({ data: mockPostData });
  axios.delete.mockResolvedValue({ data: "success" });

  const mockNavigate = jest.fn();

  render(
    <MemoryRouter initialEntries={["/posts/1"]}>
      <Route path="/posts/:id">
        <Post />
      </Route>
    </MemoryRouter>,
    {
      navigate: mockNavigate,
    }
  );

  const deleteButton = screen.getByText("Delete Post");
  expect(deleteButton).toBeInTheDocument();

  deleteButton.click();

  expect(axios.delete).toHaveBeenCalledWith("http://localhost:8081/posts/1", {
    headers: { accessToken: null },
  });

  expect(mockNavigate).toHaveBeenCalledWith("/");
});
