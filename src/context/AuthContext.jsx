import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('beauthe_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                setIsLoggedIn(true);
            } catch (e) {
                console.error('Failed to parse saved user', e);
                localStorage.removeItem('beauthe_user');
            }
        }
        setLoading(false);
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const login = (userData) => {
        // Enforce basic validation if not already done
        if (!userData.email || !validateEmail(userData.email)) {
            throw new Error('Please enter a valid email address.');
        }

        const finalUser = {
            ...userData,
            id: userData.id || Date.now(),
            name: userData.name || userData.email.split('@')[0]
        };

        setUser(finalUser);
        setIsLoggedIn(true);
        localStorage.setItem('beauthe_user', JSON.stringify(finalUser));
        return finalUser;
    };

    const register = (userData) => {
        if (!userData.email || !validateEmail(userData.email)) {
            throw new Error('Please enter a valid email address.');
        }

        // Mock registration logic
        const newUser = {
            ...userData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };

        setUser(newUser);
        setIsLoggedIn(true);
        localStorage.setItem('beauthe_user', JSON.stringify(newUser));
        return newUser;
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('beauthe_user');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('beauthe_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            loading,
            login,
            register,
            logout,
            updateProfile,
            validateEmail
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
