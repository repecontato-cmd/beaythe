import React, { useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function FAQPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FCFAF8] pt-12 pb-24">
            <FAQ />
        </div>
    );
}
