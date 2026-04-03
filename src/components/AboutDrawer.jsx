import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AboutDrawer({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-[#FCFAF8] z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#F1EBE6] bg-white">
                            <h2 className="text-2xl font-bold text-[#2C2826] tracking-tight uppercase">
                                Nuestra Historia
                            </h2>
                            <button onClick={onClose} className="p-2 text-[#5C534F] hover:text-[#2C2826] transition-colors rounded-full hover:bg-[#F4EFEA]">
                                <X size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                            <img
                                src="https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80"
                                alt="Historia Beauthé"
                                className="w-full h-56 object-cover rounded-sm mb-8 shadow-sm"
                            />
                            <h3 className="text-xl font-medium mb-4 text-[#2C2826] tracking-wide">DE UNA IDEA A UN ESTILO DE VIDA</h3>
                            <p className="text-[14px] leading-relaxed text-[#5C534F] font-light mb-8">
                                Beauthé nació de un sueño sencillo: democratizar el acceso a productos de belleza de alta calidad que respeten tanto la piel como nuestro entorno natural. Comenzamos experimentando con ingredientes puros y fórmulas limpias, impulsados por la necesidad de transparencia en el cuidado personal.
                            </p>

                            <h3 className="text-xl font-medium mb-4 text-[#2C2826] tracking-wide">NUESTROS PRINCIPIOS</h3>
                            <ul className="space-y-4 text-[14px] leading-relaxed text-[#5C534F] font-light mb-8">
                                <li className="flex gap-3">
                                    <span className="text-lg">🌿</span>
                                    <span><strong>100% Cruelty Free:</strong> Nunca probamos en animales y exigimos las mismas prácticas éticas a todos nuestros proveedores y socios.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-lg">💧</span>
                                    <span><strong>Fórmulas Limpias:</strong> Nuestras colecciones están libres de parabenos, sulfatos agresivos, toxinas y químicos innecesarios.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-lg">♻️</span>
                                    <span><strong>Sustentabilidad:</strong> Usamos envases reciclables y nos esforzamos por mantener procesos neutros en carbono.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-lg">✨</span>
                                    <span><strong>Transparencia Real:</strong> Tienes derecho a saber exactamente qué ingredientes estás poniendo sobre tu piel.</span>
                                </li>
                            </ul>

                            <div className="p-6 bg-[#EBE1DA] rounded-sm text-center mb-8 shadow-inner overflow-hidden relative">
                                <p className="text-[#4A423F] font-medium relative z-10">
                                    "Creemos que cuidarse a uno mismo es el primer y más importante paso para sentirse invencible en el día a día."
                                </p>
                            </div>

                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#2C2826] text-white py-4 text-[12px] font-bold tracking-[0.1em] uppercase hover:bg-[#4A423F] transition-colors rounded-sm shadow-md"
                            >
                                Volver a la tienda
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
