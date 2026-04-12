import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { getProducts } from '../admin/services/db';

export default function TrendingProducts({ overrideTitle, removePadding, recommendedIds }) {
    const { t } = useLanguage();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [liveProducts, setLiveProducts] = React.useState([]);

    React.useEffect(() => {
        const loadTrendings = async () => {
            const all = await getProducts();
            let trendings = [];

            if (recommendedIds && recommendedIds.length > 0) {
                trendings = all.filter(p => recommendedIds.includes(p.id)).slice(0, 4);
            }

            if (trendings.length === 0) {
                trendings = all.filter(p => p.is_active && p.placement === 'TRENDING').slice(0, 4);
            }

            setLiveProducts(trendings);
        };
        loadTrendings();
    }, [recommendedIds]);

    const products = liveProducts.map(p => ({
        id: p.id,
        name: p.name,
        brand: "Beauthé",
        price: p.manual_price || p.price,
        image: p.image_url,
        badge: "trend"
    }));


    return (
        <section className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 ${removePadding ? '' : 'py-24'}`}>
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="flex flex-col items-start gap-4">
                    <span className="text-[11px] font-bold tracking-[0.3em] text-[#C4A49A] uppercase">{t('trending.tag')}</span>
                    <h2 className="text-4xl md:text-5xl font-normal text-[#2C2826] tracking-tight">{overrideTitle || t('trending.title')}</h2>
                </div>
                <Link to="/categoria/tendencias" className="text-[12px] font-bold text-[#8A7369] hover:text-[#C4A49A] transition-colors border-b border-[#EBE1DA] pb-1 uppercase tracking-widest flex items-center gap-2 group">
                    {t('common.view_all')}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {products.map((product) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        key={product.id} className="group"
                    >
                        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white border border-[#F1EBE6] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 mb-6">
                            {product.badge && (
                                <div className="absolute top-5 left-5 bg-[#2C2826] text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10 tracking-[0.1em] uppercase">
                                    {t(`badges.${product.badge}`)}
                                </div>
                            )}

                            <button
                                onClick={() => toggleFavorite(product)}
                                className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-300
                                    ${isFavorite(product.id) ? 'bg-[#C4A49A] text-white opacity-100' : 'text-[#5C534F] hover:text-[#C4A49A] bg-[#FCFAF8] opacity-0 group-hover:opacity-100'}
                                `}
                            >
                                <Heart size={18} strokeWidth={1.2} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                            </button>

                            <Link to={`/producto/${product.id}`} className="block w-full h-full">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
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
                                <p className="text-[10px] font-medium text-[#A69B97] uppercase tracking-wide leading-none">+ 5 {t('common.shades')}</p>
                            </div>
                            <Link to={`/producto/${product.id}`} className="block text-[15px] font-normal text-[#2C2826] mb-2 hover:text-[#C4A49A] transition-colors leading-tight uppercase tracking-tight">{product.name}</Link>
                            <span className="text-[16px] font-normal text-[#2C2826]">{product.price.toFixed(2)} €</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
