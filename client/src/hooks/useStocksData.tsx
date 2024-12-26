import { useEffect, useMemo, useState } from "react";
import {getStocks, getStocksByExchange, Stock, StockExchange} from "../services/apiService.ts";
import { applyFilters } from "../services/filtersService.ts";

export const useStocksData = (
  query: string,
  stockExchangeId: string | undefined,
) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [activeStockExchange, setActiveStockExchange] = useState<StockExchange | undefined>()

  const refreshStockData = () => {
    if (stockExchangeId) {
      getStocksByExchange(stockExchangeId).then((data) => {
        setActiveStockExchange(data)
        setStocks(data?.stocks || [])
      });
    } else {
      getStocks().then((data) => setStocks(data));
    }
  }

  const filteredStocks = useMemo(() => {
   return applyFilters(stocks, {query})
  }, [query, stocks]);

  useEffect(() => {
    refreshStockData();
  }, []);

  return {
    stocks: filteredStocks,
    refreshStockData,
    activeStockExchange
  };
};
