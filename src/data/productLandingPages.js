import { Droplets, Leaf, Sparkles, Beaker, Shield, Lightbulb } from 'lucide-react';

export const PRODUCT_LANDING_DATA = {
    // Lip Juice Maxi Gloss
    99: {
        primary: "#E85D75", // Pinkish Pitaya
        secondary: "#FF8C61", // Guava
        bg: "#FFF5F6",
        accent: "#C4A49A",
        font: "font-serif",
        marketing: {
            texture: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
            ingredient: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
            lifestyle: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600"
        },
        landingPage: {
            problem: {
                headline: "Tired of sticky, short-lived glosses?",
                description: "Most products leave your lips dry and uncomfortable after an hour. LIP JUICE is formulated to feel like a second skin while providing intense nourishment."
            },
            solution: {
                headline: "The Science of Pure Glow",
                benefits: [
                    { title: "24h Hydration", desc: "Infused with cold-pressed Pitaya extracts.", icon: Droplets },
                    { title: "Pure Ingredients", desc: "100% Vegan, Paraben-free, and Cruelty-free.", icon: Leaf },
                    { title: "Satin Finish", desc: "Guaranteed non-sticky feel all day long.", icon: Sparkles }
                ]
            },
            comparison: {
                us: ["Clean & Ethical", "Long-lasting hydration", "Dermatologically tested"],
                them: ["Chemical-heavy", "Temporary effect", "Often causes irritation"]
            },
            faq: [
                { question: "Is it suitable for sensitive lips?", answer: "Absolutely. Our formula is tested on sensitive skin and is free from harsh perfumes." },
                { question: "How long does the glow last?", answer: "While the hydration lasts up to 24 hours, the visual glow remains vibrant for at least 6 hours without reapplication." }
            ],
            socialProof: {
                tag: "The community Beauthé",
                title: "Real Results from Real Women",
                testimonials: [
                    { name: "Elena R.", role: "Beauty Enthusiast", text: "Finally a gloss that doesn't feel like glue! My lips feel hydrated all day, and the Pitaya shade is just perfect.", rating: 5, avatar: "https://i.pravatar.cc/150?u=elena" },
                    { name: "Sofia M.", role: "Makeup Artist", text: "I use this on all my clients for that 'natural glow' finish. The texture is superior to many luxury brands I've used.", rating: 5, avatar: "https://i.pravatar.cc/150?u=sofia" },
                    { name: "Lucia P.", role: "Verified Buyer", text: "The first thing I noticed was the smell - it's delicious but not overpowering. And it actually heals my dry lips.", rating: 5, avatar: "https://i.pravatar.cc/150?u=lucia" }
                ],
                stats: [
                    { label: "Immediate Hydration", value: "98%" },
                    { label: "Non-Sticky Feel", value: "100%" },
                    { label: "Long-lasting Shine", value: "94%" }
                ]
            },
            formulation: {
                title: "The Science of Purity",
                description: "Our LIP JUICE is more than a gloss; it's a botanical treatment. We've combined Amazonian Pitaya extract with ultra-low molecular weight Hyaluronic Acid.",
                ingredients: [
                    { name: "Pitaya Extract", benefit: "Rich in Vitamin C and antioxidants for natural brightening." },
                    { name: "Hyaluronic Acid", benefit: "Double-action hydration that plumps from within." },
                    { name: "Shea Butter", benefit: "Creates a protective barrier against environmental stress." }
                ],
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
            },
            kits: {
                title: "Recommended Kits",
                description: "Save up to 20% when you bundle your favorite essentials.",
                items: [
                    { name: "The Daily Glow Kit", price: 85.00, originalPrice: 105.00, items: ["Lip Juice", "Glow Serum", "Mist"], image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600" },
                    { name: "Lip Masterclass Set", price: 45.00, originalPrice: 55.00, items: ["Lip Juice", "Lip Liner", "Scrub"], image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            expertTips: {
                title: "Expert Application",
                tips: [
                    { title: "The 'Clean Girl' Look", text: "Apply one thin layer on bare lips after your morning skincare for a natural boost." },
                    { title: "Nighttime Recovery", text: "Apply a thicker layer before bed as a repairing mask for ultra-soft lips by morning." },
                    { title: "Layering Master", text: "Use over your favorite matte lipstick to add multidimensional shine without bleeding." }
                ]
            },
            bundle: {
                title: "Frequently Bought Together",
                payOnly: 87.50,
                items: [
                    { id: 99, name: "LIP JUICE MAXI GLOSS", price: 24.50, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80" },
                    { id: 100, name: "GLOW SÉRUM", price: 45.00, img: "https://images.unsplash.com/photo-1512496015851-a1c8d1720d29?auto=format&fit=crop&q=80&w=400" },
                    { id: 101, name: "PUREZA TONIC", price: 18.00, img: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=400&q=80" }
                ]
            },
            routine: [
                { step: 1, name: "routine.step1_name", desc: "routine.step1_desc", img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&q=80" },
                { step: 2, name: "routine.step2_name", desc: "routine.step2_desc", img: "https://images.unsplash.com/photo-1615397323282-eebad7077e38?w=400&q=80" },
                { step: 3, name: "routine.step3_name", desc: "routine.step3_desc", img: "https://images.unsplash.com/photo-1512496015851-a1c8d1720d29?auto=format&fit=crop&q=80" },
                { step: 4, name: "routine.step4_name", desc: "routine.step4_desc", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80" }
            ]
        }
    },
    // Serum Glow Master Model (Skincare)
    100: {
        primary: "#C4A49A", // Nude/Brown
        secondary: "#8A7369",
        bg: "#FCFAF8",
        accent: "#2C2826",
        font: "font-sans",
        marketing: {
            texture: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
            ingredient: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600",
            lifestyle: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600"
        },
        landingPage: {
            problem: {
                headline: "Dull skin stealing your confidence?",
                description: "Environmental stress and lack of sleep can leave your skin looking tired and aged. GLOW SÉRUM is your 2-minute daily ritual for instant radiance."
            },
            solution: {
                headline: "Illuminating Science",
                benefits: [
                    { title: "Deep Hydration", desc: "Triple-weight Hyaluronic Acid.", icon: Droplets },
                    { title: "Vitamin Boost", desc: "Stable Vitamin C for brightening.", icon: Sparkles },
                    { title: "Skin Barrier", desc: "Ceramides to lock in moisture.", icon: Shield }
                ]
            },
            comparison: {
                us: ["Visible results in 7 days", "Non-greasy finish", "Clinically proven"],
                them: ["Temporary glow only", "Heavy, sticky texture", "Fragrance-heavy"]
            },
            faq: [
                { question: "Can I use it with retinol?", answer: "Yes, but we recommend using GLOW SÉRUM in the morning and Retinol at night." },
                { question: "When will I see results?", answer: "Immediate hydration is visible. Brightening effects typically show after 2-3 weeks of consistent use." }
            ],
            socialProof: {
                tag: "Real Skin Journey",
                title: "Confidence Restored",
                testimonials: [
                    { name: "Maria G.", role: "Skincare Lover", text: "My skin has never looked so healthy. The morning glow is real!", rating: 5, avatar: "https://i.pravatar.cc/150?u=maria" },
                    { name: "Julia L.", role: "Busy Professional", text: "Finally an easy routine that works. 3 drops and I'm ready to go.", rating: 5, avatar: "https://i.pravatar.cc/150?u=julia" }
                ],
                stats: [
                    { label: "Brighter Skin", value: "92%" },
                    { label: "Smoother Texture", value: "88%" },
                    { label: "Radiant Finish", value: "95%" }
                ]
            },
            formulation: {
                title: "The Golden Standard",
                description: "Our formula is a precise blend of active botanicals and lab-tested molecules.",
                ingredients: [
                    { name: "Vitamin C", benefit: "Neutralizes free radicals and boosts collagen." },
                    { name: "Ferulic Acid", benefit: "Stabilizes Vitamin C for 8x more effectiveness." },
                    { name: "Bakuchiol", benefit: "Natural retinol alternative for gentle resurfacing." }
                ],
                image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
            },
            kits: {
                title: "Skincare Bundles",
                description: "Complete your routine and save.",
                items: [
                    { name: "The Radiance Set", price: 110.00, originalPrice: 140.00, items: ["Glow Serum", "Moisturizer", "Cleanser"], image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            expertTips: {
                title: "Dermatologist Advice",
                tips: [
                    { title: "Damp Skin Rule", text: "Apply to slightly damp skin to maximize Hyaluronic Acid absorption." },
                    { title: "Neck & Decolleté", text: "Don't stop at the face! Extend the glow to your neck and chest." }
                ]
            },
            bundle: {
                title: "The Full Ritual",
                payOnly: 92.00,
                items: [
                    { id: 100, name: "GLOW SÉRUM", price: 45.00, img: "https://images.unsplash.com/photo-1512496015851-a1c8d1720d29?auto=format&fit=crop&q=80&w=400" },
                    { id: 102, name: "REPAIR CREAM", price: 55.00, img: "https://images.unsplash.com/photo-1615397323282-eebad7077e38?w=400&q=80" }
                ]
            },
            routine: [
                { step: 1, name: "routine.step1_name", desc: "Cleanse your face thoroughly.", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400" },
                { step: 2, name: "routine.step2_name", desc: "Apply 3 drops of GLOW SÉRUM.", img: "https://images.unsplash.com/photo-1615397323282-eebad7077e38?w=400&q=80" },
                { step: 3, name: "routine.step3_name", desc: "Finish with sun protection.", img: "https://images.unsplash.com/photo-1512496015851-a1c8d1720d29?auto=format&fit=crop&q=80&w=400" }
            ]
        }
    }
};
