// interceptor.js
type Options = {
    headers?: Record<string, string>,
    method?: string,
    body?: string,
}

export const appFetch = async (url: string, options: Options = {}) => {
    // Intercept the request
    const modifiedOptions: Partial<RequestInit> = {
        ...options,
        headers: {
            ...options.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
    };

    try {
        // Make the request
        const response = await fetch(url, modifiedOptions);

        // Intercept the response
        if (!response.ok) {
            // Handle errors globally (e.g., redirect to login if 401)
            if (response.status === 401 || response.status === 403) {
                console.error("Unauthorized! Redirecting to login...");
                window.location.href = '/';
            }

        }

        // Parse JSON if needed
        return response;

    } catch (error) {
        // Handle network errors globally
        console.error(error);
        throw error; // Re-throw the error for specific handling
    }
};