import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const reviewsData = [
    {
        id: 1,
        name: "Carolina M.",
        product: "Sérum Glow Radiante",
        text: "Simplesmente incrível! Sinto a minha pele muito mais iluminada e hidratada desde o primeiro uso. O formato em sérum é perfeito para usar antes da maquilhagem.",
        rating: 5,
        date: "12 Mar 2026"
    },
    {
        id: 2,
        name: "Beatriz L.",
        product: "Lip Juice Morango",
        text: "Pedi o de morango e o cheiro é perfeitamente maravilhoso. Fica um brilho lindo e não fica pegajoso. Amei o tom meio rosinha.",
        rating: 5,
        date: "10 Mar 2026"
    },
    {
        id: 3,
        name: "Diana S.",
        product: "Aceite Corporal Glow",
        text: "Comprei para usar depois do banho e o resultado é uma pele muito sedosa. Rende muito, mas não dou 5 estrelas porque a entrega demorou 1 dia a mais.",
        rating: 4,
        date: "05 Mar 2026"
    },
    {
        id: 4,
        name: "Ana P.",
        product: "Mascarilla Revitalizante",
        text: "Minha pele estava muito seca por causa do frio e esta máscara salvou-me! Uso sempre aos domingos no meu skincare.",
        rating: 5,
        date: "01 Mar 2026"
    },
    {
        id: 5,
        name: "Sofia R.",
        product: "Limpiador Facial Suave",
        text: "O melhor gel de limpeza que já usei. Não deixa a pele esticada e remove bem as impurezas.",
        rating: 5,
        date: "28 Feb 2026"
    },
    {
        id: 6,
        name: "Marta G.",
        product: "Creme de Noite Nutritivo",
        text: "Acordo com a pele super macia. A textura é rica mas absorve rápido. Muito satisfeita!",
        rating: 5,
        date: "25 Feb 2026"
    },
    {
        id: 7,
        name: "Isabel T.",
        product: "Solar Facial SPF 50",
        text: "Finalmente um protetor solar que não deixa a cara branca! Fica muito bem por baixo da base.",
        rating: 5,
        date: "20 Feb 2026"
    },
    {
        id: 8,
        name: "Cláudia B.",
        product: "Máscara de Cílios Volume",
        text: "Dá muito volume sem deixar grumos. É a minha nova favorita para o dia a dia.",
        rating: 4,
        date: "15 Feb 2026"
    },
    {
        id: 9,
        name: "Patrícia V.",
        product: "Bálsamo Labial Calcio",
        text: "Recuperou os meus lábios num instante. Super hidratante e nada pegajoso.",
        rating: 5,
        date: "10 Feb 2026"
    },
    {
        id: 10,
        name: "Lúcia F.",
        product: "Sérum Vitamina C",
        text: "Estou a usar há duas semanas e já noto as manchas mais claras. Top!",
        rating: 5,
        date: "05 Feb 2026"
    }
];


export default function Reviews() {
    const { t } = useLanguage();
    const [visibleCount, setVisibleCount] = React.useState(4);

    const showMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const reviews = reviewsData.slice(0, visibleCount);

    return (
        <section className="w-full bg-[#FCFAF8] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#F1EBE6]">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#8A7369] uppercase mb-4">{t('reviews_section.tag')}</p>
                    <h2 className="text-3xl md:text-5xl font-normal text-[#2C2826] tracking-tight">{t('reviews_section.title')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-[2rem] border border-[#F1EBE6] shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col h-full"
                        >
                            <div className="flex gap-1 text-[#FF9529] mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={i < review.rating ? "fill-[#FF9529]" : "text-[#EBE1DA]"} />
                                ))}
                            </div>
                            <h4 className="text-[13px] font-bold text-[#8A7369] mb-4 uppercase tracking-wider">{review.product}</h4>
                            <p className="text-[14px] text-[#5C534F] font-light leading-relaxed flex-grow mb-6">"{review.text}"</p>
                            <div className="flex justify-between items-end border-t border-[#F1EBE6] pt-4 mt-auto">
                                <span className="text-[13px] font-bold text-[#2C2826]">{review.name}</span>
                                <span className="text-[11px] text-[#A69B97]">{review.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    {visibleCount < reviewsData.length && (
                        <button
                            onClick={showMore}
                            className="border border-[#2C2826] text-[#2C2826] px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#2C2826] hover:text-white transition-all shadow-sm active:scale-95"
                        >
                            Ver Mais Reviews
                        </button>
                    )}
                    <p className="text-[11px] text-[#A69B97] mt-4 font-light">Média de 4.9/5 estrelas baseada em clientes verificados</p>
                </div>
            </div>
        </section>
    );
}

