import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#F4EFEA] pt-20 pb-12 mt-auto border-t border-[#EAE3DE]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

                {/* Coluna 1 - Logo & Redes */}
                <div className="lg:col-span-1 flex flex-col items-start">
                    <h1 className="text-3xl md:text-4xl font-black text-[#2C2826] tracking-tighter mb-6 leading-none">BEAUTHÉ</h1>
                    <div className="flex items-center gap-5">
                        <a href="#" className="text-[#8A7369] hover:text-[#C4A49A] transition-colors"><Instagram size={24} /></a>
                        <a href="mailto:contato@beauthe.com" className="text-[#8A7369] hover:text-[#C4A49A] transition-colors"><Mail size={24} /></a>
                    </div>
                </div>

                {/* Coluna 2 - Categorias */}
                <div>
                    <h3 className="text-[14px] font-bold text-[#2C2826] tracking-widest mb-6 uppercase">CATEGORÍAS</h3>
                    <ul className="space-y-4 text-[13px] text-[#5C534F] font-light">
                        <li><Link to="/categoria/rostro" className="hover:text-[#C4A49A] transition-colors">{t('nav.rostro')}</Link></li>
                        <li><Link to="/categoria/maquillaje" className="hover:text-[#C4A49A] transition-colors">{t('nav.maquillaje')}</Link></li>
                        <li><Link to="/categoria/cuerpo" className="hover:text-[#C4A49A] transition-colors">{t('nav.cuerpo')}</Link></li>
                        <li><Link to="/categoria/cabello" className="hover:text-[#C4A49A] transition-colors">{t('nav.cabello')}</Link></li>
                        <li><Link to="/categoria/exclusivos" className="hover:text-[#C4A49A] transition-colors">{t('nav.exclusivos')}</Link></li>
                    </ul>
                </div>

                {/* Coluna 3 - Atendimento */}
                <div>
                    <h3 className="text-[14px] font-bold text-[#2C2826] tracking-widest mb-6 uppercase">PRECISA DE AJUDA?</h3>
                    <ul className="space-y-4 text-[13px] text-[#5C534F] font-light">
                        <li><Link to="/ajuda" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A49A] transition-colors">Fala com a gente</Link></li>
                        <li><Link to="/faq" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A49A] transition-colors">Perguntas Frequentes (FAQ)</Link></li>
                        <li><Link to="/ajuda" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A49A] transition-colors">Central de Atendimento</Link></li>
                    </ul>
                </div>

                {/* Coluna 4 - Compra */}
                <div>
                    <h3 className="text-[14px] font-bold text-[#2C2826] tracking-widest mb-6 uppercase">ACOMPANHAR COMPRA</h3>
                    <ul className="space-y-4 text-[13px] text-[#5C534F] font-light">
                        <li><Link to="/profile" className="hover:text-[#C4A49A] transition-colors">Minha Conta</Link></li>
                        <li><Link to="/profile?tab=orders" className="hover:text-[#C4A49A] transition-colors">Meus Pedidos</Link></li>
                        <li><Link to="/ajuda" className="hover:text-[#C4A49A] transition-colors">Trocas e Devoluções</Link></li>
                        <li><Link to="/profile?tab=track" className="hover:text-[#C4A49A] transition-colors">Rastrear Entrega</Link></li>
                    </ul>
                </div>

                {/* Coluna 5 - Institucional & Legal */}
                <div>
                    <h3 className="text-[14px] font-bold text-[#2C2826] tracking-widest mb-6 uppercase">INSTITUCIONAL</h3>
                    <ul className="space-y-4 text-[13px] text-[#5C534F] font-light">
                        <li><Link to="/historia" className="hover:text-[#C4A49A] transition-colors">Quem Somos</Link></li>
                        <li><Link to="/historia" className="hover:text-[#C4A49A] transition-colors">Termos e Condições (Dropshipping)</Link></li>
                        <li><Link to="/historia" className="hover:text-[#C4A49A] transition-colors">Política de Privacidade</Link></li>
                        <li><Link to="/historia" className="hover:text-[#C4A49A] transition-colors">Política de Pagamentos</Link></li>
                        <li><Link to="/historia" className="hover:text-[#C4A49A] transition-colors">Aviso Legal</Link></li>
                        <li><Link to="/admin-core-sys" className="hover:text-[#C4A49A] transition-colors font-semibold">Painel Admin</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#EAE3DE] pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                <p className="text-[12px] text-[#8A7369]">&copy; 2026 BEAUTHÉ. Todos los derechos reservados. CNPJ Registrado.</p>
                <div className="flex gap-4 items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/MB_Way_Logo.svg" alt="MB WAY" className="h-[22px] opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3.5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                </div>
            </div>
        </footer>
    );
}
