import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function SkinQuiz() {
    const { t } = useLanguage();
    const quizData = t('quiz');
    const [step, setStep] = useState('intro'); // intro, q0, q1, q2, result
    const [scores, setScores] = useState({ dry: 0, oily: 0, sensitive: 0, normal: 0 });

    if (!quizData || !Array.isArray(quizData.questions)) return null;

    const handleAnswer = (type) => {
        setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
        if (step === 'intro') {
            setStep('q0');
        } else {
            const currentIdx = parseInt(step.replace('q', ''));
            if (currentIdx < quizData.questions.length - 1) {
                setStep(`q${currentIdx + 1}`);
            } else {
                setStep('result');
            }
        }
    };

    const getResultType = () => {
        return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    };

    const resultType = getResultType();

    const recommendationMap = {
        dry: {
            name: "Crema Hidratante Intensa",
            desc: "Nutrición profunda para restaurar la barrera cutánea.",
            img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300"
        },
        oily: {
            name: "Sérum Purificante Matt",
            desc: "Control de brillos y reducción de poros visible.",
            img: "https://images.unsplash.com/photo-1615397323886-0bf17b0ddec2?auto=format&fit=crop&q=80&w=300"
        },
        sensitive: {
            name: "Limpiador Calmante Pro",
            desc: "Limpieza ultrasuave que respeta el equilibrio natural.",
            img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300"
        },
        normal: {
            name: "Sérum Facial Glow",
            desc: "Mantenimiento perfecto para una piel radiante.",
            img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300"
        }
    };

    const reset = () => {
        setStep('intro');
        setScores({ dry: 0, oily: 0, sensitive: 0, normal: 0 });
    };

    return (
        <section className="py-24 px-4 bg-[#2C2826] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C4A49A]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-[800px] mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    {step === 'intro' ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <span className="text-[11px] font-bold tracking-[0.3em] text-[#C4A49A] uppercase mb-6 block">{quizData.tag}</span>
                            <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-8 leading-tight">
                                {quizData.title}
                            </h2>
                            <p className="text-white/90 text-base md:text-lg font-light mb-12 max-w-[500px] mx-auto leading-relaxed">
                                {quizData.desc}
                            </p>
                            <button
                                onClick={() => setStep('q0')}
                                className="bg-white text-[#2C2826] px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#C4A49A] hover:text-white transition-all shadow-xl flex items-center gap-3 mx-auto"
                            >
                                {quizData.start}
                                <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ) : step === 'result' ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white text-[#2C2826] p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
                        >
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="w-full md:w-1/2 aspect-square rounded-[2rem] overflow-hidden bg-[#FCFAF8] border border-[#F1EBE6]">
                                    <img
                                        src={recommendationMap[resultType].img}
                                        alt={recommendationMap[resultType].name}
                                        className="w-full h-full object-contain p-8 mix-blend-multiply"
                                    />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                                        <CheckCircle2 size={20} className="text-[#C4A49A]" />
                                        <span className="text-[11px] font-bold tracking-[0.2em] text-[#8A7369] uppercase">{quizData.result_title}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-[#2C2826]">{quizData.types[resultType]}</h3>
                                    <p className="text-[#5C534F] font-light mb-8 leading-relaxed">
                                        Basado en tus respuestas, hemos seleccionado el <strong>{recommendationMap[resultType].name}</strong> como el punto de partida ideal para tu rutina. {recommendationMap[resultType].desc}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            to="/producto"
                                            className="flex-1 bg-[#2C2826] text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-colors"
                                        >
                                            <ShoppingBag size={14} />
                                            {quizData.result_button}
                                        </Link>
                                        <button
                                            onClick={reset}
                                            className="w-full sm:w-auto px-6 py-4 border border-[#F1EBE6] text-[#8A7369] rounded-xl flex items-center justify-center gap-2 hover:bg-[#FCFAF8] transition-colors"
                                        >
                                            <RotateCcw size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2.5rem]"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                                    Pregunta {parseInt(step.replace('q', '')) + 1} / {quizData.questions.length}
                                </span>
                                <div className="flex gap-1">
                                    {quizData.questions.map((_, i) => (
                                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= parseInt(step.replace('q', '')) ? 'w-8 bg-[#C4A49A]' : 'w-4 bg-white/10'}`}></div>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-normal leading-tight mb-12 text-center md:text-left">
                                {quizData.questions[parseInt(step.replace('q', ''))].q}
                            </h3>

                            <div className="grid gap-4">
                                {quizData.questions[parseInt(step.replace('q', ''))].options.map((opt, i) => (
                                    <motion.button
                                        whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
                                        whileTap={{ scale: 0.98 }}
                                        key={i}
                                        onClick={() => handleAnswer(opt.type)}
                                        className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-[#C4A49A] transition-all flex items-center justify-between group"
                                    >
                                        <span className="text-[15px] font-light text-white/80 group-hover:text-white transition-colors">{opt.text}</span>
                                        <ArrowRight size={18} className="text-white/20 group-hover:text-[#C4A49A] transition-colors" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
