import prisma from '../db.js';

// Busca a configuração global (ID = 1). Se não existir, cria a padrão.
export const getSettings = async (req, res) => {
    try {
        let settings = await prisma.storeSettings.findUnique({
            where: { id: 1 },
        });

        if (!settings) {
            settings = await prisma.storeSettings.create({
                data: {
                    id: 1,
                    profit_margin_percent: 30.0,
                    fixed_shipping_cost: 7.00
                }
            });
        }

        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualiza a configuração.
export const updateSettings = async (req, res) => {
    const { profit_margin_percent, fixed_shipping_cost } = req.body;

    try {
        const updated = await prisma.storeSettings.upsert({
            where: { id: 1 },
            update: {
                profit_margin_percent: parseFloat(profit_margin_percent),
                fixed_shipping_cost: parseFloat(fixed_shipping_cost)
            },
            create: {
                id: 1,
                profit_margin_percent: parseFloat(profit_margin_percent),
                fixed_shipping_cost: parseFloat(fixed_shipping_cost)
            }
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
