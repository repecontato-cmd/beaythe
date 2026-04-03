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
        nav: {
            outlet: "Outlet",
            marcas: "Marcas",
            rostro: "Rostro",
            cuerpo: "Cuerpo y Baño",
            bienestar: "Bienestar",
            cabello: "Cabello",
            solares: "Solares",
            maquillaje: "Maquillaje",
            perfumes: "Perfumes",
            hombre: "Hombre",
            bebe_mama: "Bebé y mamá",
            regalos: "Regalos",
            limpiadores: "Limpiadores",
            tonicos: "Tónicos",
            serums: "Sérums",
            cremas: "Cremas",
            contorno: "Contorno",
            mascarillas: "Mascarillas",
            base: "Base",
            correctores: "Correctores",
            polvo: "Polvo",
            rubor: "Rubor",
            labios: "Labios",
            higiene: "Higiene",
            hidratacion: "Hidratación",
            cuidados: "Cuidados",
            manos_pies: "Manos y Pies",
            lavado: "Lavado",
            tratamiento: "Tratamiento",
            styling: "Styling",
            femeninos: "Femeninos",
            masculinos: "Masculinos",
            unisex: "Unisex",
            hogar: "Hogar",
            promociones: "Promociones",
            ultimas: "Últimas Unidades",
            best_sellers: "Más Vendidos",
            all_products: "Todos los productos",
            kits: "Kits",
            eyes: "Ojos",
            sub_limpiadores: ["Geles", "Espumas", "Micelares"],
            sub_tonicos: ["Hidratantes", "Astringentes"],
            sub_serums: ["Vitamina C", "Retinol"],
            sub_cremas: ["Día", "Noche", "Antiedad"],
            sub_contorno: ["Bolsas", "Ojeras"],
            sub_mascarillas: ["Arcilla", "Hidrogel"],
            sub_base: ["Líquida", "Polvo", "BB Cream"],
            sub_correctores: ["Líquido", "Crema"],
            sub_polvo: ["Translúcido", "Compacto"],
            sub_rubor: ["Polvo", "Crema"],
            sub_labios: ["Mate", "Gloss", "Tintas"],
            sub_higiene: ["Jabones", "Geles de Baño"],
            sub_hidratacion: ["Lociones", "Aceites", "Mantecas"],
            sub_cuidados: ["Desodorantes", "Exfoliantes"],
            sub_manos_pies: ["Reparadoras", "Protectoras"],
            sub_lavado: ["Champús", "Acondicionadores"],
            sub_tratamiento: ["Mascarillas", "Sérums", "Aceites"],
            sub_styling: ["Lacas", "Protección Térmica"],
            sub_femeninos: ["Eau de Parfum", "Eau de Toilette"],
            sub_masculinos: ["Fragancias Fresh", "Intensas"],
            sub_unisex: ["Aromáticas", "Cítricas"],
            sub_hogar: ["Velas", "Difusores"],
            sub_promociones: ["Hasta -50%", "2x1 Kits"],
            sub_ultimas: ["Stock Final", "Descontinuados"],
            sub_best_sellers: ["Más Vendidos", "Favoritos"]
        },
        cart: {
            title: "Tu Carrito",
            empty: "Tu carrito está vacío",
            empty_desc: "Explora nuestras categorías y encuentra tu ritual ideal.",
            clear_cart: "Vaciar carrito",
            checkout: "Finalizar Compra",
            subtotal: "Subtotal",
            shipping: "Envíos",
            shipping_calc: "Calculado en checkout",
            total: "Total",
            add: "Añadir",
            free: "Gratis"
        },
        hero: {
            subtitle: "La Colección",
            title_part1: "Siente tu",
            title_part2: "belleza natural",
            button: "Comprar Piel Sensible",
            skin_care: {
                title: "Cuidado de la Piel",
                desc: "Tu ritual diario de hidratación y calma."
            },
            hair_care: {
                title: "Cuidado del Cabello",
                desc: "Nutrición profunda para un brillo natural."
            },
            sun_care: {
                title: "Cuidado Solar",
                desc: "Cuidado protector para una piel radiante."
            },
            discover: "Descubrir",
            hero_carousel: {
                slide_1: {
                    title: "LIP JUICE",
                    subtitle: "P I T A Y A   Y   P L Á T A N O"
                },
                slide_2: {
                    title: "GLOW SÉRUM",
                    subtitle: "V I T A M I N A   C   Y   E"
                },
                slide_3: {
                    title: "FRESH TOUCH",
                    subtitle: "A L O E   Y   R O S A S"
                }
            }
        },
        categories: {
            rostro: {
                title: "Rostro",
                desc: "Cuidados especiales con la más alta calidad para revelar toda la belleza de su piel.",
                tagline: "Ritual de luminosidad"
            },
            cabello: {
                title: "Cabello",
                desc: "Tratamientos premium para un cabello fuerte, brillante y saludable.",
                tagline: "Cuidado Profundo"
            },
            solares: {
                title: "Solares",
                desc: "Protección avanzada para mantener su piel radiante y joven bajo el sol.",
                tagline: "Protección Vital"
            },
            collection: "Colección"
        },
        filters: {
            price: "Precio",
            skin_tone: "Tono de piel",
            color_name: "Nombre del color",
            product_type: "Tipo de producto",
            items: "artículos",
            sort: "Clasificar",
            show_filters: "Mostrar Filtros",
            sort_by: "Ordenar por",
            recommended: "Recomendados",
            newest: "Novedades",
            price_low: "Menor Precio",
            price_high: "Mayor Precio",
            sort_options: {
                recomendados: "Recomendados",
                mais_vendidos: "Más Vendidos",
                novidades: "Novedades",
                maior_desconto: "Mayor Descuento",
                menor_preco: "Menor precio",
                maior_preco: "Mayor precio",
                a_z: "A - Z",
                z_a: "Z - A",
                melhor_avaliados: "Mejor Valorados",
                em_tendencia: "Tendencia"
            },
            load_more: "Cargar más productos"
        },
        trending: {
            title: "Tendencias de Temporada",
            tag: "Lo más deseado"
        },
        footer: {
            customer_service: "Atención al Cliente",
            about: "Sobre Nosotros",
            legal: "Legal",
            ritual: "Mantente al día",
            newsletter_desc: "¡Recibe nuestra newsletter con novedades y promociones!",
            subscribe_btn: "Unirme",
            placeholder: "Tu correo electrónico",
            rights: "Todos los derechos reservados.",
            back_to_top: "Volver al inicio",
            links: {
                contact: "Contacto",
                shipping: "Envíos y Entregas",
                returns: "Devoluciones",
                faq: "Preguntas Frecuentes",
                philosophy: "Nuestra Filosofía",
                sustainability: "Sostenibilidad",
                ingredients: "Ingredientes",
                diary: "Diario de Belleza",
                terms: "Términos y Condiciones",
                privacy: "Política de Privacidad",
                cookies: "Política de Cookies"
            }
        },
        checkout: {
            title: "Finalizar Compra",
            shipping_address: "Dirección de Envío",
            payment_method: "Método de Pago",
            order_summary: "Resumen del Pedido",
            place_order: "Confirmar Pedido",
            fields: {
                email: "Correo Electrónico",
                first_name: "Nombre",
                last_name: "Apellidos",
                address: "Dirección",
                city: "Ciudad",
                zip: "Código Postal",
                country: "País"
            },
            save_info: "Guardar mi información para la próxima vez",
            payments: {
                card: "Tarjeta de Crédito / Débito",
                paypal: "PayPal",
                klarna: "Klarna - Paga en 3 plazos",
                bizum: "Bizum (España)",
                mbway: "MB WAY (Portugal)",
                multibanco: "Multibanco (Portugal)"
            },
            secure: "Pago seguro garantizado",
            returns_guarantee: "devoluciones garantizadas en 30 días",
            free_shipping: "Gratis"
        },
        helpbot: {
            title: "Asistente Beauthé",
            welcome: "¡Hola! Soy tu asistente de belleza. ¿En qué puedo ayudarte hoy?",
            placeholder: "Escribe tu mensaje...",
            faq: {
                shipping: "Ofrecemos envíos gratuitos en pedidos superiores a 49€. El plazo de entrega es de 1 a 3 días hábiles.",
                payments: "Aceptamos tarjetas, PayPal, Klarna y Bizum.",
                returns: "Tienes 30 dias para devolver teus productos si no estás satisfecho.",
                products: "Todos nuestros productos son veganos y libres de crueldad animal.",
                unknown: "Lo siento, no entiendo esa pregunta. ¿Podrías intentar reformularla o contactar con nuestro equipo?"
            }
        },
        about_us: {
            tag: "Valores y Propósitos",
            title_1: "Te invitamos a ser",
            title_2: "parte de nuestra historia",
            desc: "Únete a nosotros en esta jornada y descubre lo que significa cuidarse con cariño y propósito. Explora nuestra colección y déjate encantar por la belleza, pureza y calidad que definen el estilo de vida Beauthé."
        },
        history: {
            banner_tag: "De una idea a un estilo de vida",
            banner_title: "Nuestra Historia",
            banner_desc: "Somos creados para caminar con belleza, verdad y ligereza.",
            values_title: "Valores y Propósitos",
            transparency_title: "Transparencia Real",
            transparency_desc: "Fórmulas limpias y éticas en cada producto.",
            purity: "Pureza",
            sustainability_title: "Sostenibilidad 100%",
            sustainability_desc: "Envases reciclables y recursos renovables.",
            lightness_title: "Ligereza con propósito",
            join_us_tag: "Únete a nosotros",
            join_us_title_1: "Te invitamos a ser parte de",
            join_us_title_2: "nuestra historia.",
            join_us_desc: "Descubre lo que significa Vivir Bonito. Explora nuestra colección completa de cuidados y déjate encantar por la belleza, eficacia y calidad que definen el estilo de vida Beauthé.",
            view_collections: "Ver colecciones"
        },
        auth: {
            login_title: "Iniciar sesión",
            register_title: "Crear cuenta",
            login_desc: "Accede a tu cuenta para gestionar tus pedidos y favoritos de belleza.",
            register_desc: "Únete a Beauthé y recibe beneficios exclusivos en tus rituales.",
            name_label: "Nombre completo",
            name_placeholder: "Tu nombre",
            email_placeholder: "tu@email.com",
            password_label: "Contraseña",
            forgot_password: "¿Olvidaste tu contraseña?",
            login_btn: "Entrar",
            register_btn: "Registrarme",
            or: "O",
            google_btn: "Continúa con Google",
            no_account: "¿No tienes cuenta?",
            has_account: "¿Ya tienes cuenta?",
            register_now: "Regístrate ahora",
            login_now: "Iniciar sesión"
        },
        favorites: {
            title: "Tus favoritos",
            empty_title_1: "Aún no tienes",
            empty_title_2: "favoritos",
            empty_desc: "Empieza a guardar tus productos preferidos para encontrarlos más rápido.",
            explore: "Explorar colección"
        },
        product_bottom: {
            tag: "Cuidado & Conscience",
            title_1: "Fórmulas limpias diseñadas para",
            title_2: "tu ritual diario.",
            desc: "Cada producto de nuestra colección es un paso en dirección a una belleza más consciente y natural. Calidad excepcional sin comprometer sus valores."
        },
        product: {
            contains: "CONTIENE 5ML",
            all_shades: "+ Todos los tonos del producto",
            add_to_cart: "Añadir a la cesta",
            paraben_free: "sin parabenos",
            vegan: "vegano",
            recommended: "Productos Recomendados",
            care_conscience: "Cuidado & Conscience",
            clean_formulas: "Fórmulas limpias diseñadas para",
            daily_ritual: "tu ritual diario.",
            collection_desc: "Cada producto de nuestra colección es um paso en dirección a uma beleza más consciente y natural.",
            specs_title: "Especificaciones Técnicas",
            what_is: "¿Qué es?",
            care: "Cuidados",
            composition: "Composición",
            purity_title: "Garantía de Pureza Beauthé",
            purity_desc: "Nuestras fórmulas son libres de microplásticos, parabenos y crueldad animal. Producido en lotes pequeños para garantizar el frescor de los activos botánicos.",
            vegan_badge: "100% Vegano",
            cruelty_badge: "Cruelty Free"
        },
        badges: {
            best_seller: "Más Vendido",
            new: "Nuevo",
            trend: "Tendencia",
            luxury: "Lujo",
            expert: "Expert",
            summer: "Summer Essential"
        },
        marquee: [
            "✨ ENVÍO GRATIS A PARTIR DE 40€",
            "🌿 CRUELTY FREE & VEGANO",
            "💧 DERMATOLÓGICAMENTE TESTADO",
            "🛡️ GARANTÍA DE SATISFACCIÓN",
            "🎁 MUESTRAS GRATIS EN CADA PEDIDO"
        ],
        faq_section: {
            title: "Preguntas Frecuentes",
            subtitle: "Todo lo que necesitas saber sobre tu ritual de belleza.",
            items: [
                {
                    question: "¿Cuánto tiempo tardan en hacer efecto los productos de Skin Care?",
                    answer: "Depende del producto y de tu tipo de piel. Los resultados de hidratación inicial se notan de inmediato, mientras que los tratamientos profundos suelen mostrar cambios visibles después de 3 a 4 semanas de uso constante."
                },
                {
                    question: "¿Los productos son adecuados para pieles sensibles?",
                    answer: "Sí, toda nuestra colección de Beauthé está testada dermatológicamente y formulada con ingredientes suaves, diseñados para respetar y calmar hasta las pieles más delicadas."
                },
                {
                    question: "¿Puedo combinar Vitamina C con Retinol en mi rutina?",
                    answer: "Recomendamos utilizar la Vitamina C en tu rutina de la mañana para proteger la piel de los radicales libres, y dejar el Retinol para tu rutina nocturna, promoviendo la renovación celular sin causar irritación."
                },
                {
                    question: "¿Cuál es la orden correcta de mi ritual de belleza?",
                    answer: "La regla de oro es aplicar desde las texturas más ligeras a las más densas: 1. Limpieza, 2. Tónico, 3. Sérum, 4. Contorno de Ojos, 5. Crema Hidratante y 6. Protector Solar (solo de día)."
                },
                {
                    question: "¿Tienen políticas libres de crueldad animal (Cruelty-Free)?",
                    answer: "¡Por supuesto! En Beauthé amamos y respetamos la naturaleza, por lo que ninguno de nuestros ingredientes o productos acabados son testados en animales."
                }
            ]
        },
        reviews_section: {
            tag: "La comunidad Beauthé",
            title: "Lo que dicen nuestras clientas"
        },
        popup: {
            title: "Únete a la Familia Beauthé",
            desc: "Regístrate ahora y recibe un 15% de descuento en tu primer ritual de belleza. Sé la primera en conocer nuestras novedades.",
            subscribe: "Suscribirme Ahora",
            no_thanks: "no, gracias",
            privacy: "Al suscribirte, aceptas nuestra Política de Privacidad y recibir comunicaciones de marketing."
        },
        trust: [
            { id: 1, title: "Asesoramiento profesional gratuito", icon: "Headphones" },
            { id: 2, title: "Envíos gratis a partir de 40€ (Península)", icon: "Truck" },
            { id: 3, title: "Muestras gratis en todos los pedidos", icon: "Layers" },
            { id: 4, title: "Programa de puntos de fidelidad", icon: "PiggyBank" },
            { id: 5, title: "Pago cómodo y flexible en cuotas", icon: "Calendar" }
        ],
        quiz: {
            tag: "Descubre tu Ritual",
            title: "¿Cuál es tu tipo de piel?",
            desc: "Responde 4 preguntas rápidas para encontrar el tratamiento perfecto para ti.",
            start: "Comenzar Quiz",
            next: "Siguiente",
            result_title: "Tu tipo de piel es:",
            result_button: "Ver mi Producto Ideal",
            types: {
                dry: "Piel Seca",
                oily: "Piel Grasa/Acné",
                sensitive: "Piel Sensible",
                normal: "Piel Normal/Mixta"
            },
            questions: [
                {
                    q: "¿Cómo sientes tu piel al despertar?",
                    options: [
                        { text: "Tirante o con descamación", type: "dry" },
                        { text: "Con brillos en todo el rostro", type: "oily" },
                        { text: "Reactiva o con rojeces", type: "sensitive" },
                        { text: "Confortable o solo zona T", type: "normal" }
                    ]
                },
                {
                    q: "¿Cómo son tus poros?",
                    options: [
                        { text: "Casi invisibles", type: "dry" },
                        { text: "Grandes y visibles", type: "oily" },
                        { text: "Normales pero reactivos", type: "sensitive" },
                        { text: "Visibles solo en la nariz", type: "normal" }
                    ]
                },
                {
                    q: "¿Con qué frecuencia tienes brillos?",
                    options: [
                        { text: "Casi nunca", type: "dry" },
                        { text: "Constantemente", type: "oily" },
                        { text: "Solo si uso productos fuertes", type: "sensitive" },
                        { text: "Ocasionalmente en el día", type: "normal" }
                    ]
                }
            ]
        },
        experience: {
            sensory_title: "La Experiencia SENSORIAL",
            sensory_desc: "Tacto satinado que se desliza suavemente sobre la piel, aportando hidratación sin pesar.",
            active_tag: "Activo de Rendimiento",
            active_title: "Ciencia Botánica",
            active_desc: "Extractos puros seleccionados por su biocompatibilidad y eficacia probada.",
            lifestyle_tag: "Siéntelo en tu Piel",
            lifestyle_title: "BEALL DAY GLOW",
            lifestyle_desc: "Efecto duradero que realza tu belleza natural desde el amanecer hasta la noche."
        },
        routine: {
            title: "CREANDO TU RUTINA",
            step1_name: "Limpiar",
            step1_desc: "Espuma Suave",
            step2_name: "Tratar",
            step2_desc: "Sérum Activo",
            step3_name: "Nutrir",
            step3_desc: "Crema Intensa",
            step4_name: "Proteger",
            step4_desc: "Filtro Mineral"
        },
        bundle: {
            title: "Comprados Juntos Frecuentemente",
            pay_only: "Paga Solo",
            add_kit: "Añadir Kit"
        },
        profile: {
            orders: "Mis Pedidos",
            account: "Perfil",
            settings: "Configuraciones",
            logout: "Cerrar sesión",
            personal_data: "Datos Personales",
            personal_desc: "Gestiona tu información básica.",
            addresses: "Direcciones",
            addresses_desc: "Añade o edita tus lugares de entrega.",
            my_account: "Mi Cuenta",
            edit_profile: "Editar Perfil",
            save_changes: "Guardar Cambios",
            add_address: "Añadir Dirección",
            edit_address: "Editar Dirección"
        },
        help: {
            title: "Centro de Ayuda",
            search_placeholder: "¿En qué podemos ayudarte?",
            faq_title: "Preguntas Frecuentes",
            contact_us: "Habla con nosotros",
            categories: {
                refunds: "Cambios y Devoluciones",
                payments: "Formas de Pago",
                deliveries: "Envíos y Entregas",
                account: "Mi Cuenta y Pedidos"
            },
            most_accessed: "Más buscadas"
        }
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
            details: "Ver Detalhes",
            tones: "tons",
            tone: "tom",
            discover: "Descobrir",
            view_all: "Ver Tudo",
            learn_more: "Saber Mais",
            composition: "Composição",
            description: "Descrição",
            filter: "Filtrar por",
            sort: "Ordenar por",
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
        nav: {
            outlet: "Outlet",
            marcas: "Marcas",
            rostro: "Rosto",
            cuerpo: "Corpo & Banho",
            bienestar: "Bem-estar",
            cabello: "Cabelo",
            solares: "Solares",
            maquillaje: "Maquilhagem",
            perfumes: "Perfumes",
            hombre: "Homem",
            bebe_mama: "Bebé e mamã",
            regalos: "Presentes",
            limpiadores: "Limpadores",
            tonicos: "Tónicos",
            serums: "Séruns",
            cremas: "Cremes",
            contorno: "Contorno",
            mascarillas: "Máscaras",
            base: "Base",
            correctores: "Corretores",
            polvo: "Pó",
            rubor: "Blush",
            labios: "Lábios",
            higiene: "Higiene",
            hidratacion: "Hidratação",
            cuidados: "Cuidados",
            manos_pies: "Mãos e Pés",
            lavado: "Lavagem",
            tratamiento: "Tratamento",
            styling: "Styling",
            femeninos: "Femininos",
            masculinos: "Masculinos",
            unisex: "Unissexo",
            hogar: "Casa",
            promociones: "Promoções",
            ultimas: "Últimas Unidades",
            best_sellers: "Mais Vendidos",
            all_products: "Todos os produtos",
            kits: "Kits",
            eyes: "Olhos",
            sub_limpiadores: ["Géis", "Espumas", "Micelares"],
            sub_tonicos: ["Hidratantes", "Adstringentes"],
            sub_serums: ["Vitamina C", "Retinol"],
            sub_cremas: ["Dia", "Noite", "Anti-idade"],
            sub_contorno: ["Bolsas", "Olheiras"],
            sub_mascarillas: ["Argila", "Hidrogel"],
            sub_base: ["Líquida", "Pó", "BB Cream"],
            sub_correctores: ["Líquido", "Creme"],
            sub_polvo: ["Translúcido", "Compacto"],
            sub_rubor: ["Pó", "Creme"],
            sub_labios: ["Mate", "Gloss", "Tintas"],
            sub_higiene: ["Sabonetes", "Géis de Banho"],
            sub_hidratacion: ["Loções", "Óleos", "Manteigas"],
            sub_cuidados: ["Desodorantes", "Esfoliantes"],
            sub_manos_pies: ["Reparadoras", "Protetoras"],
            sub_lavado: ["Champôs", "Amaciadores"],
            sub_tratamiento: ["Máscaras", "Séruns", "Óleos"],
            sub_styling: ["Lacas", "Proteção Térmica"],
            sub_femeninos: ["Eau de Parfum", "Eau de Toilette"],
            sub_masculinos: ["Fragrâncias Fresh", "Intensas"],
            sub_unisex: ["Aromáticas", "Cítricas"],
            sub_hogar: ["Velas", "Difusores"],
            sub_promociones: ["Até -50%", "Kits 2x1"],
            sub_ultimas: ["Stock Final", "Descontinuados"],
            sub_best_sellers: ["Mais Vendidos", "Favoritos"]
        },
        cart: {
            title: "O seu Carrinho",
            empty: "O seu carrinho está vazio",
            empty_desc: "Comece a enchê-lo com os seus essenciais de beleza.",
            checkout: "Finalizar Compra",
            subtotal: "Subtotal",
            shipping: "Envios",
            shipping_calc: "Calculado no checkout",
            total: "Total",
            add: "Adicionar",
            free: "Grátis"
        },
        hero: {
            subtitle: "A Coleção",
            title_part1: "Sinta a sua",
            title_part2: "beleza natural",
            button: "Comprar Pele Sensível",
            skin_care: {
                title: "Cuidado da Pele",
                desc: "O seu ritual diário de hidratação e calma."
            },
            hair_care: {
                title: "Cuidado do Cabelo",
                desc: "Nutrição profunda para un brilho natural."
            },
            sun_care: {
                title: "Cuidado Solar",
                desc: "Cuidado protetor para uma pele radiante."
            },
            discover: "Descobrir",
            hero_carousel: {
                slide_1: {
                    title: "LIP JUICE",
                    subtitle: "P I T A Y A   Y   P L Á T A N O"
                },
                slide_2: {
                    title: "GLOW SÉRUM",
                    subtitle: "V I T A M I N A   C   Y   E"
                },
                slide_3: {
                    title: "FRESH TOUCH",
                    subtitle: "A L O E   Y   R O S A S"
                }
            }
        },
        categories: {
            collection: "Coleção",
            rostro: {
                title: "Rosto",
                desc: "Cuidados especiais com a mais alta qualidade para revelar toda a beleza da sua pele.",
                tagline: "Ritual de luminosidade"
            },
            cabello: {
                title: "Cabelo",
                desc: "Tratamentos capilares formulados para nutrir, reparar e proteger os seus fios.",
                tagline: "Cuidado Profundo"
            },
            solares: {
                title: "Solares",
                desc: "Proteção avançada contra os raios UV para uma pele saudável durante todo o ano.",
                tagline: "Proteção Vital"
            }
        },
        filters: {
            price: "Preço",
            skin_tone: "Grupo de tons",
            color_name: "Nome da cor",
            product_type: "Tipo de produto",
            items: "artigos",
            sort: "Classificar",
            show_filters: "Mostrar Filtros",
            sort_by: "Ordenar por",
            recommended: "Recomendados",
            newest: "Novidades",
            price_low: "Menor Preço",
            price_high: "Maior Preço",
            sort_options: {
                recomendados: "Recomendados",
                mais_vendidos: "Mais Vendidos",
                novidades: "Novidades",
                maior_desconto: "Maior Desconto",
                menor_preco: "Menor preço",
                maior_preco: "Maior preço",
                a_z: "A - Z",
                z_a: "Z - A",
                melhor_avaliados: "Melhor Avaliados",
                em_tendencia: "Em Tendência"
            },
            load_more: "Carregar mais produtos"
        },
        trending: {
            title: "Tendências de Temporada",
            tag: "O mais desejado"
        },
        footer: {
            customer_service: "Apoio ao Cliente",
            about: "Sobre Nós",
            legal: "Legal",
            ritual: "Fique por dentro",
            newsletter_desc: "Receba nossa newsletter com novidades e promoções!",
            subscribe_btn: "Aderir",
            placeholder: "O seu e-mail",
            rights: "Todos os direitos reservados.",
            back_to_top: "Voltar ao topo",
            links: {
                contact: "Contacto",
                shipping: "Envios e Entregas",
                returns: "Devoluções",
                faq: "Perguntas Frequentes",
                philosophy: "A nossa Filosofia",
                sustainability: "Sustentabilidade",
                ingredients: "Ingredientes",
                diary: "Diário de Beleza",
                terms: "Termos e Condições",
                privacy: "Política de Privacidade",
                cookies: "Política de Cookies"
            }
        },
        checkout: {
            title: "Finalizar Compra",
            shipping_address: "Endereço de Envio",
            payment_method: "Método de Pagamento",
            order_summary: "Resumo do Pedido",
            place_order: "Confirmar Pedido",
            fields: {
                email: "E-mail",
                first_name: "Nome",
                last_name: "Apelidos",
                address: "Endereço",
                city: "Cidade",
                zip: "Código Postal",
                country: "País"
            },
            save_info: "Guardar as minhas informações para a próxima vez",
            payments: {
                card: "Cartão de Crédito / Débito",
                paypal: "PayPal",
                klarna: "Klarna - Pague em 3x",
                bizum: "Bizum (Espanha)",
                mbway: "MB WAY (Portugal)",
                multibanco: "Multibanco (Portugal)"
            },
            secure: "Pagamento seguro garantido",
            returns_guarantee: "devoluções garantidas em 30 dias",
            free_shipping: "Grátis",
            search: "Pesquisar"
        },
        helpbot: {
            title: "Assistente Beauthé",
            welcome: "Olá! Sou o seu assistente de beleza. Como posso ajudar hoje?",
            placeholder: "Escreva a sua mensagem...",
            faq: {
                shipping: "Oferecemos envios gratuitos em encomendas superiores a 49€. O prazo de entrega é de 1 a 3 dias úteis.",
                payments: "Aceitamos cartões, PayPal, Klarna, MB WAY e Multibanco.",
                returns: "Tem 30 dias para devolver os seus produtos se não ficar satisfeito.",
                products: "Todos os nossos produtos são veganos e livres de crueldade animal.",
                unknown: "Desculpe, não entendo essa pergunta. Poderia tentar reformular ou contactar a nossa equipa?"
            }
        },
        about_us: {
            tag: "Valores e Propósitos",
            title_1: "Te convidamos a ser",
            title_2: "parte da nossa história",
            desc: "Junte-se a nós nesta jornada e descubra o que significa cuidar-se com carinho e propósito. Explore a nossa coleção e deixe-se encantar pela beleza, pureza e qualidade que definem o estilo de vida Beauthé."
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
            join_us_desc: "Descubra o que significa Viver Bonito. Explore a nossa coleção completa de cuidados e deixe-se encantar pela beleza, eficácia e qualidade que definem o estilo de vida Beauthé.",
            view_collections: "Ver coleções"
        },
        auth: {
            login_title: "Iniciar sessão",
            register_title: "Criar conta",
            login_desc: "Aceda à sua conta para gerir as suas encomendas e favoritos de beleza.",
            register_desc: "Junte-se à Beauthé e receba benefícios exclusivos nos seus rituais.",
            name_label: "Nome completo",
            name_placeholder: "O seu nome",
            email_placeholder: "o_seu@email.com",
            password_label: "Palavra-passe",
            forgot_password: "Esqueceu-se da palavra-passe?",
            login_btn: "Entrar",
            register_btn: "Registar-me",
            or: "OU",
            google_btn: "Continue com o Google",
            no_account: "Não tem conta?",
            has_account: "Já tem conta?",
            register_now: "Registe-se agora",
            login_now: "Iniciar sessão"
        },
        favorites: {
            title: "Os seus favoritos",
            empty_title_1: "Ainda não tem",
            empty_title_2: "favoritos",
            empty_desc: "Comece a guardar os seus produtos preferidos para os encontrar mais rápido.",
            explore: "Explorar coleção"
        },
        product_bottom: {
            tag: "Cuidado & Conscience",
            title_1: "Fórmulas limpas desenhadas para",
            title_2: "o seu ritual diário.",
            desc: "Cada produto da nossa coleção é um passo em direção a uma beleza mais consciente e natural. Qualidade excecional sem comprometer os seus valores."
        },
        product: {
            contains: "CONTÉM 5ML",
            all_shades: "+ Todos os tons do produto",
            add_to_cart: "Adicionar ao carrinho",
            paraben_free: "sem parabenos",
            vegan: "vegano",
            recommended: "Produtos Recomendados",
            care_conscience: "Cuidado & Conscience",
            clean_formulas: "Fórmulas limpas desenhadas para",
            daily_ritual: "o seu ritual diário.",
            collection_desc: "Cada produto da nossa coleção é um passo em direção a uma beleza mais consciente e natural.",
            specs_title: "Especificações Técnicas",
            what_is: "O que é?",
            care: "Cuidados",
            composition: "Composição",
            purity_title: "Garantia de Pureza Beauthé",
            purity_desc: "Nossas fórmulas são livres de microplásticos, parabenos e crueldade animal. Produzido em lotes pequenos para garantir o frescor dos ativos botânicos.",
            vegan_badge: "100% Vegan",
            cruelty_badge: "Cruelty Free"
        },
        badges: {
            best_seller: "Mais Vendido",
            new: "Novo",
            trend: "Tendência",
            luxury: "Luxo",
            expert: "Expert",
            summer: "Summer Essential"
        },
        marquee: [
            "✨ ENVIO GRÁTIS A PARTIR DE 40€",
            "🌿 CRUELTY FREE & VEGANO",
            "💧 DERMATOLOGICAMENTE TESTADO",
            "🛡️ GARANTIA DE SATISFAÇÃO",
            "🎁 AMOSTRAS GRÁTIS EM CADA ENCOMENDA"
        ],
        faq_section: {
            title: "Perguntas Frequentes",
            subtitle: "Tudo o que precisa de saber sobre o seu ritual de beleza.",
            items: [
                {
                    question: "Quanto tempo demoram a fazer efeito os produtos de Skin Care?",
                    answer: "Depende do produto e do seu tipo de pele. Os resultados de hidratação inicial notam-se de imediato, enquanto os tratamentos profundos costumam mostrar mudanças visíveis após 3 a 4 semanas de uso constante."
                },
                {
                    question: "Os produtos são adequados para peles sensíveis?",
                    answer: "Sim, toda a nossa coleção de Beauthé está testada dermatologicamente e formulada com ingredientes suaves, desenhados para respeitar e acalmar até as peles mais delicadas."
                },
                {
                    question: "Posso combinar Vitamina C com Retinol na minha rotina?",
                    answer: "Recomendamos utilizar a Vitamina C na sua rotina da manhã para proteger a pele dos radicais livres, e deixar o Retinol para a sua rotina noturna, promovendo a renovação celular sem causar irritação."
                },
                {
                    question: "Qual é a ordem correta do meu ritual de beleza?",
                    answer: "A regra de ouro é aplicar desde as texturas mais leves às mais densas: 1. Limpeza, 2. Tónico, 3. Sérum, 4. Contorno de Olhos, 5. Creme Hidratante e 6. Protetor Solar (apenas de dia)."
                },
                {
                    question: "Têm políticas livres de crueldade animal (Cruelty-Free)?",
                    answer: "Com certeza! Na Beauthé amamos e respeitamos a natureza, pelo que nenhum dos nossos ingredientes ou produtos acabados são testados em animais."
                }
            ]
        },
        reviews_section: {
            tag: "A comunidade Beauthé",
            title: "O que dizem as nossas clientes"
        },
        popup: {
            title: "Junte-se à Família Beauthé",
            desc: "Registe-se agora e receba 15% de desconto no seu primeiro ritual de beleza. Seja a primeira a conhecer as nossas novidades.",
            subscribe: "Subscrever Agora",
            no_thanks: "não, obrigado",
            privacy: "Ao subscrever, aceita a nossa Política de Privacidade e receber comunicações de marketing."
        },
        trust: [
            { id: 1, title: "Aconselhamento profissional gratuito", icon: "Headphones" },
            { id: 2, title: "Portes grátis a partir de 40€ (Portugal Continental)", icon: "Truck" },
            { id: 3, title: "Amostras grátis em todos os pedidos", icon: "Layers" },
            { id: 4, title: "Programa de pontos de fidelidade", icon: "PiggyBank" },
            { id: 5, title: "Pagamento cómodo e flexível em prestações", icon: "Calendar" }
        ],
        quiz: {
            tag: "Descubra o seu Ritual",
            title: "Qual é o seu tipo de pele?",
            desc: "Responda a 4 perguntas rápidas para encontrar o tratamento perfeito para si.",
            start: "Começar Quiz",
            next: "Seguinte",
            result_title: "O seu tipo de pele é:",
            result_button: "Ver o meu Produto Ideal",
            types: {
                dry: "Pele Seca",
                oily: "Pele Oleosa/Acneica",
                sensitive: "Pele Sensível",
                normal: "Pele Normal/Mista"
            },
            questions: [
                {
                    q: "Como sente a sua pele ao acordar?",
                    options: [
                        { text: "Repuxada ou com descamação", type: "dry" },
                        { text: "Com brilhos em todo o rosto", type: "oily" },
                        { text: "Reativa ou com vermelhidão", type: "sensitive" },
                        { text: "Confortável ou apenas zona T", type: "normal" }
                    ]
                },
                {
                    q: "Como são os seus poros?",
                    options: [
                        { text: "Quase invisíveis", type: "dry" },
                        { text: "Grandes e visíveis", type: "oily" },
                        { text: "Normais mas reativos", type: "sensitive" },
                        { text: "Visíveis apenas no nariz", type: "normal" }
                    ]
                },
                {
                    q: "Com que frequência tem brilhos?",
                    options: [
                        { text: "Quase nunca", type: "dry" },
                        { text: "Constantemente", type: "oily" },
                        { text: "Apenas se usar produtos fortes", type: "sensitive" },
                        { text: "Ocasionalmente durante o dia", type: "normal" }
                    ]
                }
            ]
        },
        experience: {
            sensory_title: "A Experiência SENSORIAL",
            sensory_desc: "Toque acetinado que desliza suavemente sobre a pele, entregando hidratação sem pesar.",
            active_tag: "Ativo de Performance",
            active_title: "Ciência Botânica",
            active_desc: "Extratos puros selecionados pela sua biocompatibilidade e eficácia comprovada.",
            lifestyle_tag: "Sinta na Pele",
            lifestyle_title: "BEALL DAY GLOW",
            lifestyle_desc: "Efeito duradouro que realça sua beleza natural do amanhecer até a noite."
        },
        routine: {
            title: "CRIANDO A SUA ROTINA",
            step1_name: "Limpar",
            step1_desc: "Espuma Suave",
            step2_name: "Tratar",
            step2_desc: "Sérum Ativo",
            step3_name: "Nutrir",
            step3_desc: "Creme Intenso",
            step4_name: "Proteger",
            step4_desc: "Filtro Mineral"
        },
        bundle: {
            title: "Comprados Juntos Frequentemente",
            pay_only: "Pague Apenas",
            add_kit: "Adicionar Kit"
        },
        profile: {
            orders: "Meus Pedidos",
            account: "Perfil",
            settings: "Configurações",
            logout: "Sair da conta",
            personal_data: "Dados Pessoais",
            personal_desc: "Gerencie suas informações básicas.",
            addresses: "Endereços",
            addresses_desc: "Adicione ou edite seus locais de entrega.",
            my_account: "Minha Conta",
            edit_profile: "Editar Perfil",
            save_changes: "Guardar Alterações",
            add_address: "Adicionar Endereço",
            edit_address: "Editar Endereço"
        },
        help: {
            title: "Centro de Ajuda",
            search_placeholder: "Como podemos ajudar?",
            faq_title: "Perguntas Frequentes",
            contact_us: "Fala com a gente",
            categories: {
                refunds: "Trocas e Devoluções",
                payments: "Formas de Pagamento",
                deliveries: "Envios e Entregas",
                account: "Minha Conta e Pedidos"
            },
            most_accessed: "Mais pesquisadas"
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('beauthe_lang') || 'es');

    const t = (key) => {
        const keys = key.split('.');
        let value = translationsData[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    const toggleLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem('beauthe_lang', newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
