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

export default function Home() {
    return (
        <>
            <FeaturedCarousel />
            <Marquee />
            <Hero />
            <SkinQuiz />
            <CircularCategories />
            <TrustStrip />
            <TrendingProducts />
            <Reviews />
            <FAQ />
            <AboutUs />
        </>
    );
}
