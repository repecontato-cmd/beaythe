import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getProducts } from '../admin/services/db';
import { ShoppingBag, Star, Heart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function ProductTabs() {
    const { t, translateProduct } = useLanguage();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [allProducts, setAllProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('ALL');
    const [loading, setLoading] = useState(true);

    const tabs = [
        { id: 'ALL', label: t('nav.all_products') },
        { id: 'gels', label: 'Gels', match: ['gel', 'limpiador', 'cleaning'] },
        { id: 'serums', label: 'Sérums', match: ['serum', 'sérum', 'concentrado'] },
        { id: 'cremas', label: 'Cremas', match: ['crema', 'creme', 'hidratante'] },
        { id: 'ojos', label: 'Ojos', match: ['contorno', 'ojos', 'olhos'] },
        { id: 'labios', label: 'Labios', match: ['labios', 'lips', 'batom'] },
        { id: 'manos-pies', label: t('nav.manos_pies') || 'Manos y Pies', match: ['mano', 'pie', 'mão', 'pe', 'unha', 'uña', 'hand', 'foot', 'nails'] }
    ];


    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await getProducts();
            setAllProducts(data.filter(p => p.is_active));
            setLoading(false);
        };
        load();
    }, []);

    const filteredProducts = allProducts.filter(p => {
        if (activeTab === 'ALL') return true;
        const currentTab = tabs.find(tab => tab.id === activeTab);
        const content = (p.name + " " + (p.description || "") + " " + (p.tags?.join(' ') || "")).toLowerCase();
        return currentTab.match.some(term => content.includes(term));
    }).slice(0, 8);

    const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300";

    return (
        <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col items-center mb-16">
                    <span className="text-[11px] font-bold tracking-[0.4em] text-[#C4A49A] uppercase mb-4">{t('hero.subtitle')}</span>
                    <h2 className="text-4xl md:text-6xl font-normal text-[#2C2826] tracking-tight text-center mb-12">
                        {t('categories.collection') || 'Explorar Colecciones'}
                    </h2>

                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-[#2C2826] text-white shadow-xl scale-105'
                                    : 'bg-[#FCFAF8] text-[#8A7369] hover:bg-[#F1EBE6]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((p) => {
                            const product = translateProduct(p);
                            const price = p.manual_price || p.price || 0;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={product.id}
                                    className="group"
                                >
                                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-[#FCFAF8] border border-[#F1EBE6] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 mb-6">
                                        <button
                                            onClick={() => toggleFavorite(product)}
                                            className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-300
                                                ${isFavorite(product.id) ? 'bg-[#C4A49A] text-white opacity-100' : 'text-[#5C534F] hover:text-[#C4A49A] bg-white opacity-0 group-hover:opacity-100'}
                                            `}
                                        >
                                            <Heart size={18} strokeWidth={1.2} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                                        </button>

                                        <Link to={`/producto/${product.id}`} className="block w-full h-full p-4">
                                            <img
                                                src={product.image_url || PLACEHOLDER_IMG}
                                                alt={product.name}
                                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        </Link>

                                        <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hidden md:block">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full bg-[#2C2826] text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors rounded-2xl flex items-center justify-center gap-2 shadow-2xl"
                                            >
                                                <ShoppingBag size={14} strokeWidth={2} />
                                                {t('common.add')}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="px-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-[10px] font-bold tracking-[0.2em] text-[#8A7369] uppercase leading-none">Beauthé</p>
                                            <div className="flex text-[#FF9529]">
                                                <Star size={10} className="fill-current" />
                                                <Star size={10} className="fill-current" />
                                                <Star size={10} className="fill-current" />
                                                <Star size={10} className="fill-current" />
                                                <Star size={10} className="fill-current" />
                                            </div>
                                        </div>
                                        <Link to={`/producto/${product.id}`} className="block text-[15px] font-normal text-[#2C2826] mb-2 hover:text-[#C4A49A] transition-colors leading-tight uppercase tracking-tight truncate">
                                            {product.name}
                                        </Link>
                                        <span className="text-[16px] font-normal text-[#2C2826]">{price.toFixed(2)} €</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
