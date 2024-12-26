import { renderHook } from "@testing-library/react-hooks";
import { useStockExchangesData } from "./useStockExchangesData.tsx";
import { vi, describe, expect, beforeEach, test } from "vitest";

const mockStockExchanges = [
  {
    "id": 1,
    "name": "Stock Exchange 1",
    "description": "Stock Exchange Description 1",
    "liveInMarket": true,
  },
  {
    "id": 2,
    "name": "Stock 2",
    "description": "Stock Exchange Description 2",
    "liveInMarket": false,
  },
  {
    "id": 3,
    "name": "Super Exchange 3",
    "description": "Stock Exchange Description 3",
    "liveInMarket": true,
  }
];

const mockFetchData = vi.fn();

vi.mock("../services/apiService", () => {
  return {
    getStockExchanges: (...args: undefined[]) => mockFetchData(...args),
  };
});

describe("useStockExchangeData", () => {
  beforeEach(() => {
    mockFetchData.mockResolvedValue(mockStockExchanges);
  });

  test("fetches StockExchanges data on initial render", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useStockExchangesData(""),
    );

    await waitForNextUpdate();

    expect(result.current.stockExchanges).toEqual(mockStockExchanges);
  });

  test("filters Stock Exchange by query", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useStockExchangesData("2"),
    );

    await waitForNextUpdate();

    expect(result.current.stockExchanges).toHaveLength(1);
    expect(result.current.stockExchanges[0].name).toBe("Stock 2");
  });

  test("filters Stock Exchanges by case sensitive query", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useStockExchangesData("Super"),
    );

    await waitForNextUpdate();

    expect(result.current.stockExchanges).toHaveLength(1);
    expect(result.current.stockExchanges[0].name).toBe("Super Exchange 3");
  });

});
