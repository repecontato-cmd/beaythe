import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { getProducts } from '../admin/services/db';

export default function FeaturedCarousel() {
    const { t } = useLanguage();
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSlides = async () => {
            const all = await getProducts();
            let bannerProducts = all.filter(p => p.is_active && p.placement === 'BANNER');
            if (bannerProducts.length === 0) {
                bannerProducts = all.slice(0, 3);
            }

            if (bannerProducts.length > 0) {
                const colors = ["bg-[#4A423F]", "bg-[#C4A49A]", "bg-[#8A7369]", "bg-[#2C2826]"];
                const mapped = bannerProducts.map((p, i) => ({
                    id: p.id,
                    title: p.name.split(' ').slice(0, 2).join(' '),
                    subtitle: p.name.split(' ').slice(2).join(' '),
                    img: p.image_url,
                    bgColor: colors[i % colors.length]
                }));
                setSlides(mapped);
            }
            setLoading(false);
        };
        loadSlides();
    }, []);

    const nextSlide = () => {
        if (slides.length === 0) return;
        setCurrent((c) => (c + 1) % slides.length);
    };

    const prevSlide = () => {
        if (slides.length === 0) return;
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
    };

    if (loading || slides.length === 0) return null;

    return (
        <section className="w-full relative h-[380px] md:h-[600px] overflow-hidden bg-white mb-8 md:mb-12">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col md:flex-row w-full h-full"
                >
                    {/* Coluna Esquerda (Hidden on mobile) */}
                    <div className="hidden md:block w-1/3 h-full overflow-hidden relative">
                        <img src={slides[current].img} alt="" className="w-full h-full object-cover opacity-60 blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-1/2"></div>
                    </div>

                    {/* Coluna Central */}
                    <div className={`w-full md:w-1/3 h-full ${slides[current].bgColor} flex flex-col items-center justify-center relative p-8`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent h-1/2 pointer-events-none"></div>

                        <div className="text-center z-10 w-full flex flex-col items-center">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-white tracking-tight leading-tight text-center uppercase">
                                {slides[current].title}
                            </h1>
                            <p className="text-[10px] md:text-[11px] tracking-[0.35em] text-white/90 uppercase mb-10 text-center font-light">
                                {slides[current].subtitle}
                            </p>
                            <Link to={`/producto/${slides[current].id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "#000" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-[#2C2826] px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all"
                                >
                                    {t('common.details')}
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Coluna Direita (Hidden on mobile) */}
                    <div className="hidden md:block w-1/3 h-full">
                        <img src={slides[current].img} alt="" className="w-full h-full object-contain p-12 mix-blend-multiply" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-[#2C2826] hover:bg-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-20 transition-all hover:scale-105"
                    >
                        <ChevronLeft size={22} strokeWidth={1.5} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-[#2C2826] hover:bg-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-20 transition-all hover:scale-105"
                    >
                        <ChevronRight size={22} strokeWidth={1.5} />
                    </button>
                </>
            )}
        </section>
    );
}
