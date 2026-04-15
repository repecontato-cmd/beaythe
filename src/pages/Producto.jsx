import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Shield, Leaf, Check, ArrowRight, Sparkles, Beaker, Lightbulb, Plus, Minus } from 'lucide-react';
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
        <div className="bg-white overflow-hidden">
            {/* 1. Dynamic Hero Section */}
            <section className="relative min-h-[70vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 px-4 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                        opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[120px] rounded-full z-0 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${theme.primary}44 0%, ${theme.bg} 70%)` }}
                />

                <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-6 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[500px] aspect-[4/5] drop-shadow-[0_45px_65px_rgba(0,0,0,0.12)]"
                        >
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full -z-10 blur-2xl opacity-40" style={{ backgroundColor: theme.primary }}></div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col items-start px-2">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[12px] font-bold tracking-[0.4em] uppercase mb-4"
                            style={{ color: theme.primary }}
                        >
                            {product.brand} • {t('badges.new')}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`text-5xl md:text-7xl font-light text-[#2C2826] leading-[0.95] tracking-tight mb-8 ${theme.font}`}
                        >
                            {product.name.split(' ').slice(0, 2).join(' ')} <br />
                            <span className="font-black italic uppercase" style={{ color: theme.primary }}>{product.name.split(' ').slice(2).join(' ')}</span>
                        </motion.h1>

                        <div className="flex gap-4 mb-10">
                            {[t('product.vegan'), t('product.paraben_free')].map((spec, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-[#F1EBE6] text-[10px] font-bold uppercase tracking-widest text-[#5C534F]">
                                    {i === 0 ? <Leaf size={12} /> : <Shield size={12} />} {spec}
                                </div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-[#8A7369] font-light leading-relaxed mb-10 max-w-md"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart(product)}
                                className="flex-1 py-5 rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] text-[#2C2826] bg-white border border-[#F1EBE6] flex items-center justify-center gap-3 transition-all hover:bg-[#F1EBE6]"
                            >
                                <ShoppingBag size={18} />
                                {t('product.add_to_cart')}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    addToCart(product);
                                    navigate('/checkout');
                                }}
                                className="flex-1 py-5 rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] text-white flex items-center justify-center gap-3 transition-all"
                                style={{ backgroundColor: theme.primary }}
                            >
                                {t('common.buy_now') || 'Comprar Agora'}
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Technical Specifications & Details (Elevated) */}
            <section className="py-12 md:py-20 bg-[#FCFAF8] border-t border-[#F1EBE6]">
                <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-8">{t('product.specs_title')}</h3>
                        <div className="border-t border-[#F1EBE6]/60">
                            {['description', 'precautions', 'ingredients'].map((key) => (
                                <div key={key} className="border-b border-[#F1EBE6]/60">
                                    <button className="w-full flex items-center justify-between py-5 text-left group" onClick={() => setActiveAccordion(activeAccordion === key ? '' : key)}>
                                        <span className="text-[13px] font-bold text-[#2C2826] uppercase tracking-[0.1em] group-hover:text-[#C4A49A] transition-colors">
                                            {key === 'description' ? t('product.what_is') : key === 'precautions' ? t('product.care') : t('product.composition')}
                                        </span>
                                        {activeAccordion === key ? <Minus size={16} className="text-[#8A7369]" /> : <Plus size={16} className="text-[#8A7369]" />}
                                    </button>
                                    <motion.div animate={{ height: activeAccordion === key ? 'auto' : 0, opacity: activeAccordion === key ? 1 : 0 }} className="overflow-hidden">
                                        <div
                                            className="pb-6 text-[14px] text-[#5C534F] font-light leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: key === 'description' ? product.description : key === 'precautions' ? t('helpbot.faq.returns') : "Aqua, Niacinamide, Glycerin, Rosa Centifolia Flower Extract, Hyaluronic Acid, Phenoxyethanol, Ethylhexylglycerin." }}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[40px] p-10 border border-[#F1EBE6] shadow-sm flex flex-col md:flex-row gap-8 items-center h-full">
                        <div className="w-24 h-24 rounded-full bg-[#FCFAF8] flex items-center justify-center text-[#2C2826] shadow-inner mb-2 md:mb-0 shrink-0"><Shield size={32} strokeWidth={1.5} /></div>
                        <div className="text-center md:text-left">
                            <h4 className="font-bold text-[#2C2826] text-sm uppercase mb-2 tracking-widest">{t('product.purity_title') || 'Garantia de Pureza'}</h4>
                            <p className="text-sm text-[#8A7369] font-light leading-relaxed mb-4">{t('product.purity_desc') || 'Nossa fórmula é 100% livre de toxinas e parabenos, garantindo os melhores resultados para sua pele.'}</p>
                            <div className="flex gap-6 justify-center md:justify-start">
                                <div className="flex items-center gap-2"><Leaf size={14} className="text-[#C4A49A]" /><span className="text-[10px] font-black uppercase tracking-widest text-[#2C2826]">{t('product.vegan_badge')}</span></div>
                                <div className="flex items-center gap-2"><Shield size={14} className="text-[#C4A49A]" /><span className="text-[10px] font-black uppercase tracking-widest text-[#2C2826]">{t('product.cruelty_badge')}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. EXPERIENCE EXPLORER (Condensed Marketing sections) */}
            <section className="bg-white py-20 px-4 border-t border-b border-[#F1EBE6]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-4">{t('experience.explorer_tag') || 'Descobrir'}</span>
                        <h2 className="text-4xl md:text-6xl font-light text-[#2C2826] tracking-tight text-center">{t('experience.explorer_title') || 'A Experiência Completa'}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="group relative h-[500px] rounded-[48px] overflow-hidden">
                                    <img src={theme.marketing.texture} alt="Experience" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute bottom-10 left-10 p-2">
                                        <h3 className="text-3xl font-bold text-white uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: t('experience.sensory_title') }}></h3>
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-12 rounded-[48px] bg-[#FCFAF8] border border-[#F1EBE6] flex flex-col justify-center">
                                    <h4 className="text-2xl font-bold text-[#2C2826] mb-6 uppercase tracking-tight">{t('experience.active_title')}</h4>
                                    <p className="text-[#8A7369] leading-relaxed mb-10 font-light">{t('experience.active_desc')}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#F1EBE6] flex items-center justify-center text-[#C4A49A]"><Sparkles size={24} /></div>
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#2C2826]">{t('experience.active_tag')}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-4 flex flex-col h-full">
                            <div className="p-8 rounded-[40px] bg-[#2C2826] text-white flex flex-col gap-6 flex-1 justify-center">
                                <h4 className="font-bold uppercase text-xs tracking-widest text-white/50">{t('experience.why_beauthe') || 'Por que Beauthé?'}</h4>
                                <ul className="space-y-4">
                                    {theme.landingPage.comparison.us.slice(0, 4).map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C4A49A]"><Check size={12} /></div>
                                            <span className="text-sm font-light text-white/80 leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <button className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C4A49A] flex items-center gap-2 hover:text-white transition-colors">
                                        {t('common.learn_more') || 'Saber mais'} <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="group relative h-[240px] rounded-[40px] overflow-hidden">
                                <img src={theme.marketing.lifestyle} alt="Lifestyle" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-1 block">{t('experience.lifestyle_tag')}</span>
                                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter leading-none">{t('experience.lifestyle_title')}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PERSUASION SECTIONS - BLOCK 2 */}
            {theme.landingPage && (
                <>
                    <div className="w-full bg-[#FFFBF8] py-24 md:py-32 px-4 border-b border-[#F4EFEA] overflow-hidden relative">
                        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
                            <h2 className="text-4xl md:text-5xl font-light text-[#2C2826] mb-20 tracking-tight">
                                {t('routine.title').split(' ').slice(0, 3).join(' ')} <span className="font-black italic uppercase" style={{ color: theme.primary }}>{t('routine.title').split(' ').slice(3).join(' ')}</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {theme.landingPage.routine.map((item, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center bg-white p-8 rounded-[40px] border border-[#F1EBE6] hover:shadow-xl transition-all">
                                        <span className="text-4xl font-black mb-6 opacity-20" style={{ color: theme.primary }}>{item.step}</span>
                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-[#FCFAF8] mb-6 p-4">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <h4 className="font-bold text-[#2C2826] text-sm uppercase mb-1">{t(item.name)}</h4>
                                        <p className="text-xs text-[#8A7369]">{t(item.desc)}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="mb-24 max-w-[1000px] mx-auto bg-[#FCFAF8] rounded-[32px] p-8 md:p-12 border border-[#F4EFEA] shadow-sm">
                            <h2 className="text-2xl font-light text-[#2C2826] text-center mb-10 tracking-tight">
                                <span className="font-bold">{t('bundle.title').split(' ').slice(0, 2).join(' ')}</span> {t('bundle.title').split(' ').slice(2).join(' ')}
                            </h2>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                                <div className="flex items-center gap-4 flex-wrap justify-center flex-1">
                                    {theme.landingPage.bundle.items.map((item, idx, arr) => (
                                        <React.Fragment key={item.id}>
                                            <div className="flex flex-col items-center group cursor-pointer w-[120px]">
                                                <div className="w-full aspect-square rounded-[20px] overflow-hidden bg-white mb-4 border border-[#F1EBE6]">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                </div>
                                                <span className="text-[10px] font-bold text-[#8A7369] text-center uppercase tracking-widest leading-snug">{item.name}</span>
                                            </div>
                                            {idx < arr.length - 1 && <div className="text-[#C4A49A] mb-8 font-light text-2xl hidden md:block">+</div>}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center md:items-start pt-6 md:pt-0 border-t md:border-t-0 w-full md:w-auto">
                                    <span className="text-[10px] uppercase font-bold text-[#8A7369] tracking-widest mb-1">{t('bundle.pay_only')}</span>
                                    <span className="text-4xl font-light text-[#2C2826] mb-6">{theme.landingPage.bundle.payOnly.toFixed(2)} {t('currency')}</span>
                                    <button className="w-full md:w-auto bg-[#2C2826] text-white px-8 py-4 rounded-xl text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-xl">{t('bundle.add_kit')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {theme.landingPage.faq && (
                        <section className="py-24 md:py-40 bg-[#FCFAF8] border-t border-[#F1EBE6]">
                            <div className="max-w-[800px] mx-auto px-4">
                                <div className="text-center mb-20">
                                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-4 block">Q&A</span>
                                    <h2 className="text-4xl font-light text-[#2C2826] tracking-tighter">Common Questions</h2>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {theme.landingPage.faq.map((item, idx) => (
                                        <div key={idx} className="bg-white rounded-3xl p-8 border border-[#F1EBE6] shadow-sm">
                                            <h4 className="text-lg font-bold text-[#2C2826] mb-4">{item.question}</h4>
                                            <p className="text-[#8A7369] font-light leading-relaxed">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}

            {/* 5. STICKY UI (Mobile Only) */}
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-xl border-t border-[#F1EBE6] md:hidden flex items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#8A7369] uppercase block truncate">{product.name}</span>
                    <span className="text-base font-bold text-[#2C2826]">{product.price.toFixed(2)} {t('currency')}</span>
                </div>
                <button onClick={() => addToCart(product)} className="px-8 py-4 rounded-xl text-white text-[11px] font-bold uppercase tracking-widest shadow-lg flex-shrink-0" style={{ backgroundColor: theme.primary }}>{t('product.add_to_cart')}</button>
            </motion.div>

            <TrendingProducts overrideTitle={t('product.recommended')} removePadding={false} recommendedIds={product.recommended_products} />
        </div>
    );
}
