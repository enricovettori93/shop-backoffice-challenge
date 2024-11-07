const betterFetch = async <T>(url: RequestInfo | URL, opts: RequestInit = {}) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BE_URL}${url}`, {
        ...opts,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        // todo: check BE errors
        throw new Error(response.statusText);
    }

    try {
        return await response.json() as T;
    } catch (e) {
        // quick hack for text response instead of a json
        return response as T;
    }
}

export default betterFetch;
