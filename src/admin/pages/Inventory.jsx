import React, { useState, useEffect } from 'react';
import { getProducts, updateProduct, getSettings } from '../services/db';
import { PackageSearch, Tag as TagIcon, X, Box, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [tagInput, setTagInput] = useState('');
    const [kitInput, setKitInput] = useState('');
    const [manualPriceInput, setManualPriceInput] = useState('');

    // Configurações do Motor (Somente Leitura aqui)
    const [engineSettings, setEngineSettings] = useState({ margin: 30, shipping: 7 });

    useEffect(() => {
        loadProducts();
        loadSettings();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const loadSettings = async () => {
        const s = await getSettings();
        setEngineSettings({ margin: s.profit_margin_percent, shipping: s.fixed_shipping_cost });
    };

    const handleUpdate = async (id, field, value) => {
        await updateProduct(id, { [field]: value });
        loadProducts();
    };

    const addTag = async (id, currentTags) => {
        if (!tagInput.trim()) return;
        const newTags = [...currentTags, tagInput.trim().toLowerCase()];
        await handleUpdate(id, 'tags', newTags);
        setTagInput('');
    };

    const removeTag = async (id, currentTags, tagToRemove) => {
        const newTags = currentTags.filter(t => t !== tagToRemove);
        await handleUpdate(id, 'tags', newTags);
    };

    const addKit = async (id, currentKits) => {
        const kitId = parseInt(kitInput);
        if (!kitId || isNaN(kitId) || currentKits.includes(kitId)) return;
        const newKits = [...currentKits, kitId];
        await handleUpdate(id, 'upsell_kits', newKits);
        setKitInput('');
    };

    const removeKit = async (id, currentKits, kitToRemove) => {
        const newKits = currentKits.filter(k => k !== kitToRemove);
        await handleUpdate(id, 'upsell_kits', newKits);
    };

    const saveManualPrice = async (id) => {
        const p = parseFloat(manualPriceInput);
        if (isNaN(p) || p <= 0) return;
        await handleUpdate(id, 'manual_price', p);
        setManualPriceInput('');
        setEditingId(null);
    };

    const removeManualPrice = async (id) => {
        await handleUpdate(id, 'manual_price', null);
        setEditingId(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <PackageSearch className="text-gray-900" size={32} /> Inventário & Preços
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Gerencie tags, kits e force preços promocionais individuais no seu catálogo de {products.length} itens.</p>
            </div>

            <div className="grid gap-6">
                {products.map(product => {
                    const isManual = product.manual_price !== null;
                    const displayPrice = isManual ? product.manual_price : product.price;

                    return (
                        <div key={product.id} className={`bg-white rounded-2xl p-6 transition-all border ${isManual ? 'border-rose-200 shadow-[0_4px_20px_-5px_rgba(225,29,72,0.1)]' : 'border-gray-200 shadow-sm hover:shadow-md'}`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-center gap-5">
                                    {product.image_url ? (
                                        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400">
                                            <Box size={24} />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
                                        <div className="flex items-center gap-3 mt-2 text-sm">
                                            <span className="font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">ID: {product.id}</span>
                                            <span className="font-mono text-gray-500">Estoque: {product.stock}</span>
                                            {product.placement !== 'HIDDEN' && (
                                                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs">Visível: {product.placement}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-gray-100">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{isManual ? 'Preço Fixo (Manual)' : 'Preço Dinâmico (Motor)'}</span>
                                        <span className={`text-2xl font-black ${isManual ? 'text-rose-600' : 'text-gray-900'}`}>€ {displayPrice.toFixed(2)}</span>
                                        {isManual && (
                                            <span className="text-xs text-gray-400 line-through mt-0.5">Global: € {product.price.toFixed(2)}</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            setEditingId(editingId === product.id ? null : product.id);
                                            setManualPriceInput(isManual ? product.manual_price.toString() : product.price.toString());
                                        }}
                                        className={`ml-4 w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${editingId === product.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        <ChevronRight size={20} className={editingId === product.id ? "rotate-90 transition-transform" : "transition-transform"} />
                                    </button>
                                </div>
                            </div>

                            {/* Editing Panel */}
                            {editingId === product.id && (
                                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">

                                    {/* Pricing Override Card */}
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-rose-500">
                                                <Calculator size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Forçar Preço Manual</h4>
                                                <p className="text-xs text-gray-500">Trave o preço para ignorar a regra global.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="relative flex-1">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={manualPriceInput}
                                                    onChange={e => setManualPriceInput(e.target.value)}
                                                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-8 pr-4 outline-none focus:border-rose-500 font-mono text-lg font-bold"
                                                />
                                            </div>
                                            <button
                                                onClick={() => saveManualPrice(product.id)}
                                                className="bg-black hover:bg-gray-800 text-white font-bold px-6 rounded-xl transition-colors"
                                            >
                                                Salvar Fixo
                                            </button>
                                        </div>
                                        {isManual && (
                                            <button
                                                onClick={() => removeManualPrice(product.id)}
                                                className="mt-4 text-sm font-bold text-rose-600 hover:text-rose-700 underline underline-offset-4"
                                            >
                                                Remover Preço Fixo e Voltar ao Motor Estático
                                            </button>
                                        )}
                                    </div>

                                    {/* Taxonomy & Kits */}
                                    <div className="space-y-6">
                                        {/* Display Tags */}
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3 flex items-center gap-2"><TagIcon size={14} /> Tags Estéticas (Dores)</span>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {product.tags.map(tag => (
                                                    <span key={tag} className="bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                                                        {tag}
                                                        <button onClick={() => removeTag(product.id, product.tags, tag)} className="hover:text-rose-900 bg-rose-200/50 p-0.5 rounded-full"><X size={12} /></button>
                                                    </span>
                                                ))}
                                                {product.tags.length === 0 && <span className="text-xs text-gray-400 py-1.5">Sem tags cadastradas.</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Nova tag (ex: pele seca)" className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 flex-1 outline-none focus:border-gray-400" />
                                                <button onClick={() => addTag(product.id, product.tags)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 rounded-xl font-bold transition-colors">Adicionar</button>
                                            </div>
                                        </div>

                                        {/* Display Upsell Kits */}
                                        <div className="pt-6 border-t border-gray-100">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3 flex items-center gap-2"><Box size={14} /> Kits de Upsell (Cross-sell)</span>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {product.upsell_kits.map(kitId => {
                                                    const linkedP = products.find(p => p.id === kitId);
                                                    return (
                                                        <span key={kitId} className="bg-gray-900 text-white border border-black px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
                                                            <CheckCircle2 size={12} className="text-emerald-400" /> {linkedP ? linkedP.name : `ID Geral: ${kitId}`}
                                                            <button onClick={() => removeKit(product.id, product.upsell_kits, kitId)} className="hover:text-rose-400 ml-1"><X size={14} /></button>
                                                        </span>
                                                    );
                                                })}
                                                {product.upsell_kits.length === 0 && <span className="text-xs text-gray-400 py-1.5">Nenhum vínculo de kit.</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="number" value={kitInput} onChange={(e) => setKitInput(e.target.value)} placeholder="ID Local do Produto p/ Upsell" className="text-sm border border-gray-200 font-mono rounded-xl px-4 py-2.5 flex-1 outline-none focus:border-gray-400" />
                                                <button onClick={() => addKit(product.id, product.upsell_kits)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 rounded-xl font-bold transition-colors">Vincular</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
