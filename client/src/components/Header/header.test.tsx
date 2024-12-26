import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header.tsx";
import "@testing-library/jest-dom";
import {useNavigate} from "react-router-dom";

describe("Header Component", () => {
  const queryHandlerMock = vi.fn();
  const modalStateHandlerMock= vi.fn();
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: vi.fn(),
      useLocation: vi.fn(()=> { return {"pathname": "/dashboard"}}),
    };
  });
  const mockedNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockedNavigate);

  it("renders filters correctly", () => {
    render(
      <Header
        queryHandler={queryHandlerMock}
        modalStateHandler={modalStateHandlerMock}
      />,
    );

    expect(
      screen.getByPlaceholderText("Filter by name"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Stocks" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Log Out" }),
    ).toBeInTheDocument();

  });

  it("calls queryHandler on input change", () => {
    render(
      <Header
        queryHandler={queryHandlerMock}
        modalStateHandler={modalStateHandlerMock}
      />,
    );

    const input = screen.getByPlaceholderText("Filter by name");
    fireEvent.change(input, { target: { value: "Test Query" } });

    expect(queryHandlerMock).toHaveBeenCalledTimes(1);
  });

  it("calls navigation button to Stocks", () => {
    render(
      <Header
        queryHandler={queryHandlerMock}
        modalStateHandler={modalStateHandlerMock}
      />,
    );

    const button = screen.getByRole("button", { name: "Stocks" });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/stocks');
  });
});
