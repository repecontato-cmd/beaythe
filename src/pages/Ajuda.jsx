import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, CreditCard, Truck, User, ChevronDown, HelpCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Ajuda() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('home');
    const [openFaq, setOpenFaq] = useState(null);

    // Sync with home page FAQs
    const homeFaqs = t('faq_section.items') || [];

    const faqData = {
        "most_accessed": [
            { q: "COMO RASTREIO MEU PEDIDO?", a: "Assim que o pedido for despachado, você receberá um código de rastreio por e-mail para acompanhar a entrega em tempo real." },
            { q: "QUAIS AS FORMAS DE PAGAMENTO ACEITAS?", a: "Aceitamos MB WAY, Cartão de Crédito, Apple Pay e Google Pay. Todas as transações são 100% seguras." },
            { q: "POSSO DEVOLVER UM PRODUTO QUE JÁ FOI ABERTO?", a: "Por questões de higiene e segurança, apenas aceitamos devoluções de produtos com o lacre original intacto." },
            { q: "QUAL O PRAZO DE ENTREGA PARA PORTUGAL E ESPANHA?", a: "O prazo médio é de 2 a 5 dias úteis para o continente. Para ilhas, pode levar até 10 dias úteis." },
            { q: "ESQUECI MINHA SENHA, COMO RECUPERAR?", a: "Clique em 'Esqueci minha senha' na tela de login e siga as instruções enviadas para o seu e-mail." }
        ],
        "products": Array.isArray(homeFaqs) ? homeFaqs.map(f => ({ q: f.question, a: f.answer })) : [],
        "refunds": [
            { q: "COMO SOLICITAR UMA TROCA OU DEVOLUÇÃO?", a: "Para devolver um produto, ele deve estar lacrado e sem sinais de uso. Entre em contato com nossa equipe via e-mail (contato@beauthe.com) em até 7 dias corridos após o recebimento informando o número do pedido." },
            { q: "QUAL O PRAZO PARA A TROCA?", a: "Você tem 7 dias corridos para devolução por arrependimento e 30 dias para produtos com defeito de fabricação. O produto deve estar na embalagem original e inviolada." },
            { q: "QUEM PAGA O FRETE DA DEVOLUÇÃO?", a: "A primeira troca por defeito ou erro de envio é por nossa conta. Em casos de arrependimento, o custo do frete de retorno é de responsabilidade do cliente." },
            { q: "COMO É FEITO O REEMBOLSO?", a: "O reembolso é feito pelo mesmo método de pagamento utilizado na compra. Para cartões de crédito, o valor pode aparecer em até 2 faturas após o processamento da devolução em nosso centro." },
            { q: "QUAL O PASSO A PASSO PARA DEVOLUÇÃO?", a: "1. Informe o pedido via e-mail ou chat. 2. Embale o produto na caixa original com o lacre intacto. 3. Leve ao ponto de coleta informado. 4. Após o recebimento e análise (até 5 dias úteis), processamos o seu reembolso ou troca." }
        ],
        "deliveries": [
            { q: "QUAL O VALOR DO FRETE?", a: "Oferecemos frete grátis para compras acima de 50€ em Portugal e Espanha Peninsular. Para valores inferiores, a taxa é calculada automaticamente no checkout." },
            { q: "A BEAUTHÉ ENTREGA EM TODA A EUROPA?", a: "No momento, focamos nossa operação logística em Portugal (Continente e Ilhas) e Espanha, garantindo prazos de entrega reduzidos." },
            { q: "COMO RASTREIO MEU PEDIDO?", a: "Assim que o pedido for despachado, você receberá um código de rastreio por e-mail e poderá acompanhar diretamente no site da transportadora (CTT ou Correos)." },
            { q: "QUAL O PRAZO MÉDIO DE ENTREGA?", a: "O prazo médio é de 2 a 5 dias úteis para Portugal Continental e Espanha. Para as ilhas, o prazo pode se estender até 10 dias úteis." }
        ],
        "pagamentos": [
            { q: "QUAIS FORMAS DE PAGAMENTO SÃO ACEITAS?", a: "Aceitamos MB WAY (Portugal), Cartão de Crédito (Visa, Mastercard), Apple Pay e Google Pay. Todas as transações são seguras e criptografadas." },
            { q: "QUEM PROCESSA OS PAGAMENTOS DO SITE?", a: "Nossos pagamentos são processados via Stripe, uma das plataformas mais seguras e confiáveis do mundo." },
            { q: "MEU PAGAMENTO PRECISA DE APROVAÇÃO?", a: "Pagamentos via MB WAY e Apple Pay são aprovados instantaneamente. Cartões de crédito podem passar por uma breve análise de segurança de até alguns minutos." }
        ],
        "account": [
            { q: "ESQUECI MINHA SENHA, O QUE FAZER?", a: "Na tela de login, clique em 'Esqueci minha senha'. Enviaremos um link de recuperação para o e-mail cadastrado em instantes." },
            { q: "COMO POSSO ALTERAR MEUS DADOS?", a: "Acesse a seção 'Meu Perfil' após fazer o login. Lá você pode editar seu nome, e-mail de contato e gerenciar seus endereços de entrega salvos." },
            { q: "MEUS DADOS ESTÃO SEGUROS?", a: "Sim! Seguimos rigorosamente a RGPD (Regulamento Geral sobre a Proteção de Dados) e utilizamos criptografia SSL em todo o site para proteger sua privacidade." }
        ]
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const categories = [
        { id: 'products', title: "Eficácia e Rituais", icon: Sparkles, color: 'bg-purple-50 text-purple-500' },
        { id: 'refunds', title: t('help.categories.refunds'), icon: RotateCcw, color: 'bg-rose-50 text-rose-500' },
        { id: 'pagamentos', title: t('help.categories.payments'), icon: CreditCard, color: 'bg-blue-50 text-blue-500' },
        { id: 'deliveries', title: t('help.categories.deliveries'), icon: Truck, color: 'bg-amber-50 text-amber-500' },
        { id: 'account', title: t('help.categories.account'), icon: User, color: 'bg-emerald-50 text-emerald-500' },
    ];

    const getAllFaqs = () => {
        const all = [];
        Object.values(faqData).forEach(categoryFaqs => {
            all.push(...categoryFaqs);
        });
        return all.filter((v, i, a) => a.findIndex(t => t.q === v.q) === i);
    };

    const currentFaqs = searchTerm
        ? getAllFaqs().filter(f =>
            f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : (activeSection === 'home' ? faqData.most_accessed : (faqData[activeSection] || []));

    return (
        <div className="min-h-screen bg-[#FCFAF8] pb-24 text-[#2C2826]">
            {/* Hero Section */}
            <div className="bg-white border-b border-[#F1EBE6] pt-12 pb-16">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black mb-8 tracking-tighter"
                    >
                        {activeSection === 'home' ? t('help.title') : (categories.find(c => c.id === activeSection)?.title || activeSection)}
                    </motion.h1>

                    <div className="max-w-2xl mx-auto relative px-4 uppercase font-bold">
                        <input
                            type="text"
                            placeholder={t('help.search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#FCFAF8] border border-[#F1EBE6] rounded-full py-4 px-8 pr-14 focus:outline-none focus:ring-2 focus:ring-[#C4A49A]/20 focus:border-[#C4A49A] transition-all shadow-sm text-sm tracking-widest"
                        />
                        <button className="absolute right-8 top-1/2 -translate-y-1/2 text-[#8A7369]">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 uppercase">
                {activeSection === 'home' && !searchTerm ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    whileHover={{ y: -5, shadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                                    onClick={() => { setActiveSection(cat.id); setOpenFaq(null); }}
                                    className="bg-white border border-[#F1EBE6] rounded-3xl p-8 flex flex-col items-center text-center transition-all group h-full"
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <cat.icon size={32} />
                                    </div>
                                    <h3 className="text-[13px] font-black tracking-tight leading-tight">{cat.title}</h3>
                                </motion.button>
                            ))}
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-xl font-black mb-8 border-b border-[#F1EBE6] pb-4 tracking-tighter">{t('help.most_accessed')}</h2>
                            <div className="space-y-4">
                                {currentFaqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white border border-[#F1EBE6] rounded-2xl overflow-hidden">
                                        <button
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FCFAF8] transition-colors"
                                        >
                                            <span className="text-[13px] font-bold pr-8 uppercase">{faq.q}</span>
                                            <ChevronDown size={18} className={`text-[#C4A49A] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence mode="wait">
                                            {openFaq === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <div className="px-6 pb-6 text-[14px] text-[#5C534F] font-light leading-relaxed normal-case">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <div className="inline-flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-[#EBE1DA] flex items-center justify-center text-[#8A7369] mb-6 shadow-glow">
                                    <HelpCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">¿No encuentras lo que buscas?</h3>
                                <p className="text-[#8A7369] mb-8 font-light lowercase">Estamos aquí para ayudarte 24/7 via chat o e-mail.</p>
                                <button className="cursor-pointer bg-[#2C2826] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95">
                                    {t('help.contact_us')}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        <button
                            onClick={() => { setActiveSection('home'); setOpenFaq(null); setSearchTerm(''); }}
                            className="flex items-center gap-2 text-[#8A7369] hover:text-[#2C2826] mb-8 transition-colors group uppercase font-bold text-sm tracking-wider"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Centro de Ajuda
                        </button>

                        <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">
                            {searchTerm ? `Resultados para "${searchTerm}"` : (categories.find(c => c.id === activeSection)?.title || activeSection)}
                        </h2>

                        <div className="space-y-4">
                            {currentFaqs.map((faq, idx) => (
                                <div key={idx} className="bg-white border border-[#F1EBE6] rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FCFAF8] transition-colors"
                                    >
                                        <span className="text-[13px] font-bold pr-8 uppercase">{faq.q}</span>
                                        <ChevronDown size={18} className={`text-[#C4A49A] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence mode="wait">
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                            >
                                                <div className="px-6 pb-6 text-[14px] text-[#5C534F] font-light leading-relaxed normal-case">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            {currentFaqs.length === 0 && (
                                <div className="text-center py-20">
                                    <HelpCircle size={48} className="mx-auto text-[#EBE1DA] mb-4" />
                                    <p className="text-[#A69B97] italic lowercase text-lg">Nenhum resultado encontrado para "{searchTerm}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
