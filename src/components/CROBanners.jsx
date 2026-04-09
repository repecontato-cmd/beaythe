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
        </>
    );
}
