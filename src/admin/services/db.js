const API_URL = 'http://localhost:3000/api';

// --- ORDERS (Legacy Local Mock for Logistics) ---
const INITIAL_ORDERS = [
    { id: 'ORD-001', customer: 'João Silva', total: 120.50, status: 'pendente_confirmacao', date: new Date().toISOString() },
    { id: 'ORD-002', customer: 'Maria Santos', total: 85.00, status: 'confirmado_cliente', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 'ORD-003', customer: 'Pedro Costa', total: 245.90, status: 'saiu_para_entrega', date: new Date(Date.now() - 172800000).toISOString() }
];

if (!localStorage.getItem('admin_orders')) localStorage.setItem('admin_orders', JSON.stringify(INITIAL_ORDERS));
const getCollection = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const setCollection = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const getOrders = async () => getCollection('admin_orders');
export const updateOrderStatus = async (id, newStatus) => {
    const orders = getCollection('admin_orders');
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        orders[index].status = newStatus;
        setCollection('admin_orders', orders);
    }
};

// --- PRODUCTS (Real Node API) ---
export const getProducts = async () => {
    try {
        const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
        const data = await res.json();
        return data.map(p => ({
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            upsell_kits: JSON.parse(p.upsell_kits || '[]')
        }));
    } catch (error) {
        console.error('API Connect Error:', error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
        const p = await res.json();
        if (p.error) throw new Error(p.error);
        return {
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            upsell_kits: JSON.parse(p.upsell_kits || '[]'),
            recommended_products: JSON.parse(p.recommended_products || '[]'),
            landing_page_data: p.landing_page_data ? JSON.parse(p.landing_page_data) : null,
        };
    } catch (error) {
        console.error('API Connect Error:', error);
        return null;
    }
};

export const updateProduct = async (id, updates) => {
    if (updates.tags) updates.tags = JSON.stringify(updates.tags);
    if (updates.upsell_kits) updates.upsell_kits = typeof updates.upsell_kits === 'string' ? updates.upsell_kits : JSON.stringify(updates.upsell_kits);
    if (updates.recommended_products) updates.recommended_products = typeof updates.recommended_products === 'string' ? updates.recommended_products : JSON.stringify(updates.recommended_products);
    if (updates.landing_page_data) updates.landing_page_data = typeof updates.landing_page_data === 'string' ? updates.landing_page_data : JSON.stringify(updates.landing_page_data);

    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    return res.json();
};

export const importFromDropea = async (dropeaId) => {
    const res = await fetch(`${API_URL}/products/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dropeaId })
    });
    return res.json();
};

export const getDropeaCatalog = async (page = 1) => {
    try {
        const res = await fetch(`${API_URL}/products/dropea-catalog?page=${page}`, { cache: 'no-store' });
        return res.json();
    } catch (e) {
        return [];
    }
};

export const getSettings = async () => {
    try {
        const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
        return res.json();
    } catch (e) {
        return { profit_margin_percent: 30, fixed_shipping_cost: 7 };
    }
};

export const updateSettings = async (settings) => {
    const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
    });
    return res.json();
};

// --- SEO ENGINE (Real Node API) ---
export const getSEOUrls = async () => {
    const res = await fetch(`${API_URL}/seo/urls`);
    return res.json();
};

export const generateSEOUrls = async () => {
    const cities = getSEOCities();
    const pains = getSEOPains();

    const res = await fetch(`${API_URL}/seo/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cities, pains })
    });
    return res.json();
};

// Virtual Master Data for SEO Factory
export const getSEOCities = () => ['São Paulo', 'Rio de Janeiro', 'Lisboa', 'Porto', 'Madrid', 'Barcelona'];
export const getSEOPains = () => ['Acne Severa', 'Manchas Escuras', 'Pele Oleosa', 'Rugas Finas', 'Lábios Ressecados'];
