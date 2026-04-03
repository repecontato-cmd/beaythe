import prisma from '../db.js';
import { addSEOJobToQueue, seoQueue } from '../jobs/seoQueue.js';

export const getUrls = async (req, res) => {
    try {
        const urls = await prisma.generatedPage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const syncSEO = async (req, res) => {
    const { cities, pains } = req.body;
    if (!cities || !pains) return res.status(400).json({ error: 'Forneça array de cities e pains.' });

    try {
        let newJobs = 0;

        // Cross data
        for (const city of cities) {
            for (const pain of pains) {
                const citySlug = city.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const painSlug = pain.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const slug = `/tratamento/${painSlug}-em-${citySlug}`;

                // Create or find pending record
                const record = await prisma.generatedPage.upsert({
                    where: { slug },
                    update: {}, // Already exists, do not overwrite if Published or Generated unless forced
                    create: {
                        slug,
                        city,
                        pain,
                        status_indexacao: 'Pending'
                    }
                });

                // Add to queue if pending
                if (record.status_indexacao === 'Pending') {
                    addSEOJobToQueue(record.id, pain, city);
                    newJobs++;
                }
            }
        }

        res.json({
            success: true,
            message: `${newJobs} novas páginas enviadas para a Fila de Background.`,
            queueStatus: `Jobs pendentes: ${seoQueue.size}`
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
