import {appFetch} from "./interceptor.ts";

const baseURL = "http://localhost:8080/api/v1";

export type StockExchange = {
    [key: string]: any;
    id: number;
    name: string;
    description: string;
    liveInMarket?: boolean;
    stocks?: Stock[];
};

export type Stock = {
    [key: string]: any;
    id: number;
    name: string;
    description: string;
    currentPrice: number;
    lastUpdate?: string;
};

export const getStockExchanges = async (): Promise<StockExchange[]> => {
    const url = `${baseURL}/exchanges`;
    const response = await appFetch(url);
    if (!response.ok) {
        throw new Error("Failed to get Stock Exchanges");
    }
    return response.json();
};

export const createStockExchange = async (data: Partial<StockExchange>): Promise<StockExchange> => {
    const url = `${baseURL}/exchanges`;
    const response = await appFetch(url, {
        method: "POST",
        body: JSON.stringify(data)});
    if (!response.ok) {
        throw new Error("Failed to create Stock Exchanges");
    }
    return response.json();
};

export const getStocks = async (): Promise<Stock[]> => {
    const url = `${baseURL}/stocks`;
    const response = await appFetch(url);
    if (!response.ok) {
        throw new Error("Failed to get Stock");
    }
    return response.json();
};

export const createStock = async (data: Partial<Stock>): Promise<Stock> => {
    const url = `${baseURL}/stocks`;
    const response = await appFetch(url, {
        method: "POST",
        body: JSON.stringify(data)});
    if (!response.ok) {
        throw new Error("Failed to create Stock");
    }
    return response.json();
};

export const getStocksByExchange = async (exchangeId: string): Promise<StockExchange> => {
    const url = `${baseURL}/exchanges/${exchangeId}`;
    const response = await appFetch(url);
    if (!response.ok) {
        throw new Error("Failed to get Stock from Stock Exchange");
    }
    return response.json();
};

export const addStockToExchange = async (exchangeId: string, data: Partial<Stock>): Promise<Stock> => {
    const url = `${baseURL}/exchanges/${exchangeId}/stocks`;
    const response = await appFetch(url, {
        method: "POST",
        body: JSON.stringify(data)});
    if (!response.ok) {
        throw new Error("Failed to add Stock to Stock Exchange");
    }
    return response.json();
};
