import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Marquee() {
    const { t } = useLanguage();
    const phrases = t('marquee');

    // Repeat many times so we have a super long w-max container
    const repeatedPhrases = Array(20).fill(phrases || []).flat();

    return (
        <div className="w-full bg-[#2C2826] text-[#EBE1DA] py-3.5 overflow-hidden flex whitespace-nowrap">
            <div className="animate-marquee flex gap-8 items-center w-max">
                {repeatedPhrases.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className="text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase">
                            {item}
                        </span>
                        <span className="text-xs opacity-50">•</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
