import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-mock-key-for-local-dev', // Fallback for local
});

export const generateSEOCopy = async (pain, city, product = 'Tratamento Especializado') => {
    const prompt = `Reescreva um texto de vendas focado em conversão para ${product} focado em resolver ${pain} para clientes na cidade de ${city}, focando na praticidade de pagamento na entrega (Contra Entrega). Produza o resultado num formato JSON com as chaves: metaTitle, metaDescription, h1, bodyText. Seja extremamente persuasivo.`;

    try {
        // Para manter a demonstração rodando perfeitamente local sem gastar tokens reais:
        if (!process.env.OPENAI_API_KEY) {
            console.log(`[MOCK OPENAI] Gerando copy para: Dor=${pain}, Cidade=${city}`);
            return {
                metaTitle: `Tratamento para ${pain} em ${city} - Pague na Entrega`,
                metaDescription: `Sofre com ${pain}? Descubra o ${product} com entrega rápida em ${city}. Garantia de resultado e pagamento só quando receber o produto!`,
                h1: `A Solução Definitiva para ${pain} Direto em ${city}`,
                bodyText: `<p>Se você mora em ${city} e está cansada(o) de lidar com <strong>${pain}</strong>, chegou a hora de transformar sua pele.</p><p>O ${product} foi desenvolvido com tecnologia avançada para combater exatamente esse problema.</p><br/><h3>Vantagem Exclusiva</h3><p>Peça agora e <strong>só pague quando a encomenda chegar na sua porta</strong>. Zero risco, 100% de satisfação!</p>`
            };
        }

        // Código real da API da OpenAI:
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });

        // Parse the JSON output from GPT
        const res = JSON.parse(response.choices[0].message.content);
        return res;

    } catch (error) {
        console.error('Erro na chamada OpenAI:', error.message);
        throw error;
    }
};
