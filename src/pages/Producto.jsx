import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Shield, Leaf, Check, Info, ArrowRight, Sparkles, Maximize2, Beaker, Gift, Lightbulb, Plus, Minus, Droplets, Wind } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import TrendingProducts from '../components/TrendingProducts';
import { PRODUCT_LANDING_DATA } from '../data/productLandingPages';
import { getProducts } from '../admin/services/db';

export default function Producto() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { t, translateProduct } = useLanguage();
    const [activeAccordion, setActiveAccordion] = useState('description');
    const [liveProduct, setLiveProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const all = await getProducts();
            const found = all.find(p => p.id.toString() === id);
            if (found) setLiveProduct(translateProduct(found));
            setLoading(false);
        };
        load();
    }, [id, translateProduct]);


    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const product = liveProduct ? {
        ...liveProduct,
        images: [liveProduct.image_url, ...(liveProduct.secondary_images ? JSON.parse(liveProduct.secondary_images) : [])]
    } : null;

    let theme = PRODUCT_LANDING_DATA[99];
    if (product) {
        if (product.landing_page_data) {
            const dbLP = product.landing_page_data;
            theme = {
                ...theme,
                ...dbLP,
                marketing: { ...theme.marketing, ...(dbLP.marketing || {}) },
                landingPage: { ...theme.landingPage, ...(dbLP.landingPage || {}) }
            };
        } else if (PRODUCT_LANDING_DATA[product.dropea_id || product.id]) {
            theme = PRODUCT_LANDING_DATA[product.dropea_id || product.id];
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FCFAF8]">
            <div className="w-12 h-12 border-4 border-[#F1EBE6] border-t-[#C4A49A] rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAF8] gap-6 text-center px-4">
            <h1 className="text-3xl font-light text-[#2C2826]">Produto não encontrado</h1>
            <p className="text-[#8A7369]">Este item pode ter sido removido ou o link está incorreto.</p>
            <Link to="/" className="bg-[#2C2826] text-white px-8 py-4 rounded-xl text-[12px] font-bold uppercase tracking-widest">Voltar para a Home</Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen overflow-hidden">
            {/* 1. Compact Hero Section */}
            <section className="pt-24 md:pt-32 pb-12 px-4 md:px-8 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20 items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 lg:sticky lg:top-32">
                        {/* Thumbnails (Vertical on Desktop) */}
                        <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === idx ? 'border-black' : 'border-gray-100 hover:border-gray-300'}`}
                                >
                                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="order-1 md:order-2 flex-1 relative aspect-square bg-[#F9F7F5] rounded-[40px] overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-contain mix-blend-multiply p-4 md:p-6"
                                />
                            </AnimatePresence>

                            <div className="absolute top-6 left-6">
                                <span className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                    {product.brand}
                                </span>
                            </div>

                            <button className="absolute bottom-6 right-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-900 border border-white hover:bg-white transition-all shadow-xl">
                                <Maximize2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Info & Action */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="border-b border-gray-100 pb-8 mb-8">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-black text-black" />)}
                                <span className="text-[11px] font-bold text-gray-500 ml-2 uppercase tracking-widest">(24 {t('product.reviews') || 'Avaliações'})</span>
                            </div>

                            <h1 className={`text-4xl md:text-5xl font-light text-[#2C2826] tracking-tight leading-[1.1] mb-6 ${theme.font}`}>
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-3xl font-bold text-[#2C2826]">{product.price.toFixed(2)} {t('currency')}</span>
                                <span className="text-sm text-gray-400 line-through">{(product.price * 1.3).toFixed(2)} {t('currency')}</span>
                                <span className="text-rose-600 text-xs font-black uppercase tracking-widest">30% OFF</span>
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex items-center gap-2">
                                <Shield size={16} className="text-green-600" /> {t('product.in_stock') || 'Em estoque'} • <b>24x de {(product.price / 24).toFixed(2)} €</b> sem juros
                            </p>

                            {/* Main CTAs */}
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-rose-500"><Minus size={18} /></button>
                                        <input type="number" value={quantity} readOnly className="w-12 text-center bg-transparent font-bold text-gray-900 outline-none" />
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-rose-300 transition-colors"><Plus size={18} /></button>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => addToCart({ ...product, quantity })}
                                        className="flex-1 bg-[#2C2826] text-white py-4 rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-black/10"
                                    >
                                        <ShoppingBag size={18} />
                                        {t('product.add_to_cart')}
                                    </motion.button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: theme.primary }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { addToCart({ ...product, quantity }); navigate('/checkout'); }}
                                    className="w-full border-2 border-[#2C2826] text-[#2C2826] py-5 rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-colors hover:text-white"
                                >
                                    {t('common.buy_now') || 'Comprar Agora'}
                                    <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Integration of Specs in Accordions HERE for compactness */}
                        <div className="space-y-1">
                            {['description', 'usage', 'ingredients', 'shipping'].map((key) => (
                                <div key={key} className="border-b border-gray-100 last:border-0">
                                    <button
                                        className="w-full flex items-center justify-between py-5 text-left group"
                                        onClick={() => setActiveAccordion(activeAccordion === key ? '' : key)}
                                    >
                                        <span className="text-[13px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-4">
                                            {key === 'description' && <Info size={18} className="text-gray-400" />}
                                            {key === 'usage' && <Sparkles size={18} className="text-gray-400" />}
                                            {key === 'ingredients' && <Beaker size={18} className="text-gray-400" />}
                                            {key === 'shipping' && <Shield size={18} className="text-gray-400" />}
                                            {key === 'description' ? t('product.description') || 'Descrição' :
                                                key === 'usage' ? t('product.usage') || 'Modo de usar' :
                                                    key === 'ingredients' ? t('product.composition') || 'Composição' :
                                                        t('product.shipping') || 'Envio e Devolução'}
                                        </span>
                                        <Plus size={16} className={`text-gray-400 transition-transform ${activeAccordion === key ? 'rotate-45' : ''}`} />
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: activeAccordion === key ? 'auto' : 0, opacity: activeAccordion === key ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className="pb-6 text-[14px] text-gray-500 font-light leading-relaxed px-1"
                                            dangerouslySetInnerHTML={{
                                                __html: key === 'description' ? product.description :
                                                    key === 'usage' ? (theme.landingPage?.expertTips?.tips?.[0]?.text || "Aplique na pele limpa e seca em movimentos circulares até total absorção.") :
                                                        key === 'ingredients' ? "Aqua, Niacinamide, Glycerin, Rosa Centifolia Flower Extract, Hyaluronic Acid, Phenoxyethanol." :
                                                            "Frete grátis em pedidos acima de 50€. Entrega em 2-4 dias úteis. Devolução gratuita em até 30 dias."
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Benefit Icons Compact */}
                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <Leaf size={20} className="text-green-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{t('product.vegan_badge')}</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <Shield size={20} className="text-blue-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{t('product.dermatologically_tested') || 'Testado'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Simplified Experience Section (Replaces the long Mosaic) */}
            <section className="bg-[#FCFAF8] py-20 px-4 border-t border-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl"
                        >
                            <img src={theme.marketing.texture} alt="Texture" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <span className="text-white font-black uppercase tracking-[0.5em] text-sm">Experience</span>
                            </div>
                        </motion.div>
                        <div className="space-y-6">
                            <h2 className="text-4xl font-light text-gray-900 tracking-tight leading-tight">
                                {t('experience.active_title') || 'Resultados Reais'}
                            </h2>
                            <p className="text-gray-500 font-light leading-relaxed">
                                {t('experience.active_desc') || 'Desenvolvido com alta concentração de ativos tecnológicos para garantir purificação profunda e frescor duradouro.'}
                            </p>
                            <div className="flex gap-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">100%</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Natural</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">+48h</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Duração</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Recommended Products */}
            <TrendingProducts overrideTitle={t('product.recommended')} removePadding={false} recommendedIds={product.recommended_products} />
        </div>
    );
}
