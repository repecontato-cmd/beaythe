import React, { useState, useEffect } from 'react';
import { getProducts, updateProduct } from '../services/db';
import { Store, Eye, EyeOff, LayoutTemplate } from 'lucide-react';

export default function StorefrontManager() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleToggleActive = async (id, currentStatus) => {
        await updateProduct(id, { is_active: !currentStatus });
        loadProducts();
    };

    const handlePlacementChange = async (id, newPlacement) => {
        await updateProduct(id, { placement: newPlacement });
        loadProducts();
    };

    const activeCount = products.filter(p => p.is_active).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Store className="text-rose-500" size={32} /> Gestão de Vitrines
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Controle quais produtos aparecem no site principal (Ativos: {activeCount}/{products.length}). Novos itens importados chegam Ocultos por segurança.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                            <th className="p-5 font-bold">Produto</th>
                            <th className="p-5 font-bold">Estoque & Preço</th>
                            <th className="p-5 font-bold">Visibilidade Pública</th>
                            <th className="p-5 font-bold">Sessão da Loja (Placement)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        {product.image_url ? (
                                            <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden">
                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex-shrink-0"></div>
                                        )}
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm leading-tight line-clamp-2" title={product.name}>{product.name}</p>
                                            <p className="text-xs text-gray-400 font-mono mt-1">ID: {product.id}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-5">
                                    <p className={`font-bold ${product.manual_price ? 'text-rose-600' : 'text-gray-900'}`}>
                                        € {(product.manual_price || product.price).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500 font-mono mt-1">{product.stock} un.</p>
                                </td>

                                <td className="p-5">
                                    <button
                                        onClick={() => handleToggleActive(product.id, product.is_active)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${product.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                                    >
                                        {product.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                                        {product.is_active ? 'Ativo no Site' : 'Oculto (Rascunho)'}
                                    </button>
                                </td>

                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <LayoutTemplate size={16} className="text-gray-400" />
                                        <select
                                            value={product.placement}
                                            onChange={(e) => handlePlacementChange(product.id, e.target.value)}
                                            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 outline-none font-bold cursor-pointer"
                                        >
                                            <option value="HIDDEN">Nenhum Destaque (Busca apenas)</option>
                                            <option value="HOME">Vitrine: Destaques da Home</option>
                                            <option value="TRENDING">Seção: Bestsellers / Tendências</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-400">Nenhum produto em inventário.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
