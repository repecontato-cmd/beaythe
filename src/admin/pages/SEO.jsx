import React, { useState, useEffect } from 'react';
import { getSEOCities, getSEOPains, getSEOUrls, generateSEOUrls } from '../services/db';
import { Search, Sliders, RefreshCw, Globe, ArrowUpRight } from 'lucide-react';

export default function SEO() {
    const [cities, setCities] = useState([]);
    const [pains, setPains] = useState([]);
    const [urls, setUrls] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setCities(getSEOCities());
        setPains(getSEOPains());
        loadUrls();
    }, []);

    const loadUrls = async () => {
        const data = await getSEOUrls();
        setUrls(data);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await generateSEOUrls();
        // Start polling or just reload once since it's background
        setTimeout(async () => {
            await loadUrls();
            setIsGenerating(false);
        }, 1500); // UI feedback delay for first generated items
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Motor de SEO Programático</h1>
                        <p className="text-sm text-gray-500">Cruze Cidades/Regiões com Problemas/Dores para gerar URLs ranqueáveis.</p>
                    </div>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-black transition-all disabled:opacity-50"
                >
                    {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Sliders size={18} />}
                    {isGenerating ? 'Processando Grade...' : 'Sincronizar URLs Dinâmicas'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Tabela de Dores Virtuais */}
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Modelo: Dores Catalogadas ({pains.length})</h3>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2">
                        {pains.map(pain => (
                            <span key={pain} className="bg-white border border-gray-200 shadow-sm text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                                {pain}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tabela de Regiões Virtuais */}
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Modelo: Regiões/Cidades ({cities.length})</h3>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2">
                        {cities.map(city => (
                            <span key={city} className="bg-white border border-gray-200 shadow-sm text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Resultados Gerados */}
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={18} className="text-gray-400" /> Result Map URLs ({urls.length} URLs geradas)
            </h3>

            {urls.length > 0 ? (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 sticky top-0 border-b border-gray-200 shadow-sm z-10">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-600">Combinação Base</th>
                                    <th className="px-4 py-3 font-semibold text-gray-600">URL Gerada Programaticamente</th>
                                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Status Index</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {urls.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-gray-600 font-medium">{item.pain} + {item.city}</td>
                                        <td className="px-4 py-3 font-mono text-blue-600 text-xs flex items-center gap-2">
                                            {item.url} <ArrowUpRight size={12} className="opacity-50 hover:opacity-100 cursor-pointer" />
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Matriz não processada. Clique no botão de Sincronizar acima para cruzar os dados.</p>
                </div>
            )
            }

        </div >
    );
}
