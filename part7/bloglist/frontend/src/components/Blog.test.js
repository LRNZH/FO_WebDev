import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("Existing Data - Blog Component", () => {
  const blog = {
    title: "Test blog",
    author: "John Doe",
    url: "https://testblog.com",
    likes: 5,
    user: {
      name: "Jane Doe",
      username: "jane",
      id: "123",
    },
  };

  test("renders title and author but not URL or likes by default", () => {
    render(<Blog blog={blog} />);

    const titleAndAuthor = screen.getByText(/"Test blog" by John Doe/);
    const url = screen.queryByText(/url:/);
    const likes = screen.queryByText(/likes:/);

    expect(titleAndAuthor).toBeInTheDocument();
    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });

  test("renders blog URL and number of likes when details button is clicked", () => {
    const component = render(<Blog blog={blog} />);
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("https://testblog.com");
    expect(component.container).toHaveTextContent("5");
  });

  test("clicking the like button twice calls event handler twice", () => {
    const mockHandler = jest.fn();
    const component = render(<Blog blog={blog} handleLike={mockHandler} />);
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe("New Data - BlogForm component", () => {
  test("submitting a new blog calls the event handler with the correct details", () => {
    const createBlog = jest.fn();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Test blog" } });

    const authorInput = screen.getByLabelText("Author");
    fireEvent.change(authorInput, { target: { value: "John Doe" } });

    const urlInput = screen.getByLabelText("Blog url");
    fireEvent.change(urlInput, { target: { value: "www.example.com" } });
    fireEvent.keyUp(urlInput, { key: "Enter", code: "Enter", keyCode: 13 });

    const likesInput = screen.getByLabelText("Likes");
    fireEvent.change(likesInput, { target: { value: "5" } });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "Test blog",
      author: "John Doe",
      url: "www.example.com",
      likes: 5,
    });
  });
});
