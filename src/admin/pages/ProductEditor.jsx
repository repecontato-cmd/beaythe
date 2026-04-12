import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/db';
import { Save, ArrowLeft, Paintbrush, Target, Palette, ListChecks, PlusCircle, Trash2 } from 'lucide-react';

export default function ProductEditor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');

    // DB Models
    const [product, setProduct] = useState(null);
    const [lpData, setLpData] = useState({});
    const [recommendedIds, setRecommendedIds] = useState([]);
    const [basicInfo, setBasicInfo] = useState({ name: '', description: '', image_url: '', tags: [] });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        const prod = await getProductById(id);
        if (prod) {
            setProduct(prod);
            // Convert existing landing_page_data or create default empty structure
            setLpData(prod.landing_page_data || {
                primary: '#E85D75', secondary: '#FF8C61', bg: '#FFF5F6', accent: '#C4A49A',
                font: 'font-sans',
                marketing: { texture: '', ingredient: '', lifestyle: '' },
                landingPage: {
                    problem: { headline: '', description: '' },
                    solution: { headline: '', benefits: [] },
                    comparison: { us: [], them: [] },
                    faq: [],
                    socialProof: { tag: '', title: '', testimonials: [], stats: [] },
                    formulation: { title: '', description: '', ingredients: [], image: '' }
                }
            });
            setRecommendedIds(prod.recommended_products || []);
            setBasicInfo({
                name: prod.name || '',
                description: prod.description || '',
                image_url: prod.image_url || '',
                tags: prod.tags || []
            });
        }
        setIsLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await updateProduct(id, {
            name: basicInfo.name,
            description: basicInfo.description,
            image_url: basicInfo.image_url,
            tags: basicInfo.tags,
            landing_page_data: lpData,
            recommended_products: recommendedIds
        });
        setIsSaving(false);
        alert('Landing Page do produto atualizada com sucesso!');
    };

    const updateNestedField = (path, value) => {
        setLpData(prev => {
            const copy = JSON.parse(JSON.stringify(prev));
            let curr = copy;
            for (let i = 0; i < path.length - 1; i++) {
                if (!curr[path[i]]) curr[path[i]] = {};
                curr = curr[path[i]];
            }
            curr[path[path.length - 1]] = value;
            return copy;
        });
    };

    if (isLoading) return <div className="p-10">Carregando Construtor...</div>;
    if (!product) return <div className="p-10">Produto não encontrado.</div>;

    return (
        <div className="space-y-6 animate-in fade-in max-w-6xl mx-auto pb-24">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin-core-sys/inventory')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Construtor de Oferta</h1>
                        <p className="text-gray-500">Editando o produto: <b>{basicInfo.name}</b></p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
                >
                    <Save size={18} /> {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>

            {/* Main Editor Layout */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Lateral Tabs */}
                <div className="w-full md:w-64 flex flex-col gap-2">
                    <button onClick={() => setActiveTab('basic')} className={`p-4 text-left rounded-xl font-bold flex items-center gap-3 transition-colors ${activeTab === 'basic' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'}`}>
                        <Target size={20} /> Informações Básicas
                    </button>
                    <button onClick={() => setActiveTab('visual')} className={`p-4 text-left rounded-xl font-bold flex items-center gap-3 transition-colors ${activeTab === 'visual' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'}`}>
                        <Palette size={20} /> Design e Cores
                    </button>
                    <button onClick={() => setActiveTab('copy')} className={`p-4 text-left rounded-xl font-bold flex items-center gap-3 transition-colors ${activeTab === 'copy' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'}`}>
                        <Paintbrush size={20} /> Copy de Vendas
                    </button>
                    <button onClick={() => setActiveTab('assets')} className={`p-4 text-left rounded-xl font-bold flex items-center gap-3 transition-colors ${activeTab === 'assets' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'}`}>
                        <Target size={20} /> Imagens Extras
                    </button>
                    <button onClick={() => setActiveTab('upsell')} className={`p-4 text-left rounded-xl font-bold flex items-center gap-3 transition-colors ${activeTab === 'upsell' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'}`}>
                        <ListChecks size={20} /> Upsell e Cross-Sell
                    </button>
                </div>

                {/* Content Panel */}
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Informações e Categorização</h2>
                            <p className="text-sm text-gray-500">Altere o nome e coloque tags/palavras-chave (ex: "rosto", "solares", "maquillaje") para forçar este produto a aparecer nas categorias correspondentes do site.</p>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nome Principal</label>
                                <input type="text" value={basicInfo.name} onChange={e => setBasicInfo({ ...basicInfo, name: e.target.value })} className="w-full border p-3 rounded-xl" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Miniatura Principal (URL)</label>
                                <input type="url" value={basicInfo.image_url} onChange={e => setBasicInfo({ ...basicInfo, image_url: e.target.value })} className="w-full border p-3 rounded-xl" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Tags (separadas por vírgula)</label>
                                <input
                                    type="text"
                                    value={basicInfo.tags.join(', ')}
                                    onChange={e => {
                                        const tags = e.target.value.split(',').map(v => v.trim().toLowerCase()).filter(v => v);
                                        setBasicInfo({ ...basicInfo, tags });
                                    }}
                                    className="w-full border p-3 rounded-xl lowercase"
                                    placeholder="rosto, hidratacion, anti-idade..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    value={basicInfo.description}
                                    onChange={e => setBasicInfo({ ...basicInfo, description: e.target.value })}
                                    className="w-full border p-3 rounded-xl"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {activeTab === 'visual' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Estética da Landing Page</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cor Principal</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={lpData.primary || '#000000'} onChange={e => updateNestedField(['primary'], e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
                                        <input type="text" value={lpData.primary || ''} onChange={e => updateNestedField(['primary'], e.target.value)} className="border rounded-lg px-3 flex-1" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cor Secundária</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={lpData.secondary || '#000000'} onChange={e => updateNestedField(['secondary'], e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
                                        <input type="text" value={lpData.secondary || ''} onChange={e => updateNestedField(['secondary'], e.target.value)} className="border rounded-lg px-3 flex-1" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cor de Fundo (Background)</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={lpData.bg || '#ffffff'} onChange={e => updateNestedField(['bg'], e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
                                        <input type="text" value={lpData.bg || ''} onChange={e => updateNestedField(['bg'], e.target.value)} className="border rounded-lg px-3 flex-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'copy' && (
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold mb-4">Argumentos de Venda (Copywriting)</h2>

                            <div className="space-y-4">
                                <h3 className="font-bold text-rose-600">Seção Primária (A Dor)</h3>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Headline (Impacto)</label>
                                    <input type="text" value={lpData?.landingPage?.problem?.headline || ''} onChange={e => updateNestedField(['landingPage', 'problem', 'headline'], e.target.value)} className="w-full border p-2 rounded-lg" placeholder="Ex: Cansada da pele opaca e sem vida?" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Descrição</label>
                                    <textarea value={lpData?.landingPage?.problem?.description || ''} onChange={e => updateNestedField(['landingPage', 'problem', 'description'], e.target.value)} className="w-full border p-2 rounded-lg" rows="3" placeholder="Aprofunde a dor do cliente..."></textarea>
                                </div>
                            </div>

                            <hr className="my-6" />

                            <div className="space-y-4">
                                <h3 className="font-bold text-emerald-600">A Solução (Seu Produto)</h3>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Headline da Solução</label>
                                    <input type="text" value={lpData?.landingPage?.solution?.headline || ''} onChange={e => updateNestedField(['landingPage', 'solution', 'headline'], e.target.value)} className="w-full border p-2 rounded-lg" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-4">* No futuro é possível adicionar editores dinâmicos de caixas para múltiplos benefícios aqui.</p>
                        </div>
                    )}

                    {activeTab === 'assets' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Mídia da Oferta</h2>
                            <p className="text-sm text-gray-500">Cole as URLs das imagens de estilo de vida, ciência ou ingredientes que rolam pelo site.</p>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Textura (Produto Aberto)</label>
                                <input type="url" value={lpData?.marketing?.texture || ''} onChange={e => updateNestedField(['marketing', 'texture'], e.target.value)} className="w-full border p-3 rounded-xl" placeholder="https://" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Lifestyle (Uso em pessoas reais)</label>
                                <input type="url" value={lpData?.marketing?.lifestyle || ''} onChange={e => updateNestedField(['marketing', 'lifestyle'], e.target.value)} className="w-full border p-3 rounded-xl" placeholder="https://" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'upsell' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Cross-Sell e Estratégia de Receita</h2>
                            <p className="text-sm text-gray-500">Digite os IDs Internos dos produtos recomendados (ex: 1, 15, 24). Esses são os produtos que você indica que apareçam juntos na área "Você Também Pode Gostar".</p>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <label className="block text-sm font-bold text-gray-700 mb-2">IDs de Produtos Recomendados separados por vírgula</label>
                                <input
                                    type="text"
                                    value={recommendedIds.join(', ')}
                                    onChange={e => {
                                        const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                                        setRecommendedIds(values);
                                    }}
                                    className="w-full border p-3 rounded-lg font-mono text-xl"
                                    placeholder="2, 5, 12..."
                                />
                                <p className="text-xs text-gray-400 mt-2">Irá exibir as miniaturas desses produtos logo abaixo das resenhas no site.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
