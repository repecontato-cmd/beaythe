import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

const translationsData = {
    es: {
        currency: "€",
        announcement: "It's all about Beauthé.",
        about_you: "Todo sobre ti.",
        new_arrivals: "Lanzamientos",
        search_placeholder: "Busca aquí tu ritual de belleza...",
        search_results: "Resultados de búsqueda",
        no_results: "No encontramos resultados para",
        search: {
            results_for: "Resultados para",
            result_found: "resultado encontrado",
            results_found: "resultados encontrados",
            no_results: "No encontramos resultados",
            try_again: "Intenta con otras palabras clave o explora nuestras categorías principales para encontrar lo que buscas.",
            view_all: "Explorar todo"
        },
        common: {
            buy_now: "Comprar Ahora",
            add_kit: "Añadir Kit",
            home: "Inicio",
            add: "Añadir al carrito",
            remove: "Quitar",
            edit: "Editar",
            save: "Guardar",
            cancel: "Cancelar",
            shades: "tonos",
            essential: "Esencial",
            items: "artículos",
            discover: "Descubrir",
            view_all: "Ver Todo",
            learn_more: "Saber Más",
            tones: "tonos",
            tone: "tono",
            details: "Ver Detalles",
            composition: "Composición",
            description: "Descripción",
            filter: "Filtrar por",
            sort: "Ordenar por",
            recommended: "Recomendados",
            categories: "Categorías",
            language: "Idioma",
            favorites: "Favoritos",
            seo: {
                home: "Beauthé: Alta cosmética vegana y rituales de belleza con propósito. Descubre lo melhor en cuidado facial y corporal.",
                skin: "Cuidado Facial: Sérums, cremas y tónicos formulados con ingredientes naturales para una piel radiante y saludable.",
                hair: "Cuidado Capilar: Nutrición y brillo para tu cabello con nuestras fórmulas exclusivas libres de sulfatos.",
                makeup: "Maquillaje Consciente: Realza tu belleza natural con productos de larga duración y texturas sensoriales."
            },
            cookies: {
                title: "Respetamos tu privacidad 🍪",
                message: "Utilizamos cookies para mejorar tu experiencia y recordar tus preferencias. Al continuar navegando, aceptas su uso.",
                accept: "Entendido",
                decline: "Declinar",
                more: "Saber más"
            },
            more: "Ver más"
        },
        categories: {
            all_collection: "Toda la Colección",
            collection: "Colección",
            rostro: { title: "Cuidado Facial", tagline: "Rituales de Pureza", desc: "Sérums, tónicos y cremas formulados para una piel radiante." },
            maquillaje: { title: "Maquillaje", tagline: "Belleza Consciente", desc: "Texturas sensoriales que realzan tu belleza natural." },
            cabello: { title: "Cuidado Capilar", tagline: "Nutrición Intensa", desc: "Fórmulas exclusivas para un cabello fuerte y brillante." },
            tendencias: { title: "Tendencias", tagline: "Lo Último de Beauthé", desc: "Descubre los productos más deseados de esta temporada." },
            manos_pies: { title: "Manos y Pies", tagline: "Cuidado Esencial", desc: "Hidratación y nutrición profunda para tus extremidades." },
            cuerpo: { title: "Baño y Cuerpo", tagline: "Bienestar Total", desc: "Hidratación profunda para cada centímetro de tu piel." },
            bienestar: { title: "Bienestar", tagline: "Mente y Cuerpo", desc: "Productos diseñados para tu momento de relax diario." },
            hombre: { title: "Línea Hombre", tagline: "Cuidado Masculino", desc: "Fórmulas prácticas y eficaces para el hombre moderno." },
            default: { title: "Beauthé", tagline: "Belleza con Propósito", desc: "Explora nuestra selección de alta cosmética natural." }
        },
        hero: {
            skin_care: { title: "Cuidado Facial", desc: "Sérums y cremas de alta eficacia." },
            hair_care: { title: "Cuidado Capilar", desc: "Brillo y nutrición para tu melena." },
            sun_care: { title: "Días de Sol", desc: "Protección avanzada para tu piel." },
            manos_pies: { title: "Manos y Pies", desc: "Suavidad y nutrición diaria." },
            discover: "Descubrir",
            subtitle: "Lo Mejor para Ti",
            title_part1: "Siente tu",
            title_part2: "belleza natural",
            button: "Comprar Piel Sensible"
        },
        nav: {
            outlet: "Outlet",
            marcas: "Marcas",
            rostro: "Rostro",
            cuerpo: "Cuerpo y Baño",
            bienestar: "Bienestar",
            cabello: "Cabello",
            solares: "Solares",
            maquillaje: "Maquillaje",
            manos_pies: "Manos y Pies",
            all_products: "Todos los productos",
            kits: "Kits"
        },
        cart: {
            title: "Tu Carrito",
            empty: "Tu carrito está vacío",
            empty_desc: "Explora nuestras categorías y encuentra tu ritual ideal.",
            checkout: "Finalizar Compra",
            total: "Total",
            free: "Gratis"
        },
        filters: {
            price: "Precio",
            sort_by: "Ordenar por",
            recommended: "Recomendados",
            newest: "Novedades"
        },
        history: {
            banner_title: "Nuestra Historia",
            view_collections: "Ver colecciones"
        },
        products: {}
    },
    pt: {
        currency: "€",
        announcement: "It's all about Beauthé.",
        about_you: "Tudo sobre si.",
        new_arrivals: "Lançamentos",
        search_placeholder: "Pesquise aqui o seu ritual de beleza...",
        search_results: "Resultados da pesquisa",
        no_results: "Não encontramos resultados para",
        search: {
            results_for: "Resultados para",
            result_found: "resultado encontrado",
            results_found: "resultados encontrados",
            no_results: "Não encontramos resultados",
            try_again: "Tente com outras palavras-chave ou explore as nossas categorias principais para encontrar o que procura.",
            view_all: "Explorar tudo"
        },
        common: {
            buy_now: "Comprar Agora",
            add_kit: "Adicionar Kit",
            home: "Início",
            add: "Adicionar ao carrinho",
            remove: "Remover",
            edit: "Editar",
            save: "Guardar",
            cancel: "Cancelar",
            shades: "tons",
            essential: "Essencial",
            items: "itens",
            discover: "Descobrir",
            view_all: "Ver Tudo",
            learn_more: "Saber Mais",
            tones: "tons",
            tone: "tom",
            details: "Ver Detalhes",
            composition: "Composição",
            description: "Descrição",
            filter: "Filtrar por",
            sort: "Ordenar por",
            recommended: "Recomendados",
            categories: "Categorias",
            language: "Idioma",
            favorites: "Favoritos",
            seo: {
                home: "Beauthé: Alta cosmética vegana e rituais de beleza com propósito. Descubra o melhor em cuidado facial e corporal.",
                skin: "Cuidado Facial: Séruns, cremes e tónicos formulados com ingredientes naturais para uma pele radiante e saudável.",
                hair: "Cuidado Capilar: Nutrição e brilho para o seu cabelo com as nossas fórmulas exclusivas livres de sulfatos.",
                makeup: "Maquilhagem Consciente: Realce a sua beleza natural com produtos de longa duração e texturas sensoriais."
            },
            cookies: {
                title: "Respeitamos a sua privacidade 🍪",
                message: "Utilizamos cookies para melhorar a sua experiência e lembrar as suas preferências. Ao continuar a navegar, aceita o seu uso.",
                accept: "Entendi",
                decline: "Recusar",
                more: "Saber mais"
            },
            more: "Ver mais"
        },
        categories: {
            all_collection: "Toda a Coleção",
            collection: "Coleção",
            rostro: { title: "Cuidado Facial", tagline: "Rituais de Pureza", desc: "Séruns, tónicos e cremes formulados para uma pele radiante." },
            maquillaje: { title: "Maquilhagem", tagline: "Beleza Consciente", desc: "Texturas sensoriais que realçam a sua beleza natural." },
            cabello: { title: "Cuidado Capilar", tagline: "Nutrição Intensa", desc: "Fórmulas exclusivas para um cabelo forte e brilhante." },
            tendencias: { title: "Tendências", tagline: "O Último da Beauthé", desc: "Descubra os produtos mais desejados desta temporada." },
            manos_pies: { title: "Mãos e Pés", tagline: "Cuidado Essencial", desc: "Hidratação e nutrição profunda para as suas extremidades." },
            cuerpo: { title: "Banho e Corpo", tagline: "Bem-estar Total", desc: "Hidratação profunda para cada centímetro da sua pele." },
            bienestar: { title: "Bem-estar", tagline: "Mente e Corpo", desc: "Produtos desenhados para o seu momento de relax diário." },
            hombre: { title: "Linha Homem", tagline: "Cuidado Masculino", desc: "Fórmulas práticas e eficazes para o homem moderno." },
            default: { title: "Beauthé", tagline: "Beleza com Propósito", desc: "Explore a nossa seleção de alta cosmética natural." }
        },
        hero: {
            skin_care: { title: "Cuidado Facial", desc: "Séruns e cremes de alta eficácia." },
            hair_care: { title: "Cuidado Capilar", desc: "Brilho e nutrição para o seu cabelo." },
            sun_care: { title: "Dias de Sol", desc: "Proteção avançada para a sua pele." },
            manos_pies: { title: "Mãos e Pés", desc: "Suavidade e nutrição diária." },
            discover: "Descobrir",
            subtitle: "O Melhor para Si",
            title_part1: "Sinta a sua",
            title_part2: "beleza natural",
            button: "Comprar Pele Sensível"
        },
        nav: {
            outlet: "Outlet",
            marcas: "Marcas",
            rostro: "Rosto",
            cuerpo: "Corpo & Banho",
            bienestar: "Bem-estar",
            cabello: "Cabelo",
            solares: "Solares",
            maquillaje: "Maquilhagem",
            manos_pies: "Mãos e Pés",
            all_products: "Todos os produtos",
            kits: "Kits"
        },
        cart: {
            title: "O seu Carrinho",
            empty: "O seu carrinho está vazio",
            empty_desc: "Comece a enchê-lo com os seus essenciais de beleza.",
            checkout: "Finalizar Compra",
            total: "Total",
            free: "Grátis"
        },
        filters: {
            price: "Preço",
            sort_by: "Ordenar por",
            recommended: "Recomendados",
            newest: "Novidades"
        },
        history: {
            banner_title: "A nossa História",
            view_collections: "Ver coleções"
        },
        products: {}
    },
    en: {
        currency: "€",
        announcement: "It's all about Beauthé.",
        about_you: "All about you.",
        new_arrivals: "New Arrivals",
        search_placeholder: "Search for your beauty ritual...",
        search_results: "Search results",
        no_results: "No results found for",
        search: {
            results_for: "Results for",
            result_found: "result found",
            results_found: "results found",
            no_results: "No results found",
            try_again: "Try different keywords or explore our main categories to find what you're looking for.",
            view_all: "Explore all"
        },
        common: {
            buy_now: "Buy Now",
            add_kit: "Add Kit",
            home: "Home",
            add: "Add to cart",
            remove: "Remove",
            edit: "Edit",
            save: "Save",
            cancel: "Cancel",
            shades: "shades",
            essential: "Essential",
            items: "items",
            discover: "Discover",
            view_all: "View All",
            learn_more: "Learn More",
            tones: "tones",
            tone: "tone",
            details: "View Details",
            composition: "Composition",
            description: "Description",
            filter: "Filter by",
            sort: "Sort by",
            recommended: "Recommended",
            categories: "Categories",
            language: "Language",
            favorites: "Favorites",
            seo: {
                home: "Beauthé: High-end vegan cosmetics and purposeful beauty rituals. Discover the best in facial and body care.",
                skin: "Facial Care: Serums, creams and tonics formulated with natural ingredients for radiant and healthy skin.",
                hair: "Hair Care: Nutrition and shine for your hair with our exclusive sulfate-free formulas.",
                makeup: "Conscious Makeup: Enhance your natural beauty with long-lasting products and sensory textures."
            },
            cookies: {
                title: "We respect your privacy 🍪",
                message: "We use cookies to improve your experience and remember your preferences. By continuing to browse, you accept their use.",
                accept: "Understood",
                decline: "Decline",
                more: "Learn more"
            },
            more: "View more"
        },
        categories: {
            all_collection: "All Collection",
            collection: "Collection",
            rostro: { title: "Facial Care", tagline: "Purity Rituals", desc: "Serums, tonics and creams formulated for radiant skin." },
            maquillaje: { title: "Makeup", tagline: "Conscious Beauty", desc: "Sensory textures that enhance your natural beauty." },
            cabello: { title: "Hair Care", tagline: "Intense Nutrition", desc: "Exclusive formulas for strong, shiny hair." },
            tendencias: { title: "Trending", tagline: "Latest from Beauthé", desc: "Discover this season's most wanted products." },
            manos_pies: { title: "Hands & Feet", tagline: "Essential Care", desc: "Deep hydration and nutrition for your extremities." },
            cuerpo: { title: "Bath & Body", tagline: "Total Well-being", desc: "Deep hydration for every inch of your skin." },
            bienestar: { title: "Wellness", tagline: "Mind & Body", desc: "Products designed for your daily relax moment." },
            hombre: { title: "Men's Line", tagline: "Male Care", desc: "Practical and effective formulas for the modern man." },
            default: { title: "Beauthé", tagline: "Beauty with Purpose", desc: "Explore our selection of natural high cosmetics." }
        },
        hero: {
            skin_care: { title: "Skin Care", desc: "High efficacy serums and creams." },
            hair_care: { title: "Hair Care", desc: "Shine and nutrition for your hair." },
            sun_care: { title: "Sun Days", desc: "Advanced protection for your skin." },
            manos_pies: { title: "Hands & Feet", desc: "Daily softness and nutrition." },
            discover: "Discover",
            subtitle: "The Best for You",
            title_part1: "Feel your",
            title_part2: "natural beauty",
            button: "Shop Sensitive Skin"
        },
        nav: {
            outlet: "Outlet",
            marcas: "Brands",
            rostro: "Face",
            cuerpo: "Body & Bath",
            bienestar: "Wellness",
            cabello: "Hair",
            solares: "Sun Care",
            maquillaje: "Makeup",
            manos_pies: "Hands & Feet",
            all_products: "All products",
            kits: "Kits"
        },
        cart: {
            title: "Your Cart",
            empty: "Your cart is empty",
            empty_desc: "Explore our categories and find your ideal ritual.",
            checkout: "Finish Purchase",
            total: "Total",
            free: "Free"
        },
        filters: {
            price: "Price",
            sort_by: "Sort by",
            recommended: "Recommended",
            newest: "New arrivals"
        },
        history: {
            banner_title: "Our Story",
            view_collections: "View collections"
        },
        products: {}
    }
};


export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('beauthe_lang') || 'es');

    const t = (key) => {
        if (!key) return '';
        const keys = key.split('.');
        let value = translationsData[lang];
        for (const k of keys) {
            value = value?.[k];
        }

        // Return empty string or fallback if it resolves to an object (prevents rendering [object Object])
        if (typeof value === 'object' && value !== null) {
            return value.title || value.name || key;
        }

        return value || key;
    };

    const toggleLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem('beauthe_lang', newLang);
    };

    const translateProduct = (product) => {
        if (!product) return product;

        // Try to find translation by name (lowercase, no spaces)
        const productKey = product.name?.toLowerCase().replace(/\s+/g, '_');
        const translatedProduct = translationsData[lang]?.products?.[productKey];

        if (translatedProduct) {
            return {
                ...product,
                name: translatedProduct.name || product.name,
                description: translatedProduct.description || product.description
            };
        }

        return product;
    };

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLanguage, translateProduct }}>
            {children}
        </LanguageContext.Provider>
    );
};
