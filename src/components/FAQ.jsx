import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = t('faq_section.items');

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 px-4 md:px-8 max-w-[800px] mx-auto bg-[#FCFAF8] my-10 rounded-sm">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-normal text-[#2C2826] mb-4">{t('faq_section.title')}</h2>
                <p className="text-[#8A7369] font-light tracking-wide text-[14px]">{t('faq_section.subtitle')}</p>
            </div>

            <div className="space-y-2">
                {Array.isArray(faqs) && faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div key={idx} className="border-b border-[#EBE1DA] overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                            >
                                <span className={`text-[15px] pr-8 transition-colors ${isOpen ? 'text-[#C4A49A] font-medium' : 'text-[#2C2826] font-normal group-hover:text-[#8A7369]'}`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: isOpen ? -90 : 0 }}
                                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                    className="text-[#C4A49A] flex-shrink-0"
                                >
                                    <ChevronLeft size={22} strokeWidth={1.5} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-[#5C534F] text-[14px] leading-relaxed font-light pb-8 pr-12">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
