import React, { useState, useEffect } from 'react';
import { getProducts, getSettings } from '../services/db';
import { TrendingUp, PackageSearch, Store, Sparkles, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const p = await getProducts();
        setProducts(p);
        const s = await getSettings();
        setSettings(s);
    };

    const activeCount = products.filter(p => p.is_active).length;
    const manualCount = products.filter(p => p.manual_price !== null).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Activity className="text-rose-500" size={32} /> Central de Controle
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Bem-vinda ao Core System V2 da Beauthé. Visão geral da sua operação.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold text-sm">Total de Itens</span>
                        <PackageSearch className="text-gray-400" size={20} />
                    </div>
                    <span className="text-4xl font-black text-gray-900">{products.length}</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-emerald-600 font-bold text-sm">Vivos no Site</span>
                        <Eye className="text-emerald-500" size={20} />
                    </div>
                    <span className="text-4xl font-black text-emerald-700">{activeCount}</span>
                </div>

                <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-rose-700 font-bold text-sm">Preços Forçados</span>
                        <TrendingUp className="text-rose-500" size={20} />
                    </div>
                    <span className="text-4xl font-black text-rose-700">{manualCount}</span>
                </div>

                <div className="bg-black p-6 rounded-3xl shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-gray-300 font-bold text-sm">Margem Motor</span>
                        <Sparkles className="text-rose-400" size={20} />
                    </div>
                    <span className="text-4xl font-black text-white relative z-10">{settings ? `${settings.profit_margin_percent}%` : '--'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <Link to="/admin-core-sys/inventory" className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-gray-900 hover:shadow-xl transition-all h-48 flex flex-col justify-center items-center text-center gap-4">
                    <PackageSearch size={32} className="text-gray-400 group-hover:text-black transition-colors" />
                    <span className="font-bold text-gray-900 text-lg">Gerenciar Inventário</span>
                </Link>
                <Link to="/admin-core-sys/storefront" className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-emerald-600 hover:shadow-xl transition-all h-48 flex flex-col justify-center items-center text-center gap-4">
                    <Store size={32} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    <span className="font-bold text-gray-900 text-lg">Controle de Vitrines</span>
                </Link>
                <Link to="/admin-core-sys/dropea" className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-rose-600 hover:shadow-xl transition-all h-48 flex flex-col justify-center items-center text-center gap-4">
                    <Sparkles size={32} className="text-gray-400 group-hover:text-rose-600 transition-colors" />
                    <span className="font-bold text-gray-900 text-lg">Marketplace Oficial</span>
                </Link>
            </div>
        </div>
    );
}

// Dummy Eye component since forgot import
const Eye = ({ size, className }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>;
