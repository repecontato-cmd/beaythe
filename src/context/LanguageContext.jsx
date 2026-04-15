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
            back_to_top: "Volver arriba",
            show_more: "Ver Más",
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
            perfumes: "Perfumes",
            regalos: "Regalos",
            manos_pies: "Manos y Pies",
            all_products: "Todos los productos",
            kits: "Kits",
            limpiadores: "Limpiadores",
            tonicos: "Tónicos",
            serums: "Sérums",
            cremas: "Cremas",
            contorno: "Contorno de Ojos",
            mascarillas: "Mascarillas",
            base: "Bases",
            correctores: "Correctores",
            polvo: "Polvos",
            rubor: "Colorete",
            labios: "Labios",
            higiene: "Higiene",
            hidratacion: "Hidratación",
            cuidados: "Cuidados",
            lavado: "Lavado",
            tratamiento: "Tratamiento",
            styling: "Peinado",
            femeninos: "Femeninos",
            masculinos: "Masculinos",
            unisex: "Unisex",
            hogar: "Hogar",
            promociones: "Promociones",
            ultimas: "Últimas Unidades",
            best_sellers: "Más Vendidos",
            sub_limpiadores: ["Geles", "Espumas", "Micelar"],
            sub_tonicos: ["Hidratantes", "Astringentes"],
            sub_serums: ["Vitamina C", "Retinol"],
            sub_cremas: ["Día", "Noche"],
            sub_contorno: ["Bolsas", "Ojeras"],
            sub_mascarillas: ["Arcilla", "Hidrogel"],
            sub_base: ["Líquida", "Polvo"],
            sub_correctores: ["Crème", "Stick"],
            sub_polvo: ["Translúcido", "Compacto"],
            sub_rubor: ["Polvo", "Crema"],
            sub_labios: ["Mate", "Brillo"],
            sub_higiene: ["Jabones", "Geles"],
            sub_hidratacion: ["Lociones", "Aceites"],
            sub_cuidados: ["Exfoliantes", "Desodorantes"],
            sub_manos_pies: ["Reparación", "Protección"],
            sub_lavado: ["Champús", "Acondicionadores"],
            sub_tratamiento: ["Mascarillas", "Sérums"],
            sub_styling: ["Sprays", "Protección Térmica"],
            sub_femeninos: ["Perfumes", "Colonias"],
            sub_masculinos: ["Frescos", "Intensos"],
            sub_unisex: ["Cítricos", "Amaderados"],
            sub_hogar: ["Velas", "Difusores"],
            sub_promociones: ["Hasta -50%", "Kits 2x1"],
            sub_ultimas: ["Stock Final"],
            sub_best_sellers: ["Top Ventas", "Favoritos"]
        },
        cart: {
            title: "Tu Carrito",
            clear_cart: "Vaciar carrito",
            empty: "Tu carrito está vacío",
            empty_desc: "Parece que aún no has añadido rituales de belleza.",
            subtotal: "Subtotal",
            shipping: "Envío",
            shipping_calc: "Calculado en el checkout",
            total: "Total",
            checkout: "Finalizar Compra"
        },
        auth: {
            login_title: "Iniciar sesión",
            login_desc: "Entra para gestionar tus pedidos y favoritos.",
            register_title: "Crear cuenta",
            register_desc: "Únete a Beauthé y disfruta de ventajas exclusivas.",
            name_label: "Nombre completo",
            name_placeholder: "Tu nombre",
            email_label: "E-mail",
            password_label: "Contraseña",
            forgot_password: "¿Olvidaste tu contraseña?",
            login_btn: "Entrar",
            register_btn: "Crear Perfil",
            google_btn: "Continuar con Google",
            no_account: "¿No tienes una cuenta?",
            has_account: "¿Ya tienes cuenta?",
            register_now: "Regístrate ahora",
            login_now: "Inicia sesión",
            next_step: "Próximo paso",
            account_created: "¡Cuenta creada!",
            interests_label: "Intereses",
            birth_label: "Fecha de Nacimiento",
            complete_profile: "Finalizar Perfil",
            skip_step: "Saltar por ahora",
            invalid_email: "Por favor, introduce un email válido."
        },
        profile: {
            account: "Mi Perfil",
            personal_data: "Datos Personales",
            addresses: "Direcciones",
            addresses_desc: "Gestiona tus direcciones de envío.",
            orders: "Mis Pedidos",
            settings: "Configuración",
            logout: "Cerrar sesión",
            add_address: "Añadir dirección",
            edit_address: "Editar dirección"
        },
        checkout: {
            title: "Finalizar Pedido",
            shipping_address: "Dirección de Envío",
            payment_method: "Método de Pago",
            order_summary: "Resumen del Pedido",
            place_order: "Confirmar y Pagar",
            secure: "Pago 100% Seguro",
            returns_guarantee: "Devolución garantizada",
            save_info: "Guardar mis datos para la próxima vez",
            payments: {
                card: "Tarjeta de Crédito",
                paypal: "PayPal",
                transfer: "Transferencia Bancaria"
            }
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
                    answer: "Recomendamos utilizar la Vitamina C en tu rutina de mañana para proteger la piel de los radicales libres, y dejar el Retinol para tu rutina nocturna, promoviendo la renovación celular."
                },
                {
                    question: "¿Ofrecen envío gratuito?",
                    answer: "Sí, todos los pedidos superiores a 50€ disfrutan de envío estándar gratuito a toda la península y Baleares."
                },
                {
                    question: "¿Son los productos 100% veganos?",
                    answer: "Absolutamente. No utilizamos ingredientes de origen animal y estamos orgullosos de ser una marca certificada Cruelty-Free."
                },
                {
                    question: "¿Cómo puedo rastrear mi pedido?",
                    answer: "Una vez que tu pedido salga de nuestro almacén, recibirás un correo electrónico con el número de seguimiento y un enlace directo a la mensajería."
                },
                {
                    question: "¿Cuál es vuestra política de devoluciones?",
                    answer: "Dispones de 14 días para devolver productos sin abrir en su embalaje original si no estás satisfecha con tu compra."
                },
                {
                    question: "¿En qué orden debo aplicar mis productos?",
                    answer: "La regla de oro es aplicar de la textura más ligera a la más densa: Limpiador > Tónico > Sérum > Contorno de Ojos > Crema Hidratante > Protector Solar (mañana)."
                }
            ]
        },
        reviews_section: {
            tag: "Opiniones de Clientes",
            title: "Lo que dicen de nosotros",
            average: "Media de 4.9/5 estrellas baseada en clientes verificados",
            show_more: "Ver Más Reviews"
        },
        filters: {
            price: "Precio",
            skin_tone: "Tono de piel",
            color_name: "Color",
            product_type: "Tipo de producto",
            items: "artículos",
            sort: "Ordenar",
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
            }
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
            join_us_desc: "Descubre lo que significa Vivir Bonito. Explora nuestra colección completa.",
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
            rights: "Todos los derechos reservados.",
            back_to_top: "Volver arriba"
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
            back_to_top: "Voltar ao topo",
            show_more: "Ver Mais",
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
            skin_care: { title: "Cuidado Facial", desc: "Sérums e cremes de alta eficácia." },
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
            perfumes: "Perfumes",
            regalos: "Presentes",
            manos_pies: "Mãos e Pés",
            all_products: "Todos os produtos",
            kits: "Kits",
            limpiadores: "Limpadores",
            tonicos: "Tónicos",
            serums: "Sérums",
            cremas: "Cremas",
            contorno: "Contorno de Olhos",
            mascarillas: "Máscaras",
            base: "Bases",
            correctores: "Corretores",
            polvo: "Pós",
            rubor: "Blush",
            labios: "Lábios",
            higiene: "Higiene",
            hidratacion: "Hidratação",
            cuidados: "Cuidados",
            lavado: "Lavagem",
            tratamiento: "Tratamento",
            styling: "Penteados",
            femeninos: "Femininos",
            masculinos: "Masculinos",
            unisex: "Unisex",
            hogar: "Casa",
            promociones: "Promoções",
            ultimas: "Últimas Unidades",
            best_sellers: "Mais Vendidos",
            sub_limpiadores: ["Géis", "Espumas", "Micelar"],
            sub_tonicos: ["Hidratantes", "Astringentes"],
            sub_serums: ["Vitamina C", "Retinol"],
            sub_cremas: ["Dia", "Noite"],
            sub_contorno: ["Bolsas", "Olheiras"],
            sub_mascarillas: ["Argila", "Hidrogel"],
            sub_base: ["Líquida", "Pó"],
            sub_correctores: ["Creme", "Stick"],
            sub_polvo: ["Translúcido", "Compacto"],
            sub_rubor: ["Pó", "Creme"],
            sub_labios: ["Mate", "Brilho"],
            sub_higiene: ["Sabonetes", "Géis de Banho"],
            sub_hidratacion: ["Loções", "Óleos"],
            sub_cuidados: ["Esfoliantes", "Desodorizantes"],
            sub_manos_pies: ["Reparação", "Proteção"],
            sub_lavado: ["Champôs", "Amaciadores"],
            sub_tratamiento: ["Máscaras", "Sérums"],
            sub_styling: ["Sprays", "Proteção Térmica"],
            sub_femeninos: ["Perfumes", "Colónias"],
            sub_masculinos: ["Frescos", "Intensos"],
            sub_unisex: ["Cítricos", "Amaderados"],
            sub_hogar: ["Velas", "Difusores"],
            sub_promociones: ["Até -50%", "Kits 2x1"],
            sub_ultimas: ["Stock Final"],
            sub_best_sellers: ["Top Vendas", "Favoritos"]
        },
        cart: {
            title: "O seu Carrinho",
            clear_cart: "Esvaziar carrinho",
            empty: "O seu cesto está vazio",
            empty_desc: "Parece que ainda não adicionou rituais de beleza.",
            subtotal: "Subtotal",
            shipping: "Envio",
            shipping_calc: "Calculado no checkout",
            total: "Total",
            checkout: "Finalizar Compra"
        },
        auth: {
            login_title: "Iniciar sessão",
            login_desc: "Entre para gerir as suas encomendas e favoritos.",
            register_title: "Criar conta",
            register_desc: "Junte-se à Beauthé e desfrute de vantagens exclusivas.",
            name_label: "Nome completo",
            name_placeholder: "O seu nome",
            email_label: "E-mail",
            password_label: "Palavra-passe",
            forgot_password: "Esqueceu a palavra-passe?",
            login_btn: "Entrar",
            register_btn: "Criar Perfil",
            google_btn: "Continuar com Google",
            no_account: "Não tem uma conta?",
            has_account: "Já tem conta?",
            register_now: "Registe-se agora",
            login_now: "Inicie sessão",
            next_step: "Próximo passo",
            account_created: "Conta criada!",
            interests_label: "Interesses",
            birth_label: "Data de Nascimento",
            complete_profile: "Finalizar Perfil",
            skip_step: "Saltar por agora",
            invalid_email: "Por favor, introduza um e-mail válido."
        },
        profile: {
            account: "Meu Perfil",
            personal_data: "Dados Pessoais",
            addresses: "Endereços",
            addresses_desc: "Gira os seus endereços de envio.",
            orders: "Minhas Encomendas",
            settings: "Configurações",
            logout: "Sair da conta",
            add_address: "Adicionar endereço",
            edit_address: "Editar endereço"
        },
        checkout: {
            title: "Finalizar Encomenda",
            shipping_address: "Endereço de Envio",
            payment_method: "Método de Pagamento",
            order_summary: "Resumo da Encomenda",
            place_order: "Confirmar e Pagar",
            secure: "Pagamento 100% Seguro",
            returns_guarantee: "Devolução garantida",
            save_info: "Guardar os meus dados para a próxima vez",
            payments: {
                card: "Cartão de Crédito",
                paypal: "PayPal",
                transfer: "Transferência Bancaria"
            }
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
                },
                {
                    question: "¿Posso combinar Vitamina C com Retinol na minha rotina?",
                    answer: "Recomendamos utilizar a Vitamina C na rotina de manhã para proteger a pele, e deixar o Retinol para a noite, promovendo a renovação celular."
                },
                {
                    question: "¿Oferecem envio gratuito?",
                    answer: "Sim, todas as encomendas superiores a 50€ desfrutam de envio padrão gratuito para Portugal Continental."
                },
                {
                    question: "¿Os produtos são 100% veganos?",
                    answer: "Absolutamente. Não utilizamos ingredientes de origem animal e orgulhamo-nos de ser uma marca certificada Cruelty-Free."
                },
                {
                    question: "¿Como posso seguir a minha encomenda?",
                    answer: "Assim que a encomenda sair do armazém, receberá um e-mail com o número de seguimento e um link direto."
                },
                {
                    question: "¿Qual é a vossa política de devoluções?",
                    answer: "Dispõe de 14 dias para devolver produtos não abertos na embalagem original se não estiver satisfeita."
                },
                {
                    question: "¿Em que ordem devo aplicar os produtos?",
                    answer: "A regra de ouro é: Limpador > Tónico > Sérum > Contorno > Hidratante > Protetor Solar."
                }
            ]
        },
        reviews_section: {
            tag: "Opiniões de Clientes",
            title: "O que dizem de nós",
            average: "Média de 4.9/5 estrelas baseada em clientes verificados",
            show_more: "Ver Mais Reviews"
        },
        filters: {
            price: "Preço",
            skin_tone: "Grupo de tons",
            color_name: "Cor",
            product_type: "Tipo de produto",
            items: "artigos",
            sort: "Ordenar",
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
                em_tendencia: "Tendência"
            }
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
            join_us_desc: "Descubra o que significa Viver Bonito. Explore a nossa coleção completa.",
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
            rights: "Todos os direitos reservados.",
            back_to_top: "Voltar ao topo"
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
        favorites: {
            title: "Os seus favoritos",
            empty_title_1: "Ainda não tem",
            empty_title_2: "favoritos ainda"
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
            back_to_top: "Back to top",
            show_more: "Show More",
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
            perfumes: "Perfumes",
            regalos: "Gifts",
            manos_pies: "Hands & Feet",
            all_products: "All products",
            kits: "Kits",
            limpiadores: "Cleansers",
            tonicos: "Toners",
            serums: "Serums",
            cremas: "Creams",
            contorno: "Eye Contour",
            mascarillas: "Masks",
            base: "Foundations",
            correctores: "Concealers",
            polvo: "Powders",
            rubor: "Blush",
            labios: "Lips",
            higiene: "Hygiene",
            hidratacion: "Hydration",
            cuidados: "Care",
            lavado: "Wash",
            tratamiento: "Treatment",
            styling: "Styling",
            femeninos: "Women's",
            masculinos: "Men's",
            unisex: "Unisex",
            hogar: "Home",
            promociones: "Promotions",
            ultimas: "Last Unities",
            best_sellers: "Best Sellers",
            sub_limpiadores: ["Gels", "Foams", "Micellar"],
            sub_tonicos: ["Hydrating", "Astringent"],
            sub_serums: ["Vitamin C", "Retinol"],
            sub_cremas: ["Day", "Night"],
            sub_contorno: ["Bolsas", "Ojeras"],
            sub_mascarillas: ["Clay", "Hydrogel"],
            sub_base: ["Liquid", "Powder"],
            sub_correctores: ["Cream", "Stick"],
            sub_polvo: ["Translucent", "Compact"],
            sub_rubor: ["Powder", "Cream"],
            sub_labios: ["Matte", "Gloss"],
            sub_higiene: ["Soaps", "Bath Gels"],
            sub_hidratacion: ["Lotions", "Oils"],
            sub_cuidados: ["Exfoliators", "Deodorants"],
            sub_manos_pies: ["Repairing", "Protective"],
            sub_lavado: ["Shampoos", "Conditioners"],
            sub_tratamiento: ["Masks", "Serums"],
            sub_styling: ["Sprays", "Heat Protection"],
            sub_femeninos: ["Perfumes", "Colognes"],
            sub_masculinos: ["Fresh", "Intense"],
            sub_unisex: ["Citrus", "Woody"],
            sub_hogar: ["Candles", "Diffusers"],
            sub_promociones: ["Up to -50%", "2x1 Kits"],
            sub_ultimas: ["Final Stock"],
            sub_best_sellers: ["Top Sellers", "Favorites"]
        },
        cart: {
            title: "Your Cart",
            clear_cart: "Clear cart",
            empty: "Your cart is empty",
            empty_desc: "Looks like you haven't added any beauty rituals.",
            subtotal: "Subtotal",
            shipping: "Shipping",
            shipping_calc: "Calculated at checkout",
            total: "Total",
            checkout: "Checkout"
        },
        auth: {
            login_title: "Login",
            login_desc: "Log in to manage your orders and favorites.",
            register_title: "Create account",
            register_desc: "Join Beauthé and enjoy exclusive benefits.",
            name_label: "Full name",
            name_placeholder: "Your name",
            email_label: "Email",
            password_label: "Password",
            forgot_password: "Forgot your password?",
            login_btn: "Login",
            register_btn: "Create Profile",
            google_btn: "Continue with Google",
            no_account: "Don't have an account?",
            has_account: "Already have an account?",
            register_now: "Register now",
            login_now: "Login now",
            next_step: "Next step",
            account_created: "Account created!",
            interests_label: "Interests",
            birth_label: "Date of Birth",
            complete_profile: "Complete Profile",
            skip_step: "Skip for now",
            invalid_email: "Please enter a valid email address."
        },
        profile: {
            account: "My Profile",
            personal_data: "Personal Data",
            addresses: "Addresses",
            addresses_desc: "Manage your shipping addresses.",
            orders: "My Orders",
            settings: "Settings",
            logout: "Logout",
            add_address: "Add address",
            edit_address: "Edit address"
        },
        checkout: {
            title: "Finish Order",
            shipping_address: "Shipping Address",
            payment_method: "Payment Method",
            order_summary: "Order Summary",
            place_order: "Confirm and Pay",
            secure: "100% Secure Payment",
            returns_guarantee: "Returns guaranteed",
            save_info: "Save my info for next time",
            payments: {
                card: "Credit Card",
                paypal: "PayPal",
                transfer: "Bank Transfer"
            }
        },
        faq_section: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know about your beauty ritual.",
            items: [
                {
                    question: "How long does it take for Skin Care products to take effect?",
                    answer: "Initial hydration results are noticed immediately, while deep treatments show visible changes after 3 to 4 weeks."
                },
                {
                    question: "Are the products suitable for sensitive skin?",
                    answer: "Yes, our collection is dermatologically tested for the most delicate skin."
                },
                {
                    question: "Can I combine Vitamin C with Retinol?",
                    answer: "We recommend Vitamin C in the morning and Retinol at night."
                },
                {
                    question: "Do you offer free shipping?",
                    answer: "Yes, on orders over 50€."
                },
                {
                    question: "Are the products vegan?",
                    answer: "Yes, 100% vegan and Cruelty-Free."
                },
                {
                    question: "How can I track my order?",
                    answer: "You will receive a tracking number via email once it ships."
                },
                {
                    question: "What is your return policy?",
                    answer: "14 days for unopened products in original packaging."
                },
                {
                    question: "In what order should I apply products?",
                    answer: "Thinnest to thickest: Cleanser > Toner > Serum > Eye Contour > Moisturizer > SPF."
                }
            ]
        },
        reviews_section: {
            tag: "Customer Reviews",
            title: "What they say about us",
            average: "Average of 4.9/5 stars based on verified customers",
            show_more: "See More Reviews"
        },
        filters: {
            price: "Price",
            skin_tone: "Skin tone",
            color_name: "Color",
            product_type: "Product type",
            items: "items",
            sort: "Sort",
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
            }
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
            join_us_desc: "Discover what it means to Live Beautifully. Explore our full collection.",
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
            rights: "All rights reserved.",
            back_to_top: "Back to top"
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
            // Check if it's an array (like faq_section.items or sub_*)
            if (Array.isArray(value)) return value;
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
