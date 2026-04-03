import PQueue from 'p-queue';
import { generateSEOCopy } from '../services/openai.service.js';
import prisma from '../db.js';

// Fila assíncrona executando as tarefas silenciadas no background.
// Concurrency 2 processará 2 promessas por vez para respeitar eventuais Rate Limits de API externa.
export const seoQueue = new PQueue({ concurrency: 2 });

seoQueue.on('active', () => {
    console.log(`[Queue] Processando. Restantes: ${seoQueue.size}`);
});

seoQueue.on('idle', () => {
    console.log(`[Queue] Todas as páginas geradas com sucesso.`);
});

export const addSEOJobToQueue = async (pageId, pain, city) => {
    return seoQueue.add(async () => {
        try {
            // 1. Chama a IA
            const aiContent = await generateSEOCopy(pain, city);

            // 2. Atualiza o Prisma status para Generated
            await prisma.generatedPage.update({
                where: { id: pageId },
                data: {
                    status_indexacao: 'Generated',
                    meta_title: aiContent.metaTitle,
                    meta_description: aiContent.metaDescription,
                    h1_customizado: aiContent.h1,
                    conteudo_spin: aiContent.bodyText,
                }
            });
            console.log(`✅ Página gerada e persistida: ${pain} em ${city}`);
        } catch (err) {
            console.error(`❌ Erro gerando página para ${pain} em ${city}:`, err.message);
        }
    });
};
