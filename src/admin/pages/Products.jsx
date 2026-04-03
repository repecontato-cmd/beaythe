import React, { useState, useEffect } from 'react';
import { getProducts, updateProduct, importFromDropea, getSettings, updateSettings, getDropeaCatalog } from '../services/db';
import { Box, Tag as TagIcon, Plus, X, Settings2, Sparkles, DownloadCloud } from 'lucide-react';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [tagInput, setTagInput] = useState('');
    const [kitInput, setKitInput] = useState('');

    const [importId, setImportId] = useState('');
    const [isImporting, setIsImporting] = useState(false);

    // Pricing Settings
    const [margin, setMargin] = useState(30);
    const [shipping, setShipping] = useState(7);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    // Catalog Modal & Categories
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [catalogItems, setCatalogItems] = useState([]);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todas');

    useEffect(() => {
        loadProducts();
        loadSettings();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const loadSettings = async () => {
        const settings = await getSettings();
        setMargin(settings.profit_margin_percent || 30);
        setShipping(settings.fixed_shipping_cost || 7);
    };

    const handleSaveSettings = async () => {
        setIsSavingSettings(true);
        await updateSettings({ profit_margin_percent: margin, fixed_shipping_cost: shipping });
        setIsSavingSettings(false);
        alert("Parâmetros do Motor atualizados com sucesso!");
    };

    const handleOpenCatalog = async () => {
        setIsCatalogOpen(true);
        setIsLoadingCatalog(true);
        const data = await getDropeaCatalog();
        setCatalogItems(data);
        setActiveCategory('Todas'); // Reset
        setIsLoadingCatalog(false);
    };

    const handleImportFromCatalog = async (dropeaId) => {
        try {
            const res = await importFromDropea(dropeaId.toString());
            if (res.error) alert(`Erro na Importação: ${res.error}`);
            else alert(`Sucesso! O produto "${res.name}" foi sincronizado ao seu catálogo.`);
            await loadProducts();
        } catch (error) {
            console.error(error);
            alert('Falha na comunicação com o servidor.');
        }
    };

    const handleImport = async () => {
        if (!importId.trim()) return;
        setIsImporting(true);
        try {
            const res = await importFromDropea(importId.trim());
            if (res.error) {
                alert(`Erro na Importação: ${res.error}`);
            } else {
                alert(`Sucesso! O produto "${res.name}" foi sincronizado da Dropea.`);
            }
            await loadProducts();
            setImportId('');
        } catch (error) {
            console.error(error);
            alert('Falha na comunicação com o servidor. O Backend pode estar reiniciando.');
        } finally {
            setIsImporting(false);
        }
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

    // Derived State for Categories
    const uniqueCategories = ['Todas', ...new Set(catalogItems.map(item => item.category).filter(Boolean))].sort();
    const filteredCatalog = activeCategory === 'Todas' ? catalogItems : catalogItems.filter(p => p.category === activeCategory);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
                        <Box size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Produtos & Catálogo</h1>
                        <p className="text-sm text-gray-500">Gerencie sua loja e importe produtos em massa da Dropea.</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                        <input
                            type="text"
                            value={importId}
                            onChange={(e) => setImportId(e.target.value)}
                            placeholder="ID Dropea API"
                            className="bg-transparent px-3 py-2 text-sm outline-none w-32 focus:w-40 transition-all font-mono"
                        />
                        <button
                            onClick={handleImport}
                            disabled={isImporting}
                            className="bg-black hover:bg-gray-800 transition-colors text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap disabled:opacity-50"
                        >
                            {isImporting ? 'Importando...' : 'Sincronizar Único'}
                        </button>
                    </div>
                    <button
                        onClick={handleOpenCatalog}
                        className="bg-rose-600 hover:bg-rose-700 transition-colors text-white flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold shadow-sm"
                    >
                        <Sparkles size={16} /> Ver Catálogo Dropea
                    </button>
                </div>
            </div>

            {/* Pricing Engine Dashboard */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-8 text-white flex flex-col md:flex-row gap-6 items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                    <Settings2 size={28} className="text-rose-400" />
                    <div>
                        <h2 className="font-bold text-lg">Motor de Precificação Automática</h2>
                        <p className="text-gray-400 text-xs">Fórmula: (Custo Produto + Custo Envio) * Margem de Lucro</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Margem Desejada (%)</label>
                        <input
                            type="number"
                            value={margin}
                            onChange={e => setMargin(e.target.value)}
                            className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 w-32 outline-none focus:border-rose-500 transition-colors font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Custo Logístico Fixo (€)</label>
                        <input
                            type="number"
                            value={shipping}
                            onChange={e => setShipping(e.target.value)}
                            className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 w-32 outline-none focus:border-rose-500 transition-colors font-mono"
                        />
                    </div>
                    <button
                        onClick={handleSaveSettings}
                        disabled={isSavingSettings}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-bold h-[42px] px-6 rounded-lg transition-colors text-sm"
                    >
                        {isSavingSettings ? '...' : 'Salvar Regra'}
                    </button>
                </div>
            </div>

            {/* Product List */}
            <div className="grid gap-6">
                {products.map(product => (
                    <div key={product.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gray-50/30">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-6 items-start">
                                {product.image_url && (
                                    <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 shadow-sm flex-shrink-0 overflow-hidden">
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-500 font-mono mt-1">ID Local: {product.id} | ID Dropea: {product.dropea_id} | Estoque: {product.stock}</p>
                                    <p className="text-rose-600 font-bold mt-1">€ {product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEditingId(editingId === product.id ? null : product.id)}
                                className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
                            >
                                {editingId === product.id ? 'Fechar Edição' : 'Editar Vínculos/Tags'}
                            </button>
                        </div>

                        {/* Display Tags */}
                        <div className="mb-4">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Tags Estéticas (Dores)</span>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map(tag => (
                                    <span key={tag} className="bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        {tag}
                                        {editingId === product.id && (
                                            <button onClick={() => removeTag(product.id, product.tags, tag)} className="hover:text-rose-900 ml-1"><X size={12} /></button>
                                        )}
                                    </span>
                                ))}
                                {product.tags.length === 0 && <span className="text-xs text-gray-400">Sem tags cadastradas.</span>}
                            </div>

                            {editingId === product.id && (
                                <div className="mt-3 flex gap-2 max-w-sm">
                                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Nova tag (ex: pele seca)" className="text-xs border border-gray-200 rounded-lg px-3 py-2 flex-1 outline-none focus:border-gray-800" />
                                    <button onClick={() => addTag(product.id, product.tags)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">Adicionar</button>
                                </div>
                            )}
                        </div>

                        {/* Display Upsell Kits */}
                        <div className="pt-4 border-t border-gray-100 gap-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Kits de Upsell Vinculados (IDs)</span>
                            <div className="flex flex-wrap gap-2">
                                {product.upsell_kits.map(kitId => {
                                    const linkedP = products.find(p => p.id === kitId);
                                    return (
                                        <span key={kitId} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2">
                                            <Box size={12} /> {linkedP ? linkedP.name : `ID Geral: ${kitId}`}
                                            {editingId === product.id && (
                                                <button onClick={() => removeKit(product.id, product.upsell_kits, kitId)} className="hover:text-blue-900 ml-1"><X size={12} /></button>
                                            )}
                                        </span>
                                    );
                                })}
                                {product.upsell_kits.length === 0 && <span className="text-xs text-gray-400">Nenhum vínculo de kit.</span>}
                            </div>

                            {editingId === product.id && (
                                <div className="mt-3 flex gap-2 max-w-sm">
                                    <input type="number" value={kitInput} onChange={(e) => setKitInput(e.target.value)} placeholder="ID Local do Produto p/ Upsell" className="text-xs border border-gray-200 rounded-lg px-3 py-2 flex-1 outline-none focus:border-gray-800" />
                                    <button onClick={() => addKit(product.id, product.upsell_kits)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">Vincular</button>
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>

            {/* Dropea Mass Catalog Modal */}
            {isCatalogOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:p-8">
                    <div className="bg-white rounded-3xl w-full max-w-6xl max-h-full flex flex-col shadow-2xl relative overflow-hidden">

                        {/* Header Principal */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Sparkles className="text-rose-500" /> Marketplace Dropea</h2>
                                <p className="text-sm text-gray-500 mt-1">Exibindo {catalogItems.length} produtos em tendência. Navegue por categorias abaixo.</p>
                            </div>
                            <button onClick={() => setIsCatalogOpen(false)} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Categoria Zero-Latency Tabs */}
                        {!isLoadingCatalog && catalogItems.length > 0 && (
                            <div className="px-6 py-4 border-b border-gray-100 flex gap-2 overflow-x-auto bg-white flex-shrink-0 sticky top-0 z-10" style={{ scrollbarWidth: 'none' }}>
                                {uniqueCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${activeCategory === cat ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Scrollable Content */}
                        <div className="p-6 flex-1 overflow-y-auto bg-gray-50/30">
                            {isLoadingCatalog ? (
                                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                    <DownloadCloud size={48} className="animate-bounce text-rose-300 mb-4" />
                                    <p className="font-bold text-gray-700">Explorando o ecossistema Dropshipping...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredCatalog.map(item => (
                                        <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all group">
                                            {item.image && (
                                                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                </div>
                                            )}
                                            <div className="flex flex-col flex-1">
                                                <h4 className="font-bold text-gray-900 text-sm line-clamp-2" title={item.name}>{item.name}</h4>
                                                <p className="text-xs text-rose-600 font-bold mt-1 bg-rose-50 px-2 py-0.5 rounded-md inline-block self-start">{item.category}</p>

                                                <div className="mt-auto pt-3 flex flex-col gap-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">Custo Dropea</span>
                                                        <span className="font-bold text-gray-400 line-through">€ {parseFloat(item.cost_price || item.pvpr || 0).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm py-1 border-t border-gray-100 mt-1">
                                                        <span className="font-bold text-rose-600">Venda Estimada</span>
                                                        <span className="font-bold text-gray-900">€ {item.suggested_sell_price?.toFixed(2)}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleImportFromCatalog(item.id)}
                                                        className="w-full mt-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <DownloadCloud size={14} /> Importar ao Catálogo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredCatalog.length === 0 && (
                                        <div className="col-span-full py-10 text-center text-gray-400">
                                            Nenhum produto encontrado nesta categoria na remessa atual.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
