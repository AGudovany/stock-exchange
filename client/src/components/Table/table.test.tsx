import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Table from "./Table";
import { expect, test, describe, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";

const mockColumns = [
  { field: "name", title: "Name", onClick: (key: number) => console.log(key) },
  { field: "description", title: "Description" },
  { field: "liveInMarket", title: "Live in Market", type: "boolean" },
];

const mockRows = [
  { id: 1, name: "Stock A", description: "First Stock", liveInMarket: true },
  { id: 2, name: "Stock B", description: "Second Stock", liveInMarket: false },
];

describe("Table component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders table with correct columns and rows", () => {
    render(<Table columns={mockColumns} rows={mockRows} />);

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });

    mockRows.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.description)).toBeInTheDocument();
      expect(screen.getByText(row.liveInMarket ? "Yes" : "No")).toBeInTheDocument();
    });
  });

  test("triggers onClick when cell is clicked", () => {
    const handleClick = vi.fn();
    const columnsWithClick = [
      ...mockColumns.slice(1),
      { field: "name", title: "Name", onClick: handleClick},
    ];

    render(<Table columns={columnsWithClick} rows={mockRows} />);

    const clickableCell = screen.getByText("Stock A");
    fireEvent.click(clickableCell);

    expect(handleClick).toHaveBeenCalledWith(1);
  });

  test("triggers onClick when Enter or Space is pressed", () => {
    const handleClick = vi.fn();
    const columnsWithClick = [
      ...mockColumns.slice(1),
      { field: "name", title: "Name", onClick: handleClick},
    ];

    render(<Table columns={columnsWithClick} rows={mockRows} />);

    const clickableCell = screen.getByText("Stock A");
    fireEvent.keyDown(clickableCell, { key: "Enter" });

    expect(handleClick).toHaveBeenCalledWith(1);

    fireEvent.keyDown(clickableCell, { key: " " });

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test("applies correct styling for clickable cells", () => {
    render(<Table columns={mockColumns} rows={mockRows} />);

    const clickableCell = screen.getByText("Stock A");
    expect(clickableCell).toHaveStyle({ cursor: "pointer" });
  });

});
