import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Post from "./Post";

test("displays the correct post title", async () => {
  const postId = 1;
  const postTitle = "Sample Post Title";
  render(
    <MemoryRouter initialEntries={[`/posts/${postId}`]}>
      <Route path="/posts/:id">
        <Post />
      </Route>
    </MemoryRouter>
  );

  // Wait for the post and comments to load
  screen.getByText(postTitle);

  // Check that the post title is displayed correctly
  expect(screen.getByText(postTitle)).toBeInTheDocument();
});

test("allows the post owner to edit the post body", async () => {
  const postId = 1;
  const postBody = "Sample Post Body";
  const newBody = "New Post Body";
  render(
    <MemoryRouter initialEntries={[`/posts/${postId}`]}>
      <Route path="/posts/:id">
        <Post />
      </Route>
    </MemoryRouter>
  );

  // Wait for the post and comments to load
  screen.getByText(postBody);

  // Click on the post body to edit it
  const bodyElement = screen.getByText(postBody);
  fireEvent.click(bodyElement);

  // Enter the new post body and save the changes
  const newBodyInput = screen.getByLabelText("Enter New Text:");
  fireEvent.change(newBodyInput, { target: { value: newBody } });
  fireEvent.click(screen.getByText("OK"));

  // Check that the post body has been updated
  expect(screen.getByText(newBody)).toBeInTheDocument();
});
