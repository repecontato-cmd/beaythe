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
            view_all: "Explora todo"
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
        faq_section: {
            title: "Preguntas Frecuentes",
            subtitle: "Todo lo que necesitas saber sobre tu ritual de belleza.",
            items: [
                {
                    question: "¿Cuánto tiempo tardan en hacer efecto los productos de Skin Care?",
                    answer: "Depende del producto y de tu tipo de piel. Los resultados de hidratación inicial se notan de inmediato, mientras que los tratamientos profundos suelen mostrar cambios visibles tras 3 a 4 semanas de uso constante."
                },
                {
                    question: "¿Los productos son adecuados para pieles sensibles?",
                    answer: "Sí, toda nuestra colección Beauthé está testada dermatológicamente y formulada con ingredientes suaves, diseñados para respetar y calmar incluso las pieles más delicadas."
                },
                {
                    question: "¿Puedo combinar Vitamina C con Retinol en mi rutina?",
                    answer: "Recomendamos utilizar la Vitamina C en tu rutina de mañana para proteger la piel de los radicales libres, y dejar el Retinol para tu rutina nocturna, promoviendo la renovación celular sin causar irritación."
                }
            ]
        },
        history: {
            banner_tag: "De una idea a un estilo de vida",
            banner_title: "Nuestra Historia",
            banner_desc: "Nacimos para caminar con belleza, verdad y ligereza.",
            values_title: "Valores y Propósitos",
            transparency_title: "Transparencia Real",
            transparency_desc: "Fórmulas limpias y éticas en cada producto.",
            purity: "Pureza",
            sustainability_title: "Sostenibilidad 100%",
            sustainability_desc: "Envases reciclables y recursos renovables.",
            lightness_title: "Ligereza con Propósito",
            join_us_tag: "Únete a nosotros",
            join_us_title_1: "Te invitamos a ser parte de",
            join_us_title_2: "nuestra historia.",
            join_us_desc: "Descubre lo que significa Vivir Bonito. Explora nuestra colección completa de cuidados.",
            view_collections: "Ver colecciones"
        },
        about_us: {
            tag: "Valores y Propósitos",
            title_1: "Te invitamos a ser",
            title_2: "parte de nuestra historia",
            desc: "Únete a nosotros en este viaje y descubre lo que significa cuidarse con cariño y propósito."
        },
        footer: {
            customer_service: "Atención al Cliente",
            about: "Sobre Nosotros",
            legal: "Legal",
            subscribe_btn: "Unirse",
            placeholder: "Tu e-mail",
            rights: "Todos los derechos reservados."
        },
        checkout: {
            title: "Finalizar Compra",
            shipping_address: "Dirección de Envío",
            payment_method: "Método de Pago",
            order_summary: "Resumo del Pedido",
            place_order: "Confirmar Pedido"
        },
        product: {
            add_to_cart: "Añadir al carrito",
            paraben_free: "sin parabenos",
            vegan: "vegano",
            recommended: "Productos Recomendados"
        },
        badges: {
            best_seller: "Más Vendido",
            new: "Nuevo",
            trend: "Tendencia"
        },
        profile: {
            orders: "Mis Pedidos",
            account: "Perfil",
            logout: "Cerrar sesión"
        },
        auth: {
            login_title: "Iniciar sesión",
            register_title: "Crear cuenta",
            login_btn: "Entrar",
            register_btn: "Registrarme"
        },
        favorites: {
            title: "Tus favoritos",
            empty_title_1: "Aún no tienes",
            empty_title_2: "favoritos"
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
            rostro: { title: "Cuidado Facial", tagline: "Rituais de Pureza", desc: "Sérums, tónicos e cremes formulados para uma pele radiante." },
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
        faq_section: {
            title: "Perguntas Frequentes",
            subtitle: "Tudo o que precisa de saber sobre o seu ritual de beleza.",
            items: [
                {
                    question: "¿Quanto tempo demoram a fazer efeito os produtos de Skin Care?",
                    answer: "Depende do produto e do seu tipo de pele. Os resultados de hidratação inicial notam-se de imediato, enquanto os tratamentos profundos costumam mostrar mudanças visíveis após 3 a 4 semanas de uso constante."
                },
                {
                    question: "¿Os produtos são adequados para peles sensíveis?",
                    answer: "Sim, toda a nossa coleção Beauthé está testada dermatologicamente e formulada com ingredientes suaves, desenhados para respeitar e acalmar até as peles mais delicadas."
                }
            ]
        },
        history: {
            banner_tag: "De uma ideia a um estilo de vida",
            banner_title: "A nossa História",
            banner_desc: "Somos criados para caminhar com beleza, verdade e leveza.",
            values_title: "Valores e Propósitos",
            transparency_title: "Transparência Real",
            transparency_desc: "Fórmulas limpas e éticas em cada produto.",
            purity: "Pureza",
            sustainability_title: "Sustentabilidade 100%",
            sustainability_desc: "Embalagens recicláveis e recursos renováveis.",
            lightness_title: "Leveza com propósito",
            join_us_tag: "Junte-se a nós",
            join_us_title_1: "Te convidamos a ser parte da",
            join_us_title_2: "nossa história.",
            join_us_desc: "Descubra o que significa Viver Bonito. Explore a nossa coleção completa de cuidados.",
            view_collections: "Ver coleções"
        },
        about_us: {
            tag: "Valores e Propósitos",
            title_1: "Te convidamos a ser",
            title_2: "parte da nossa história",
            desc: "Junte-se a nós nesta jornada e descubra o que significa cuidar-se com carinho e propósito."
        },
        footer: {
            customer_service: "Apoio ao Cliente",
            about: "Sobre Nós",
            legal: "Legal",
            subscribe_btn: "Aderir",
            placeholder: "O seu e-mail",
            rights: "Todos os direitos reservados."
        },
        checkout: {
            title: "Finalizar Compra",
            shipping_address: "Endereço de Envio",
            payment_method: "Método de Pagamento",
            order_summary: "Resumo do Pedido",
            place_order: "Confirmar Pedido"
        },
        product: {
            add_to_cart: "Adicionar ao carrinho",
            paraben_free: "sem parabenos",
            vegan: "vegano",
            recommended: "Produtos Recomendados"
        },
        badges: {
            best_seller: "Mais Vendido",
            new: "Novo",
            trend: "Tendência"
        },
        profile: {
            orders: "Meus Pedidos",
            account: "Perfil",
            logout: "Sair da conta"
        },
        auth: {
            login_title: "Iniciar sessão",
            register_title: "Criar conta",
            login_btn: "Entrar",
            register_btn: "Registar-me"
        },
        favorites: {
            title: "Os seus favoritos",
            empty_title_1: "Ainda não tem",
            empty_title_2: "favoritos"
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
        faq_section: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know about your beauty ritual.",
            items: [
                {
                    question: "How long does it take for Skin Care products to take effect?",
                    answer: "It depends on the product and your skin type. Initial hydration results are noticed immediately, while deep treatments usually show visible changes after 3 to 4 weeks of consistent use."
                },
                {
                    question: "Are the products suitable for sensitive skin?",
                    answer: "Yes, our entire Beauthé collection is dermatologically tested and formulated with gentle ingredients, designed to respect and soothe even the most delicate skin."
                }
            ]
        },
        history: {
            banner_tag: "From an idea to a lifestyle",
            banner_title: "Our Story",
            banner_desc: "We are created to walk with beauty, truth and lightness.",
            values_title: "Values and Purposes",
            transparency_title: "Real Transparency",
            transparency_desc: "Clean and ethical formulas in each product.",
            purity: "Purity",
            sustainability_title: "100% Sustainability",
            sustainability_desc: "Recyclable packaging and renewable resources.",
            lightness_title: "Lightness with purpose",
            join_us_tag: "Join us",
            join_us_title_1: "We invite you to be part of",
            join_us_title_2: "our story.",
            join_us_desc: "Discover what it means to Live Beautifully. Explore our full collection of care.",
            view_collections: "View collections"
        },
        about_us: {
            tag: "Values and Purposes",
            title_1: "We invite you to be",
            title_2: "part of our story",
            desc: "Join us on this journey and discover what it means to care for yourself with love and purpose."
        },
        footer: {
            customer_service: "Customer Service",
            about: "About Us",
            legal: "Legal",
            subscribe_btn: "Join",
            placeholder: "Your email",
            rights: "All rights reserved."
        },
        checkout: {
            title: "Finish Purchase",
            shipping_address: "Shipping Address",
            payment_method: "Payment Method",
            order_summary: "Order Summary",
            place_order: "Confirm Order"
        },
        product: {
            add_to_cart: "Add to cart",
            paraben_free: "paraben free",
            vegan: "vegan",
            recommended: "Recommended Products"
        },
        badges: {
            best_seller: "Best Seller",
            new: "New",
            trend: "Trend"
        },
        profile: {
            orders: "My Orders",
            account: "Profile",
            logout: "Logout"
        },
        auth: {
            login_title: "Login",
            register_title: "Create account",
            login_btn: "Enter",
            register_btn: "Register"
        },
        favorites: {
            title: "Your favorites",
            empty_title_1: "You don't have",
            empty_title_2: "favorites yet"
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
            return value.title || value.name || value.label || key;
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
