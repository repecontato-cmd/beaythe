import React from 'react';
import Hero from '../components/Hero';
import FeaturedCarousel from '../components/FeaturedCarousel';
import CircularCategories from '../components/CircularCategories';
import Marquee from '../components/Marquee';
import TrendingProducts from '../components/TrendingProducts';
import FAQ from '../components/FAQ';
import AboutUs from '../components/AboutUs';
import Reviews from '../components/Reviews';
import TrustStrip from '../components/TrustStrip';
import SkinQuiz from '../components/SkinQuiz';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t } = useLanguage();

    return (
        <>
            <FeaturedCarousel />
            <Marquee />
            <Hero />
            <SkinQuiz />
            <CircularCategories />
            <TrustStrip />
            <TrendingProducts type="new" overrideTitle={t('filters.sort_options.novidades')} />
            <TrendingProducts />
            <Reviews />
            <FAQ />
            <AboutUs />
        </>
    );
}
