import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function Login() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/admin-core-sys');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Core Sys</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-semibold mb-1 block">Usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-800"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold mb-1 block">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-800"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
                    <button type="submit" className="mt-4 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-colors">
                        Entrar no Painel
                    </button>
                </form>
            </div>
        </div>
    );
}
