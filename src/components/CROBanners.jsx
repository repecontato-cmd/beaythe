import React from 'react';
import { useCRO } from '../context/CROContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';

export default function CROBanners() {
    const { visits, funnelState, showConsentBanner, acceptConsent, declineConsent, clearFunnel } = useCRO();
    const { t } = useLanguage();
    const [isWelcomeVisible, setIsWelcomeVisible] = React.useState(true);

    return (
        <>
            {/* Conditional Welcome Message */}
            <AnimatePresence>
                {(visits === 1 || visits === 2) && isWelcomeVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-0 left-0 w-full z-50 bg-[#C4A49A] text-white py-3 px-4 text-center text-sm font-bold tracking-widest uppercase flex justify-center items-center gap-4 shadow-md"
                    >
                        <span>
                            {visits === 1 ? "Bem-vindo! Conheça o nosso trabalho e as nossas coleções exclusivas." : "Bom ver-te de volta! Temos novidades desde a tua última visita."}
                        </span>
                        <button onClick={() => setIsWelcomeVisible(false)} className="hover:text-black transition-colors"><X size={16} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Funnel Recovery (Abandoned Cart) */}
            <AnimatePresence>
                {funnelState === 'cart_abandoned' && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-24 right-4 md:right-8 bg-white border-2 border-[#2C2826] p-6 rounded-2xl shadow-2xl z-40 max-w-sm flex flex-col gap-4"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#EBE1DA] p-3 rounded-full text-[#8A7369]">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[#2C2826] leading-tight">Esqueceste algo?</h4>
                                    <p className="text-sm text-[#8A7369] leading-snug">Deixaste itens no teu carrinho.</p>
                                </div>
                            </div>
                            <button onClick={clearFunnel} className="text-[#A69B97] hover:text-[#E85D75] transition-colors"><X size={20} /></button>
                        </div>
                        <Link to="/checkout" className="w-full py-3 bg-[#2C2826] text-white text-center font-bold rounded-xl hover:bg-black transition-all shadow-md text-sm uppercase tracking-wider">
                            Continuar Compra
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cookie Consent Banner */}
            <AnimatePresence>
                {showConsentBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-0 left-0 w-full bg-[#2C2826] text-white z-[100] py-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
                    >
                        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
                                <span className="text-lg">🍪</span>
                                <p className="text-[13px] md:text-sm font-light leading-relaxed max-w-3xl">
                                    <span className="font-bold mr-2 text-[#EBE1DA]">{t('common.cookies.title')}</span>
                                    {t('common.cookies.message')}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <Link to="/historia" className="text-[11px] uppercase tracking-widest font-bold text-[#A69B97] hover:text-white transition-colors">
                                    {t('common.cookies.more')}
                                </Link>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={declineConsent}
                                        className="px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#8A7369] bg-transparent border border-[#5C534F] hover:bg-[#5C534F] hover:text-white transition-all whitespace-nowrap"
                                    >
                                        {t('common.cookies.decline')}
                                    </button>
                                    <button
                                        onClick={acceptConsent}
                                        className="bg-[#C4A49A] text-[#2C2826] px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg active:scale-95"
                                    >
                                        {t('common.cookies.accept')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
