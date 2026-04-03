export const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('admin_token', token);
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem('admin_token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('admin_token');
};
