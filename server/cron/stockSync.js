import cron from 'node-cron';
import prisma from '../db.js';
import { fetchProductFromDropea } from '../services/dropea.service.js';

// Roda todo dia à meia noite
cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Iniciando sincronização diária de estoque e preços (Dropea)...');

    try {
        const products = await prisma.product.findMany({
            where: { dropea_id: { not: null } }
        });

        for (const product of products) {
            try {
                const dropeaData = await fetchProductFromDropea(product.dropea_id);
                if (dropeaData.success) {
                    await prisma.product.update({
                        where: { id: product.id },
                        data: {
                            stock: dropeaData.data.stock,
                            price: dropeaData.data.price
                        }
                    });
                    console.log(`[CRON] Produto ${product.id} sincronizado com sucesso.`);
                }
            } catch (err) {
                console.error(`[CRON] Falha ao sincronizar produto ${product.id}:`, err.message);
            }
        }
    } catch (error) {
        console.error('[CRON] Erro fatal na rotina de sincronização:', error.message);
    }
});
