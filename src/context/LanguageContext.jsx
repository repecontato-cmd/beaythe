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
            todos: { title: "Toda la Colección", tagline: "Esencia Beauthé", desc: "Explora nuestro universo completo de belleza consciente." },
            collection: "Colección",
            rostro: { title: "Cuidado Facial", tagline: "Rituales de Pureza", desc: "Sérums, tónicos y cremas formulados para una piel radiante." },
            maquillaje: { title: "Maquillaje", tagline: "Belleza Consciente", desc: "Texturas sensoriales que realzan tu belleza natural." },
            cabello: { title: "Cuidado Capilar", tagline: "Nutrición Intensa", desc: "Fórmulas exclusivas para un cabello fuerte y brillante." },
            tendencias: { title: "Tendencias", tagline: "Lo Último de Beauthé", desc: "Descubre los productos más deseados de esta temporada." },
            exclusivos: { title: "Exclusivos", tagline: "Ediciones Limitadas", desc: "Selección premium de alta gama para resultados excepcionales." },
            cuerpo: { title: "Baño y Cuerpo", tagline: "Bienestar Total", desc: "Hidratación profunda para cada centímetro de tu piel." },
            bienestar: { title: "Bienestar", tagline: "Mente y Cuerpo", desc: "Productos diseñados para tu momento de relax diario." },
            hombre: { title: "Línea Hombre", tagline: "Cuidado Masculino", desc: "Fórmulas prácticas y eficaces para el hombre moderno." },
            default: { title: "Beauthé", tagline: "Belleza con Propósito", desc: "Explora nuestra selección de alta cosmética natural." }
        },

        nav: {
            exclusivos: "Exclusivos",
            marcas: "Marcas",
            rostro: "Rostro",
            cuerpo: "Cuerpo y Baño",
            bienestar: "Bienestar",
            cabello: "Cabello",
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
            maquillaje: {
                title: "Maquillaje",
                desc: "Realza tu belleza natural con productos de larga duración y texturas sensoriales.",
                tagline: "Belleza Consciente"
            },
            cuerpo: {
                title: "Cuerpo y Baño",
                desc: "Mima tu cuerpo con rituales de hidratación profunda y fragancias envolventes.",
                tagline: "Cuidado Corporal"
            },
            bienestar: {
                title: "Bienestar",
                desc: "Equilibrio y armonía para tu mente y cuerpo a través de la cosmética holística.",
                tagline: "Equilibrio Vital"
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
            tendencias: {
                title: "Tendencias de Temporada",
                desc: "Descubre los productos más deseados y las últimas innovaciones en belleza.",
                tagline: "Lo más deseado"
            },
            hombre: {
                title: "Hombre",
                desc: "Cuidados específicos diseñados para la piel y las necesidades del hombre moderno.",
                tagline: "Cuidado Masculino"
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
        },
        products: {
            "crema_veneno_de_abeja_-_alivio_natural": { name: "Crema de Veneno de Abeja - Alivioso Natural" },
            "mascara_black_volume_waterproof": { name: "Máscara Volumen Negro Waterproof" },
            "barra_multibálsamo_con_calcio_9g_–_hidratación_y_cuidado_en_un_solo_producto": { name: "Barra Multibálsamo con Calcio 9G – Hidratación y Cuidado" },
            "ampolla_exfoliante_de_arroz_negro_100ml_–_renovación_y_luminosidad_natural": { name: "Ampolla Exfoliante de Arroz Negro 100ML – Renovación y Luminosidad" }
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
            cookies: {
                title: "Respeitamos a sua privacidade 🍪",
                message: "Utilizamos cookies para melhorar a sua experiência e lembrar as suas preferências. Ao continuar a navegar, aceita o seu uso.",
                accept: "Entendido",
                decline: "Recusar",
                more: "Saber mais"
            },
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
            todos: { title: "Toda a Coleção", tagline: "Essência Beauthé", desc: "Explore o nosso universo completo de beleza consciente." },
            collection: "Coleção",
            rostro: { title: "Cuidado Facial", tagline: "Rituais de Pureza", desc: "Séruns, tónicos e cremes formulados para uma pele radiante." },
            maquillaje: { title: "Maquilhagem", tagline: "Beleza Consciente", desc: "Texturas sensoriais que realçam a sua beleza natural." },
            cabello: { title: "Cuidado Capilar", tagline: "Nutrição Intensa", desc: "Fórmulas exclusivas para um cabelo forte e brilhante." },
            tendencias: { title: "Tendências", tagline: "O Último da Beauthé", desc: "Descubra os produtos mais desejados desta temporada." },
            exclusivos: { title: "Exclusivos", tagline: "Edições Limitadas", desc: "Seleção premium de alta gama para resultados excecionais." },
            cuerpo: { title: "Banho e Corpo", tagline: "Bem-estar Total", desc: "Hidratação profunda para cada centímetro da sua pele." },
            bienestar: { title: "Bem-estar", tagline: "Mente e Corpo", desc: "Produtos desenhados para o seu momento de relax diário." },
            hombre: { title: "Linha Homem", tagline: "Cuidado Masculino", desc: "Fórmulas práticas e eficazes para o homem moderno." },
            default: { title: "Beauthé", tagline: "Beleza com Propósito", desc: "Explore a nossa seleção de alta cosmética natural." }
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
            maquillaje: {
                title: "Maquilhagem",
                desc: "Realce a sua beleza natural com produtos de longa duração e texturas sensoriais.",
                tagline: "Beleza Consciente"
            },
            cuerpo: {
                title: "Corpo e Banho",
                desc: "Mime o seu corpo com rituais de hidratação profunda e fragrâncias envolventes.",
                tagline: "Cuidado Corporal"
            },
            bienestar: {
                title: "Bem-estar",
                desc: "Equilíbrio e harmonia para a sua mente e corpo através da cosmética holística.",
                tagline: "Equilíbrio Vital"
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
            },
            tendencias: {
                title: "Tendências de Temporada",
                desc: "Descubra os produtos mais desejados e as últimas inovações em beleza.",
                tagline: "O mais desejado"
            },
            hombre: {
                title: "Homem",
                desc: "Cuidados específicos concebidos para a pele e as necessidades do homem moderno.",
                tagline: "Cuidado Masculino"
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
        },
        products: {
            "crema_veneno_de_abeja_-_alivio_natural": { name: "Creme de Veneno de Abelha - Alívio Natural" },
            "mascara_black_volume_waterproof": { name: "Máscara Black Volume à Prova de Água" },
            "barra_multibálsamo_con_calcio_9g_–_hidratación_y_cuidado_en_un_solo_producto": { name: "Barra Multibálsamo com Cálcio 9G – Hidratação e Cuidado" },
            "ampolla_exfoliante_de_arroz_negro_100ml_–_renovación_y_luminosidad_natural": { name: "Ampola Esfoliante de Arroz Negro 100ML – Renovação e Luminosidade" }
        }
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
            todos: { title: "All Collection", tagline: "Beauthé Essence", desc: "Explore our complete universe of conscious beauty." },
            collection: "Collection",
            rostro: { title: "Facial Care", tagline: "Purity Rituals", desc: "Serums, tonics and creams formulated for radiant skin." },
            maquillaje: { title: "Makeup", tagline: "Conscious Beauty", desc: "Sensory textures that enhance your natural beauty." },
            cabello: { title: "Hair Care", tagline: "Intense Nutrition", desc: "Exclusive formulas for strong, shiny hair." },
            tendencias: { title: "Trending", tagline: "Latest from Beauthé", desc: "Discover this season's most wanted products." },
            exclusivos: { title: "Exclusives", tagline: "Limited Editions", desc: "Premium high-end selection for exceptional results." },
            cuerpo: { title: "Bath & Body", tagline: "Total Well-being", desc: "Deep hydration for every inch of your skin." },
            bienestar: { title: "Wellness", tagline: "Mind & Body", desc: "Products designed for your daily relax moment." },
            hombre: { title: "Men's Line", tagline: "Male Care", desc: "Practical and effective formulas for the modern man." },
            default: { title: "Beauthé", tagline: "Beauty with Purpose", desc: "Explore our selection of natural high cosmetics." }
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
            perfumes: "Perfumes",
            hombre: "Men",
            bebe_mama: "Baby & Mom",
            regalos: "Gifts",
            limpiadores: "Cleansers",
            tonicos: "Toners",
            serums: "Serums",
            cremas: "Creams",
            contorno: "Eye Contour",
            mascarillas: "Masks",
            base: "Foundation",
            correctores: "Concealers",
            polvo: "Powder",
            rubor: "Blush",
            labios: "Lips",
            higiene: "Hygiene",
            hidratacion: "Hydration",
            cuidados: "Care",
            manos_pies: "Hands & Feet",
            lavado: "Wash",
            tratamiento: "Treatment",
            styling: "Styling",
            femeninos: "Women",
            masculinos: "Men",
            unisex: "Unisex",
            hogar: "Home",
            promociones: "Promotions",
            ultimas: "Last Unities",
            best_sellers: "Best Sellers",
            all_products: "All products",
            kits: "Kits",
            eyes: "Eyes",
            sub_limpiadores: ["Gels", "Foams", "Micellar"],
            sub_tonicos: ["Hydrating", "Astringent"],
            sub_serums: ["Vitamin C", "Retinol"],
            sub_cremas: ["Day", "Night", "Anti-aging"],
            sub_contorno: ["Bags", "Dark Circles"],
            sub_mascarillas: ["Clay", "Hydrogel"],
            sub_base: ["Liquid", "Powder", "BB Cream"],
            sub_correctores: ["Liquid", "Cream"],
            sub_polvo: ["Translucent", "Compact"],
            sub_rubor: ["Powder", "Cream"],
            sub_labios: ["Matte", "Gloss", "Tints"],
            sub_higiene: ["Soaps", "Bath Gels"],
            sub_hidratacion: ["Lotions", "Oils", "Butters"],
            sub_cuidados: ["Deodorants", "Exfoliators"],
            sub_manos_pies: ["Repairing", "Protective"],
            sub_lavado: ["Shampoos", "Conditioners"],
            sub_tratamiento: ["Masks", "Serums", "Oils"],
            sub_styling: ["Sprays", "Heat Protection"],
            sub_femeninos: ["Eau de Parfum", "Eau de Toilette"],
            sub_masculinos: ["Fresh Fragrances", "Intense"],
            sub_unisex: ["Aromatic", "Citrus"],
            sub_hogar: ["Candles", "Diffusers"],
            sub_promociones: ["Up to -50%", "2x1 Kits"],
            sub_ultimas: ["Final Stock", "Discontinued"],
            sub_best_sellers: ["Best Sellers", "Favorites"]
        },
        cart: {
            title: "Your Cart",
            empty: "Your cart is empty",
            empty_desc: "Explore our categories and find your ideal ritual.",
            clear_cart: "Clear cart",
            checkout: "Finish Purchase",
            subtotal: "Subtotal",
            shipping: "Shipping",
            shipping_calc: "Calculated at checkout",
            total: "Total",
            add: "Add",
            free: "Free"
        },
        hero: {
            subtitle: "The Collection",
            title_part1: "Feel your",
            title_part2: "natural beauty",
            button: "Shop Sensitive Skin",
            skin_care: {
                title: "Skin Care",
                desc: "Your daily hydration and soothing ritual."
            },
            hair_care: {
                title: "Hair Care",
                desc: "Deep nutrition for natural shine."
            },
            sun_care: {
                title: "Sun Care",
                desc: "Protective care for radiant skin."
            },
            discover: "Discover",
            hero_carousel: {
                slide_1: {
                    title: "LIP JUICE",
                    subtitle: "P I T A Y A   A N D   B A N A N A"
                },
                slide_2: {
                    title: "GLOW SERUM",
                    subtitle: "V I T A M I N   C   A N D   E"
                },
                slide_3: {
                    title: "FRESH TOUCH",
                    subtitle: "A L O E   A N D   R O S E S"
                }
            }
        },
        categories: {
            rostro: {
                title: "Face",
                desc: "Special care with the highest quality to reveal all the beauty of your skin.",
                tagline: "Luminosity ritual"
            },
            maquillaje: {
                title: "Makeup",
                desc: "Enhance your natural beauty with long-lasting products and sensory textures.",
                tagline: "Conscious Beauty"
            },
            cuerpo: {
                title: "Body & Bath",
                desc: "Pamper your body with deep hydration rituals and enveloping fragrances.",
                tagline: "Body Care"
            },
            bienestar: {
                title: "Wellness",
                desc: "Balance and harmony for your mind and body through holistic cosmetics.",
                tagline: "Vital Balance"
            },
            cabello: {
                title: "Hair",
                desc: "Premium treatments for strong, shiny and healthy hair.",
                tagline: "Deep Care"
            },
            solares: {
                title: "Sun Care",
                desc: "Advanced protection to keep your skin radiant and young under the sun.",
                tagline: "Vital Protection"
            },
            tendencias: {
                title: "Seasonal Trends",
                desc: "Discover the most desired products and the latest innovations in beauty.",
                tagline: "The most desired"
            },
            hombre: {
                title: "Men",
                desc: "Specific care designed for the skin and needs of the modern man.",
                tagline: "Men's Care"
            },
            collection: "Collection"
        },
        filters: {
            price: "Price",
            skin_tone: "Skin tone",
            color_name: "Color name",
            product_type: "Product type",
            items: "items",
            sort: "Classify",
            show_filters: "Show Filters",
            sort_by: "Sort by",
            recommended: "Recommended",
            newest: "Newest",
            price_low: "Lowest Price",
            price_high: "Highest Price",
            sort_options: {
                recomendados: "Recommended",
                mais_vendidos: "Best Sellers",
                novidades: "Newest",
                maior_desconto: "Highest Discount",
                menor_preco: "Lowest price",
                maior_preco: "Highest price",
                a_z: "A - Z",
                z_a: "Z - A",
                melhor_avaliados: "Best Rated",
                em_tendencia: "Trend"
            },
            load_more: "Load more products"
        },
        trending: {
            title: "Seasonal Trends",
            tag: "The most desired"
        },
        footer: {
            customer_service: "Customer Service",
            about: "About Us",
            legal: "Legal",
            ritual: "Stay up to date",
            newsletter_desc: "Receive our newsletter with news and promotions!",
            subscribe_btn: "Join",
            placeholder: "Your email",
            rights: "All rights reserved.",
            back_to_top: "Back to top",
            links: {
                contact: "Contact",
                shipping: "Shipping & Deliveries",
                returns: "Returns",
                faq: "FAQ",
                philosophy: "Our Philosophy",
                sustainability: "Sustainability",
                ingredients: "Ingredients",
                diary: "Beauty Diary",
                terms: "Terms & Conditions",
                privacy: "Privacy Policy",
                cookies: "Cookie Policy"
            }
        },
        checkout: {
            title: "Finish Purchase",
            shipping_address: "Shipping Address",
            payment_method: "Payment Method",
            order_summary: "Order Summary",
            place_order: "Confirm Order",
            fields: {
                email: "Email",
                first_name: "First Name",
                last_name: "Last Name",
                address: "Address",
                city: "City",
                zip: "Zip Code",
                country: "Country"
            },
            save_info: "Save my information for next time",
            payments: {
                card: "Credit / Debit Card",
                paypal: "PayPal",
                klarna: "Klarna - Pay in 3 installments",
                bizum: "Bizum (Spain)",
                mbway: "MB WAY (Portugal)",
                multibanco: "Multibanco (Portugal)"
            },
            secure: "Secure payment guaranteed",
            returns_guarantee: "30-day guaranteed returns",
            free_shipping: "Free",
            search: "Search"
        },
        helpbot: {
            title: "Beauthé Assistant",
            welcome: "Hi! I'm your beauty assistant. How can I help you today?",
            placeholder: "Type your message...",
            faq: {
                shipping: "We offer free shipping on orders over 49€. Delivery time is 1 to 3 business days.",
                payments: "We accept cards, PayPal, Klarna and Bizum.",
                returns: "You have 30 days to return your products if you're not satisfied.",
                products: "All our products are vegan and cruelty-free.",
                unknown: "Sorry, I don't understand that question. Could you try rephrasing or contact our team?"
            }
        },
        about_us: {
            tag: "Values and Purposes",
            title_1: "We invite you to be",
            title_2: "part of our story",
            desc: "Join us on this journey and discover what it means to care for yourself with love and purpose. Explore our collection and be enchanted by the beauty, purity and quality that define the Beauthé lifestyle."
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
            join_us_desc: "Discover what it means to Live Beautifully. Explore our full collection of care and be enchanted by the beauty, effectiveness and quality that define the Beauthé lifestyle.",
            view_collections: "View collections"
        },
        auth: {
            login_title: "Login",
            register_title: "Create account",
            login_desc: "Access your account to manage your orders and beauty favorites.",
            register_desc: "Join Beauthé and receive exclusive benefits in your rituals.",
            name_label: "Full name",
            name_placeholder: "Your name",
            email_placeholder: "your@email.com",
            password_label: "Password",
            forgot_password: "Forgot your password?",
            login_btn: "Enter",
            register_btn: "Register",
            or: "OR",
            google_btn: "Continue with Google",
            no_account: "Don't have an account?",
            has_account: "Already have an account?",
            register_now: "Register now",
            login_now: "Login"
        },
        favorites: {
            title: "Your favorites",
            empty_title_1: "You don't have",
            empty_title_2: "favorites yet",
            empty_desc: "Start saving your favorite products to find them faster.",
            explore: "Explore collection"
        },
        product_bottom: {
            tag: "Care & Conscience",
            title_1: "Clean formulas designed for",
            title_2: "your daily ritual.",
            desc: "Each product in our collection is a step towards a more conscious and natural beauty. Exceptional quality without compromising your values."
        },
        product: {
            contains: "CONTAINS 5ML",
            all_shades: "+ All product shades",
            add_to_cart: "Add to cart",
            paraben_free: "paraben free",
            vegan: "vegan",
            recommended: "Recommended Products",
            care_conscience: "Care & Conscience",
            clean_formulas: "Clean formulas designed for",
            daily_ritual: "your daily ritual.",
            collection_desc: "Each product in our collection is a step towards a more conscious and natural beauty.",
            specs_title: "Technical Specifications",
            what_is: "What is it?",
            care: "Care",
            composition: "Composition",
            purity_title: "Beauthé Purity Guarantee",
            purity_desc: "Our formulas are free of microplastics, parabens and animal cruelty. Produced in small batches to guarantee the freshness of botanical actives.",
            vegan_badge: "100% Vegan",
            cruelty_badge: "Cruelty Free"
        },
        badges: {
            best_seller: "Best Seller",
            new: "New",
            trend: "Trend",
            luxury: "Luxury",
            expert: "Expert",
            summer: "Summer Essential"
        },
        marquee: [
            "✨ FREE SHIPPING OVER 40€",
            "🌿 CRUELTY FREE & VEGAN",
            "💧 DERMATOLOGICALLY TESTED",
            "🛡️ SATISFACTION GUARANTEE",
            "🎁 FREE SAMPLES WITH EACH ORDER"
        ],
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
                },
                {
                    question: "Can I combine Vitamin C with Retinol in my routine?",
                    answer: "We recommend using Vitamin C in your morning routine to protect the skin from free radicals, and leaving Retinol for your night routine, promoting cell renewal without causing irritation."
                },
                {
                    question: "What is the correct order of my beauty ritual?",
                    answer: "The golden rule is to apply from the lightest to the densest textures: 1. Cleaning, 2. Tonic, 3. Serum, 4. Eye Contour, 5. Moisturizing Cream and 6. Sunscreen (day only)."
                },
                {
                    question: "Do you have cruelty-free policies?",
                    answer: "Of course! At Beauthé we love and respect nature, so none of our ingredients or finished products are tested on animals."
                }
            ]
        },
        reviews_section: {
            tag: "The Beauthé Community",
            title: "What our customers are saying"
        },
        popup: {
            title: "Join the Beauthé Family",
            desc: "Register now and receive a 15% discount on your first beauty ritual. Be the first to know about our news.",
            subscribe: "Subscribe Now",
            no_thanks: "no, thanks",
            privacy: "By subscribing, you accept our Privacy Policy and to receive marketing communications."
        },
        trust: [
            { id: 1, title: "Free professional advice", icon: "Headphones" },
            { id: 2, title: "Free shipping from 40€ (Mainland)", icon: "Truck" },
            { id: 3, title: "Free samples in all orders", icon: "Layers" },
            { id: 4, title: "Loyalty points program", icon: "PiggyBank" },
            { id: 5, title: "Convenient and flexible installment payment", icon: "Calendar" }
        ],
        quiz: {
            tag: "Discover your Ritual",
            title: "What is your skin type?",
            desc: "Answer 4 quick questions to find the perfect treatment for you.",
            start: "Start Quiz",
            next: "Next",
            result_title: "Your skin type is:",
            result_button: "See my Ideal Product",
            types: {
                dry: "Dry Skin",
                oily: "Oily/Acne-prone Skin",
                sensitive: "Sensitive Skin",
                normal: "Normal/Mixed Skin"
            },
            questions: [
                {
                    q: "How does your skin feel when you wake up?",
                    options: [
                        { text: "Tight or with flaking", type: "dry" },
                        { text: "Shiny all over the face", type: "oily" },
                        { text: "Reactive or with redness", type: "sensitive" },
                        { text: "Comfortable or only T-zone", type: "normal" }
                    ]
                },
                {
                    q: "What are your pores like?",
                    options: [
                        { text: "Almost invisible", type: "dry" },
                        { text: "Large and visible", type: "oily" },
                        { text: "Normal but reactive", type: "sensitive" },
                        { text: "Visible only on the nose", type: "normal" }
                    ]
                },
                {
                    q: "How often do you have shine?",
                    options: [
                        { text: "Almost never", type: "dry" },
                        { text: "Constantly", type: "oily" },
                        { text: "Only if I use strong products", type: "sensitive" },
                        { text: "Occasionally during the day", type: "normal" }
                    ]
                }
            ]
        },
        experience: {
            sensory_title: "The SENSORY Experience",
            sensory_desc: "Satin touch that slides smoothly over the skin, delivering hydration without weighing it down.",
            active_tag: "Performance Active",
            active_title: "Botanical Science",
            active_desc: "Pure extracts selected for their biocompatibility and proven efficacy.",
            lifestyle_tag: "Feel it on your Skin",
            lifestyle_title: "BEALL DAY GLOW",
            lifestyle_desc: "Long-lasting effect that enhances your natural beauty from dawn until night."
        },
        routine: {
            title: "CREATING YOUR ROUTINE",
            step1_name: "Cleanse",
            step1_desc: "Gentle Foam",
            step2_name: "Treat",
            step2_desc: "Active Serum",
            step3_name: "Nourish",
            step3_desc: "Intense Cream",
            step4_name: "Protect",
            step4_desc: "Mineral Filter"
        },
        bundle: {
            title: "Frequently Bought Together",
            pay_only: "Pay Only",
            add_kit: "Add Kit"
        },
        profile: {
            orders: "My Orders",
            account: "Profile",
            settings: "Settings",
            logout: "Logout",
            personal_data: "Personal Data",
            personal_desc: "Manage your basic information.",
            addresses: "Addresses",
            addresses_desc: "Add or edit your delivery locations.",
            my_account: "My Account",
            edit_profile: "Edit Profile",
            save_changes: "Save Changes",
            add_address: "Add Address",
            edit_address: "Edit Address"
        },
        help: {
            title: "Help Center",
            search_placeholder: "How can we help?",
            faq_title: "Frequently Asked Questions",
            contact_us: "Talk to us",
            categories: {
                refunds: "Changes and Returns",
                payments: "Payment Methods",
                deliveries: "Shipping and Deliveries",
                account: "My Account and Orders"
            },
            most_accessed: "Most searched"
        },
        products: {
            "crema_veneno_de_abeja_-_alivio_natural": { name: "Bee Venom Cream - Natural Relief" },
            "mascara_black_volume_waterproof": { name: "Waterproof Black Volume Mascara" },
            "barra_multibálsamo_con_calcio_9g_–_hidratación_y_cuidado_en_un_solo_producto": { name: "Calcium Multi-Balm Stick 9G – Hydration & Care" },
            "ampolla_exfoliante_de_arroz_negro_100ml_–_renovación_y_luminosidad_natural": { name: "Black Rice Exfoliating Ampoule 100ML – Natural Renewal" }
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


