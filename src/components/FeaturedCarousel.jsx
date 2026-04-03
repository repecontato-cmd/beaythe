import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: "LIP JUICE",
        subtitle: "P I T A Y A   &   B A N A N A",
        leftImg: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
        rightImg: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
        bgColor: "bg-[#4A423F]",
    },
    {
        id: 2,
        title: "GLOW SÉRUM",
        subtitle: "V I T A M I N A   C   &   E",
        leftImg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        rightImg: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
        bgColor: "bg-[#C4A49A]",
    },
    {
        id: 3,
        title: "FRESH TOUCH",
        subtitle: "A L O E   &   R O S A S",
        leftImg: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80",
        rightImg: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
        bgColor: "bg-[#8A7369]",
    }
];

export default function FeaturedCarousel() {
    const { t } = useLanguage();
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((c) => (c + 1) % slides.length);
    const prevSlide = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

    return (
        <section className="w-full relative h-[450px] md:h-[600px] overflow-hidden bg-white mb-12">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col md:flex-row w-full h-full"
                >
                    {/* Coluna Esquerda */}
                    <div className="hidden md:block w-1/3 h-full">
                        <img src={slides[current].leftImg} alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* Coluna Central */}
                    <div className={`w-full md:w-1/3 h-full ${slides[current].bgColor} flex flex-col items-center justify-center relative p-8`}>
                        <div className="text-center z-10 w-full flex flex-col items-center">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-3 text-white tracking-tight leading-none text-center">
                                {t(`hero.hero_carousel.slide_${slides[current].id}.title`)}
                            </h1>
                            <p className="text-[10px] md:text-[11px] tracking-[0.35em] text-white/90 uppercase mb-10 text-center">
                                {t(`hero.hero_carousel.slide_${slides[current].id}.subtitle`)}
                            </p>
                            <Link to={`/producto/${slides[current].id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "#000" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#2C2826] text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl transition-all"
                                >
                                    {t('common.details')}
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Coluna Direita */}
                    <div className="hidden md:block w-1/3 h-full">
                        <img src={slides[current].rightImg} alt="" className="w-full h-full object-cover" />
                    </div>
                </motion.div>
            </AnimatePresence>

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
        </section>
    );
}
