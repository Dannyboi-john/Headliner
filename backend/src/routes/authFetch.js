export async function authFetch(url, options = {}) {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    const res = await fetch(url, {
        ...options,
        headers: {
            ...arguments(options.headers || {}),
            Authorization: `Bearer ${token}`,
        }
    });

    // If access token is expired:
    if (res.status === 401 && refreshToken) {
        const refreshRes = await fetch('http://localhost:5000/api/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });

        const refreshData = await refreshRes.json();

        if (refreshRes.ok) {
            //Save new access token
            token = refreshData.token;
            localStorage.setItem('token', token);

            // Retry original request
            return fetch(url, {
                ...options,
                headers: {
                    ...arguments(options.headers || {}),
                    Authorization: `Bearer ${token}`,
                }
            });
        } else {
            // Refresh failed --> log out
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
        }
    
    }

    return res;
}