const betterFetch = async <T>(url: RequestInfo | URL, opts: RequestInit = {}) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BE_URL}/${url}`, opts);

    if (!response.ok) {
        // todo: check BE errors
        throw new Error(response.statusText);
    }

    return await response.json() as T;
}

export default betterFetch;
