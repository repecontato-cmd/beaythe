import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ChevronDown, Search, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

const mockCategoryProducts = [
    { id: 1, name: "Sérum Glow Radiante", brand: "Beauthé", price: 49.90, oldPrice: 60.00, discount: "-15%", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", colors: 1, badge: "best_seller", priceRange: "25€ - 50€", skinTone: "Medio", color: "Rosado", type: "serums" },
    { id: 2, name: "Lip Juice Morango", brand: "Beauthé", price: 19.90, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80", colors: 5, badge: "new", priceRange: "0 - 25€", skinTone: "Claro", color: "Rojo", type: "labios" },
    { id: 3, name: "Aceite Corporal Glow", brand: "Beauthé", price: 28.50, oldPrice: 35.00, discount: "-18%", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80", colors: 1, badge: null, priceRange: "25€ - 50€", skinTone: "Bronceado", color: "Tierra", type: "hidratacion" },
    { id: 4, name: "Mascarilla Revitalizante", brand: "Beauthé", price: 32.00, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80", colors: 1, badge: "trend", priceRange: "25€ - 50€", skinTone: "Oscuro", color: "Nude", type: "mascarillas" },
    { id: 5, name: "Gloss Extremo Shine", brand: "Beauthé", price: 15.00, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80", colors: 3, badge: null, priceRange: "0 - 25€", skinTone: "Medio", color: "Rosado", type: "labios" },
    { id: 6, name: "Sérum Noche Reparador", brand: "Beauthé", price: 89.90, oldPrice: 110.00, discount: "-20%", image: "https://images.unsplash.com/photo-1615397323886-0bf17b0ddec2?auto=format&fit=crop&w=600&q=80", colors: 1, badge: "luxury", priceRange: "75€+", skinTone: "Claro", color: "Nude", type: "serums" },
    { id: 7, name: "Crema Hidratante Pro", brand: "Beauthé", price: 42.00, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80", colors: 1, badge: "expert", priceRange: "25€ - 50€", skinTone: "Medio", color: "Nude", type: "cremas" },
    { id: 8, name: "Agua Micelar Calmante", brand: "Beauthé", price: 19.90, oldPrice: 25.00, discount: "-20%", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80", colors: 1, badge: null, priceRange: "0 - 25€", skinTone: "Claro", color: "Nude", type: "limpiadores" },
    { id: 9, name: "Protector Solar SPF50", brand: "Beauthé", price: 34.00, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&w=600&q=80", colors: 1, badge: "summer", priceRange: "25€ - 50€", skinTone: "Medio", color: "Invisible", type: "solares" },
    { id: 10, name: "Tónico Refrescante", brand: "Beauthé", price: 24.50, oldPrice: 30.00, discount: "-18%", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", colors: 1, badge: null, priceRange: "0 - 25€", skinTone: "Medio", color: "Rosado", type: "tonicos" },
    { id: 11, name: "Exfoliante de Bambú", brand: "Beauthé", price: 29.00, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1527799822367-3de88bc0c4a3?auto=format&fit=crop&w=600&q=80", colors: 1, badge: "new", priceRange: "25€ - 50€", skinTone: "Bronceado", color: "Tierra", type: "cuidados" },
    { id: 12, name: "Bálsamo Labial Coco", brand: "Beauthé", price: 12.90, oldPrice: null, discount: null, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80", colors: 2, badge: null, priceRange: "0 - 25€", skinTone: "Claro", color: "Blanco", type: "labios" }
];

export default function Categoria() {
    const { slug: rawSlug } = useParams();
    const slug = rawSlug?.toLowerCase();
    const { addToCart } = useCart();
    const { t } = useLanguage();
    const { toggleFavorite, isFavorite, openFavorites } = useFavorites();

    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(8);
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        price: null,
        skin_tone: null,
        color_name: null,
        product_type: null
    });
    const [sortOption, setSortOption] = useState(null);

    const filterOptions = {
        price: ["0 - 25€", "25€ - 50€", "50€ - 75€", "75€+"],
        skin_tone: [t('history.purity'), "Medio", "Bronceado", "Oscuro"], // Using purity as a placeholder for Claro just to show t() usage or similar
        color_name: ["Nude", "Rosado", "Rojo", "Tierra"],
        product_type: ["serums", "cremas", "limpiadores", "solares", "labios", "hidratacion"]
    };

    const sortOptions = [
        { id: "recomendados", label: t('filters.sort_options.recomendados') },
        { id: "mais_vendidos", label: t('filters.sort_options.mais_vendidos') },
        { id: "melhor_avaliados", label: t('filters.sort_options.melhor_avaliados') },
        { id: "em_tendencia", label: t('filters.sort_options.em_tendencia') },
        { id: "novidades", label: t('filters.sort_options.novidades') },
        { id: "maior_desconto", label: t('filters.sort_options.maior_desconto') },
        { id: "menor_preco", label: t('filters.sort_options.menor_preco') },
        { id: "maior_preco", label: t('filters.sort_options.maior_preco') },
        { id: "a_z", label: t('filters.sort_options.a_z') },
        { id: "z_a", label: t('filters.sort_options.z_a') }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        setVisibleCount(8);
        setSelectedFilters({ price: null, skin_tone: null, color_name: null, product_type: null });
        setSortOption(null);
    }, [slug]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...mockCategoryProducts];

        // Search filter
        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Dropdown filters
        if (selectedFilters.price) result = result.filter(p => p.priceRange === selectedFilters.price);
        if (selectedFilters.skin_tone) result = result.filter(p => p.skinTone === selectedFilters.skin_tone);
        if (selectedFilters.color_name) result = result.filter(p => p.color === selectedFilters.color_name);
        if (selectedFilters.product_type) result = result.filter(p => p.type === selectedFilters.product_type);

        // Sort
        if (sortOption === "menor_preco") result.sort((a, b) => a.price - b.price);
        else if (sortOption === "maior_preco") result.sort((a, b) => b.price - a.price);
        else if (sortOption === "a_z") result.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortOption === "z_a") result.sort((a, b) => b.name.localeCompare(a.name));
        else if (sortOption === "mais_vendidos") {
            result.sort((a, b) => {
                const aIsBest = a.badge === "best_seller";
                const bIsBest = b.badge === "best_seller";
                if (aIsBest && !bIsBest) return -1;
                if (!aIsBest && bIsBest) return 1;
                return 0;
            });
        }
        else if (sortOption === "em_tendencia") {
            result.sort((a, b) => {
                const aIsTrend = a.badge === "trend";
                const bIsTrend = b.badge === "trend";
                if (aIsTrend && !bIsTrend) return -1;
                if (!aIsTrend && bIsTrend) return 1;
                return 0;
            });
        }
        else if (sortOption === "melhor_avaliados") {
            result.sort((a, b) => b.rating - a.rating);
        }
        else if (sortOption === "novidades") {
            result.sort((a, b) => {
                const aIsNew = a.badge === "new";
                const bIsNew = b.badge === "new";
                if (aIsNew && !bIsNew) return -1;
                if (!aIsNew && bIsNew) return 1;
                return 0;
            });
        }
        else if (sortOption === "maior_desconto") {
            result.sort((a, b) => {
                const aDiscount = a.discount ? parseInt(a.discount.replace(/[^0-9]/g, '')) : 0;
                const bDiscount = b.discount ? parseInt(b.discount.replace(/[^0-9]/g, '')) : 0;
                return bDiscount - aDiscount;
            });
        }

        return result;
    }, [searchTerm, selectedFilters, sortOption]);

    const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);

    const toggleFilterOption = (filterKey, option) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterKey]: prev[filterKey] === option ? null : option
        }));
    };

    const normalizedSlug = slug === 'rosto' ? 'rostro' : (slug === 'maquillagem' ? 'maquillaje' : slug);
    const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : t('categories.collection');

    return (
        <div className="w-full bg-[#FCFAF8] pb-24">
            <section className="relative w-full h-[60vh] md:h-[75vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#2C2826] mb-12">
                <img
                    src={normalizedSlug === 'rostro' ? "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000" : (normalizedSlug === 'cabello' ? "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=2000" : "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&w=2000")}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-scale duration-10000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>

                <div className="relative z-10 text-white max-w-4xl pt-10 px-6">
                    <p className="text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase mb-5 opacity-95 text-[#EBE1DA]">
                        {normalizedSlug === 'rostro' ? t('categories.rostro.tagline') : (normalizedSlug === 'cabello' ? t('categories.cabello.tagline') : (normalizedSlug === 'solares' ? t('categories.solares.tagline') : ""))}
                    </p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-normal mb-8 tracking-tighter drop-shadow-2xl uppercase"
                    >
                        {t(`categories.${normalizedSlug}.title`) || title}
                    </motion.h1>
                    <p className="text-[15px] md:text-lg font-light tracking-wide opacity-90 text-[#F4EFEA] max-w-2xl mx-auto leading-relaxed">
                        {t(`categories.${normalizedSlug}.desc`)}
                    </p>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative pt-8 pb-4 border-b border-[#F1EBE6] mb-12">
                    <div className="flex flex-wrap items-center justify-between gap-6 pb-4">
                        <div className="flex flex-wrap items-center gap-4 md:gap-10">
                            {['price', 'skin_tone', 'color_name', 'product_type'].map((filterKey) => (
                                <button
                                    key={filterKey}
                                    onClick={() => setActiveFilter(activeFilter === filterKey ? null : filterKey)}
                                    className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all
                                        ${activeFilter === filterKey || selectedFilters[filterKey] ? 'text-[#C4A49A]' : 'text-[#2C2826] hover:text-[#C4A49A]'}
                                    `}
                                >
                                    {t(`filters.${filterKey}`)}
                                    {selectedFilters[filterKey] && <span className="text-[9px] lowercase font-normal ml-0.5">({selectedFilters[filterKey]})</span>}
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeFilter === filterKey ? 'rotate-180 text-[#C4A49A]' : 'opacity-50'}`} />
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-8 flex-1 md:flex-none justify-between md:justify-end">
                            <div className="relative group flex-1 md:w-72">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={t('search_placeholder')}
                                    className="w-full bg-transparent border-b border-[#F1EBE6] py-2 px-8 text-[13px] font-light focus:outline-none focus:border-[#C4A49A] transition-all placeholder:text-[#9C9490]"
                                />
                                <Search size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9C9490]" />
                            </div>
                            <div className="hidden lg:flex items-center gap-8">
                                <span className="text-[12px] text-[#8A7369] font-medium uppercase tracking-wider">{filteredAndSortedProducts.length} {t('common.items')}</span>
                                <button
                                    onClick={() => setActiveFilter(activeFilter === 'sort' ? null : 'sort')}
                                    className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all
                                        ${activeFilter === 'sort' || sortOption ? 'text-[#C4A49A]' : 'text-[#2C2826] hover:text-[#C4A49A]'}
                                    `}
                                >
                                    {t('filters.sort')} {sortOption && <span className="text-[9px] lowercase font-normal ml-0.5">({t(`filters.sort_options.${sortOption}`)})</span>}
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeFilter === 'sort' ? 'rotate-180 text-[#C4A49A]' : 'opacity-50'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {activeFilter && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-[#FCFAF8] pt-4 pb-8"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {(activeFilter === 'sort' ? sortOptions : filterOptions[activeFilter]).map((option) => (
                                        <button
                                            key={activeFilter === 'sort' ? option.id : option}
                                            onClick={() => {
                                                if (activeFilter === 'sort') {
                                                    setSortOption(sortOption === option.id ? null : option.id);
                                                } else {
                                                    toggleFilterOption(activeFilter, option);
                                                }
                                                setActiveFilter(null);
                                            }}
                                            className={`text-left text-[13px] transition-colors py-1 flex items-center justify-between group
                                                ${(activeFilter === 'sort' ? sortOption === option.id : selectedFilters[activeFilter] === option) ? 'text-[#C4A49A] font-medium' : 'text-[#5C534F] font-light hover:text-[#C4A49A]'}
                                            `}
                                        >
                                            {activeFilter === 'sort' ? option.label : option}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">→</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                    {visibleProducts.map((product) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            key={product.id} className="group"
                        >
                            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white border border-[#F1EBE6] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 mb-5 sm:mb-6">
                                {product.discount && (
                                    <div className="absolute top-5 left-5 bg-[#C4A49A] text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10 tracking-[0.1em] uppercase">
                                        {product.discount}
                                    </div>
                                )}
                                {product.badge && !product.discount && (
                                    <div className="absolute top-5 left-5 bg-[#2C2826] text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10 tracking-[0.1em] uppercase">
                                        {t('badges.' + product.badge)}
                                    </div>
                                )}
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-300
                                        ${isFavorite(product.id) ? 'bg-[#C4A49A] text-white opacity-100' : 'text-[#5C534F] hover:text-[#C4A49A] bg-white opacity-0 group-hover:opacity-100'}
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
                                        {t('cart.add')}
                                    </button>
                                </div>
                            </div>

                            <div className="px-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#8A7369] uppercase leading-none">Beauthé</p>
                                    <p className="text-[10px] font-medium text-[#A69B97] uppercase tracking-wide leading-none">{product.colors > 1 ? `+ ${product.colors} ${t('common.shades')}` : t('common.essential')}</p>
                                </div>
                                <Link to={`/producto/${product.id}`} className="block text-[15px] font-normal text-[#2C2826] mb-2 hover:text-[#C4A49A] transition-colors leading-tight uppercase tracking-tight">{product.name}</Link>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[16px] font-normal text-[#2C2826]">{product.price.toFixed(2)} €</span>
                                    {product.oldPrice && <span className="text-[13px] text-[#A69B97] line-through font-light">{product.oldPrice.toFixed(2)} €</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {visibleCount < filteredAndSortedProducts.length && (
                    <div className="mt-20 flex justify-center">
                        <motion.button
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center gap-4 focus:outline-none"
                        >
                            <div className="w-16 h-16 rounded-full border border-[#F1EBE6] flex items-center justify-center text-[#2C2826] group-hover:bg-[#2C2826] group-hover:text-white transition-all duration-500 shadow-sm">
                                <Plus size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7369] group-hover:text-[#2C2826] transition-colors">
                                {t('filters.load_more')}
                            </span>
                        </motion.button>
                    </div>
                )}

                <div className="mt-32 pt-20 border-t border-[#F1EBE6] text-center max-w-2xl mx-auto">
                    <p className="text-[11px] font-bold tracking-[0.3em] text-[#8A7369] uppercase mb-6 opacity-70">
                        {t('product_bottom.tag')}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-light text-[#2C2826] mb-8 leading-snug">
                        {t('product_bottom.title_1')} <span className="font-light">{t('product_bottom.title_2')}</span>
                    </h3>
                    <p className="text-[#5C534F] text-[15px] font-light leading-relaxed opacity-80 mb-10">
                        {t('product_bottom.desc')}
                    </p>
                </div>
            </div>
        </div>
    );
}
