import {appFetch} from "./interceptor.ts";

const API_URL = 'http://localhost:8080/api/v1/auth';

export const login = async (username: string, password: string) => {
    const url = `${API_URL}/login`;
    const data = {username, password};
    const response = await appFetch(url, {
        method: "POST",
        body: JSON.stringify(data)});
    if (!response.ok) {
        throw new Error(response.statusText);
    }
};

export const logout = async () => {
    const url = `${API_URL}/logout`;
    const response = await appFetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
};