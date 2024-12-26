import {useEffect, useMemo, useState} from "react";
import {getStockExchanges, StockExchange} from "../services/apiService.ts";
import {applyFilters} from "../services/filtersService.ts";

export const useStockExchangesData = (
    query: string,
) => {
    const [stockExchanges, setStockExchanges] = useState<StockExchange[]>([]);

    const refreshStockExchangeData = () => {
        getStockExchanges().then((data) => setStockExchanges(data));
    }

    const filteredStockExchanges = useMemo(() => {
        return applyFilters(stockExchanges, {query})
    }, [query, stockExchanges]);

    useEffect(() => {
        refreshStockExchangeData();
    }, []);

    return {
        stockExchanges: filteredStockExchanges,
        refreshStockExchangeData
    };
};
