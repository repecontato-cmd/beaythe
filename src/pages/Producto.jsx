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

            {/* 2. Technical Specifications & Details (Elevated for Efficiency) */}
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

            {/* 3. EXPERIENCE EXPLORER (Condensed Marketing Sections) */}
            <section className="bg-white py-20 px-4 border-t border-b border-[#F1EBE6]">
                <div className="max-w-[1400px] mx-auto">
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative h-[600px] rounded-[48px] overflow-hidden"
                        >
                    <img src={theme.marketing.texture} alt="Texture" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-4xl font-bold text-white uppercase tracking-tighter leading-none" dangerouslySetInnerHTML={{ __html: t('experience.sensory_title').replace('SENSORIAL', '<br />SENSORIAL') }}></h3>
                        <p className="text-white/80 text-sm font-light leading-relaxed">{t('experience.sensory_desc')}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="group relative h-[600px] rounded-[48px] overflow-hidden flex flex-col"
                    style={{ backgroundColor: theme.primary }}
                >
                    <div className="p-10 relative z-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 mb-4 block">{t('experience.active_tag')}</span>
                        <h3 className="text-5xl font-light text-white leading-tight tracking-tighter mb-6">
                            {t('experience.active_title').split(' ')[0]} <br />
                            <span className="font-black italic">{t('experience.active_title').split(' ')[1]}</span>
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed max-w-[80%]">{t('experience.active_desc')}</p>
                    </div>
                    <div className="mt-auto relative w-full aspect-square p-8 overflow-hidden">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-10 border-2 border-dashed border-white/20 rounded-full" />
                        <img src={theme.marketing.ingredient} alt="Ingredient" className="relative z-10 w-full h-full object-contain drop-shadow-2xl md:mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="group relative h-[600px] rounded-[48px] overflow-hidden"
                >
                    <img src={theme.marketing.lifestyle} alt="Lifestyle" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-10 right-10">
                        <div className="bg-white/90 px-6 py-2 rounded-full flex items-center gap-2 shadow-xl">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }}></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2826]">{t('experience.lifestyle_tag')}</span>
                        </div>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10">
                        <h3 className="text-4xl font-bold text-white uppercase tracking-tighter">
                            {t('experience.lifestyle_title').split(' ').slice(0, 2).join(' ')} <br />
                            {t('experience.lifestyle_title').split(' ').slice(2, 3).join(' ')} <span className="font-light italic" style={{ color: theme.primary }}>{t('experience.lifestyle_title').split(' ').slice(3).join(' ')}</span>
                        </h3>
                        <p className="text-white/70 text-sm mt-4 font-light">{t('experience.lifestyle_desc')}</p>
                    </div>
                </motion.div>
        </div>
                </div >
            </section >

        {/* 3. LANDING PAGE PERSUASION SECTIONS - BLOCK 1 */ }
    {
        theme.landingPage && (
            <>
                {/* A. Problem/Solution */}
                <section className="py-24 md:py-40 bg-[#FCFAF8] overflow-hidden">
                    <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-5xl md:text-7xl font-light text-[#2C2826] leading-tight tracking-tight mb-8">{theme.landingPage.problem.headline}</h2>
                            <p className="text-xl text-[#8A7369] font-light leading-relaxed mb-12">{theme.landingPage.problem.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {theme.landingPage.solution.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex flex-col gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-[#F1EBE6]" style={{ color: theme.primary }}>
                                            {<benefit.icon size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#2C2826] uppercase text-xs tracking-widest mb-1">{benefit.title}</h4>
                                            <p className="text-sm text-[#8A7369] font-light">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                            <img src={theme.marketing.texture} alt="Solution" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </section>

                {/* B. Formulation */}
                <section className="py-24 md:py-40 bg-white">
                    <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[60px] overflow-hidden shadow-2xl aspect-square">
                                <img src={theme.landingPage.formulation.image} alt="Formulation" className="w-full h-full object-cover" />
                            </motion.div>
                            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[40px] shadow-xl border border-[#F1EBE6] max-w-[280px] hidden md:block">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#C4A49A]"><Beaker size={20} /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2C2826]">Dermatologically Tested</span>
                                </div>
                                <p className="text-[12px] text-[#8A7369] leading-relaxed">Clinically proven to increase hydration by 42%.</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-4 block">Formulation</span>
                            <h2 className="text-5xl md:text-7xl font-light text-[#2C2826] leading-tight tracking-tight mb-8">{theme.landingPage.formulation.title}</h2>
                            <p className="text-xl text-[#8A7369] font-light leading-relaxed mb-12">{theme.landingPage.formulation.description}</p>
                            <div className="space-y-8">
                                {theme.landingPage.formulation.ingredients.map((ing, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#C4A49A]"><Check size={16} /></div>
                                        <div>
                                            <h4 className="font-bold text-[#2C2826] text-sm uppercase mb-1">{ing.name}</h4>
                                            <p className="text-sm text-[#8A7369] font-light">{ing.benefit}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* C. Comparison */}
                <section className="py-24 md:py-40 bg-white border-t border-[#F1EBE6]">
                    <div className="max-w-[1000px] mx-auto px-4">
                        <div className="text-center mb-20">
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-4 block">Us vs Others</span>
                            <h2 className="text-5xl font-light text-[#2C2826] tracking-tighter">Why Choose Beauthé?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="p-12 rounded-[48px] bg-[#FCFAF8] border border-[#F1EBE6]">
                                <h4 className="text-2xl font-bold text-[#2C2826] mb-8 flex items-center gap-3">
                                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: theme.primary }} />
                                    The Beauthé Secret
                                </h4>
                                <ul className="flex flex-col gap-6">
                                    {theme.landingPage.comparison.us.map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[#2C2826] font-medium">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-50 text-green-600"><Sparkles size={12} /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-12 rounded-[48px] bg-white border border-[#F1EBE6] opacity-60">
                                <h4 className="text-2xl font-bold text-[#8A7369] mb-8">Traditional Products</h4>
                                <ul className="flex flex-col gap-6">
                                    {theme.landingPage.comparison.them.map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[#8A7369]">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-red-50 text-red-400"><Minus size={12} /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* D. Social Proof */}
                <section className="py-24 md:py-40 bg-[#FCFAF8] overflow-hidden">
                    <div className="max-w-[1440px] mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
                            <div className="lg:w-1/2">
                                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-4 block">{theme.landingPage.socialProof.tag}</span>
                                <h2 className="text-5xl md:text-7xl font-light text-[#2C2826] leading-tight tracking-tight mb-8">{theme.landingPage.socialProof.title}</h2>
                                <div className="grid grid-cols-3 gap-8 mt-12">
                                    {theme.landingPage.socialProof.stats.map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-4xl font-bold text-[#2C2826] mb-2">{stat.value}</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#8A7369]">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                {theme.landingPage.socialProof.testimonials.slice(0, 2).map((t, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[40px] shadow-xl border border-[#F1EBE6]">
                                        <div className="flex items-center gap-4 mb-6">
                                            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <h4 className="font-bold text-[#2C2826] text-sm uppercase">{t.name}</h4>
                                                <span className="text-[10px] text-[#8A7369] uppercase tracking-widest">{t.role}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="fill-[#FF9529] text-[#FF9529]" />)}
                                        </div>
                                        <p className="text-sm text-[#2C2826] italic font-light leading-relaxed">"{t.text}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    {/* 4. STANDARD E-COMMERCE SECTIONS */ }
            <div className="w-full bg-[#FFFBF8] py-24 md:py-32 px-4 border-t border-b border-[#F4EFEA] overflow-hidden relative">
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
                        <span className="font-bold italic uppercase" style={{ color: theme.primary }}>{t('product.purity_title').split(' ').slice(2).join(' ')}</span>
                    </h4>
                    <p className="text-lg text-white/60 font-light leading-relaxed mb-12 max-w-lg">{t('product.purity_desc')}</p>
                    <div className="flex gap-16">
                        <div className="flex flex-col items-center gap-4 group/item">
                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 transition-all group-hover/item:bg-white/10"><Leaf size={32} className="text-white" /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{t('product.vegan_badge')}</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 group/item">
                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 transition-all group-hover/item:bg-white/10"><Shield size={32} className="text-white" /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{t('product.cruelty_badge')}</span>
                        </div>
                    </div>
            </div>
        </div >
            </div >

        {/* 5. LANDING PAGE PERSUASION SECTIONS - BLOCK 2 */ }
    {
        theme.landingPage && (
            <>
                {theme.landingPage.faq && (
                    <section className="py-24 md:py-40 bg-[#FCFAF8]">
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
                            <div className="mt-32 pt-32 border-t border-[#F1EBE6]">
                                <div className="text-center mb-20">
                                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C4A49A] mb-4 block">Secrets from the lab</span>
                                    <h2 className="text-4xl md:text-6xl font-light text-[#2C2826] tracking-tight">{theme.landingPage.expertTips.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    {theme.landingPage.expertTips.tips.map((tip, i) => (
                                        <div key={i} className="flex flex-col items-center text-center group">
                                            <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-[#F1EBE6] flex items-center justify-center text-[#C4A49A] mb-8 group-hover:scale-110 transition-transform duration-500"><Lightbulb size={24} /></div>
                                            <h4 className="font-bold text-[#2C2826] text-sm uppercase mb-4 tracking-widest">{tip.title}</h4>
                                            <p className="text-sm text-[#8A7369] font-light leading-relaxed">{tip.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-24 md:py-40 bg-[#2C2826] text-white">
                    <div className="max-w-[1440px] mx-auto px-4">
                        <div className="text-center mb-24">
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40 mb-4 block">Exclusive Offers</span>
                            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">{theme.landingPage.kits.title}</h2>
                            <p className="text-white/60 font-light max-w-xl mx-auto">{theme.landingPage.kits.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {theme.landingPage.kits.items.map((kit, i) => (
                                <div key={i} className="group relative bg-white/5 border border-white/10 rounded-[60px] overflow-hidden flex flex-col md:flex-row items-center p-8 gap-10 hover:bg-white/10 transition-colors">
                                    <div className="w-full md:w-1/2 aspect-square rounded-[40px] overflow-hidden">
                                        <img src={kit.image} alt={kit.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <h4 className="text-3xl font-light mb-4">{kit.name}</h4>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-2xl font-bold">{kit.price.toFixed(2)} €</span>
                                            <span className="text-sm text-white/40 line-through">{kit.originalPrice.toFixed(2)} €</span>
                                            <div className="bg-[#C4A49A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Save 20%</div>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {kit.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-3 text-sm text-white/60"><Check size={14} className="text-[#C4A49A]" /> {item}</li>
                                            ))}
                                        </ul>
                                        <button className="w-full py-4 bg-white text-[#2C2826] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#C4A49A] hover:text-white transition-all">{t('common.add_kit') || 'Adicionar Kit'}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        )
    }

    {/* 6. STICKY UI */ }
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-xl border-t border-[#F1EBE6] md:hidden flex items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#8A7369] uppercase block truncate">{product.name}</span>
                    <span className="text-base font-bold text-[#2C2826]">{product.price.toFixed(2)} {t('currency')}</span>
                </div>
                <button onClick={() => addToCart(product)} className="px-8 py-4 rounded-xl text-white text-[11px] font-bold uppercase tracking-widest shadow-lg flex-shrink-0" style={{ backgroundColor: theme.primary }}>{t('product.add_to_cart')}</button>
            </motion.div>

            <TrendingProducts overrideTitle={t('product.recommended')} removePadding={false} recommendedIds={product.recommended_products} />
        </div >
    );
}
