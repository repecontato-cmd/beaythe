import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.DROPEA_API_KEY;
const BASE_URL = process.env.DROPEA_API_URL || 'https://api.dropea.com/graphql/dropshippers';

export const fetchProductFromDropea = async (dropeaId) => {
  if (!API_KEY) {
    return { success: false, error: 'DROPEA_API_KEY ausente no .env do servidor.' };
  }

  // A API de Dropshippers exige consulta na propriedade products usando a chave-valor x-api-key e id como array de ints [Int]
  const query = `
    query getProduct($id: [Int]) {
      products(id: $id, limit: 1) {
        data {
          id
          name
          category
          description
          cost_price
          pvpr
          stock_available
          image
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        query,
        variables: { id: [parseInt(dropeaId, 10)] }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      }
    );

    if (response.data.errors) {
      console.error('Dropea GraphQL Errors:', response.data.errors);
      return { success: false, error: response.data.errors[0].message };
    }

    const items = response.data.data.products?.data || [];

    if (items.length === 0) {
      return { success: false, error: 'Produto não encontrado na base de dados Dropea com este ID.' };
    }

    const prd = items[0];

    return {
      success: true,
      data: {
        dropea_id: dropeaId.toString(),
        name: prd.name || `Produto Dropea ID ${dropeaId}`,
        price: parseFloat(prd.cost_price || prd.pvpr) || 0,
        stock: parseInt(prd.stock_available) || 0,
        description: prd.description || '',
        image_url: prd.image || '',
        tags: '[]',
        upsell_kits: '[]'
      }
    };
  } catch (error) {
    console.error('Erro de Rede na integração Dropea:', error.response?.data || error.message);
    return { success: false, error: 'Falha de conexão com a infraestrutura Dropea.' };
  }
};

export const fetchDropeaCatalog = async (limit = 50) => {
  if (!API_KEY) {
    return { success: false, error: 'DROPEA_API_KEY ausente no .env do servidor.' };
  }

  const query = `
    query getCatalog($limit: Int) {
      products(limit: $limit) {
        data {
          id
          name
          category
          cost_price
          pvpr
          stock_available
          image
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      BASE_URL,
      { query, variables: { limit } },
      { headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY } }
    );

    if (response.data.errors) {
      return { success: false, error: response.data.errors[0].message };
    }

    const items = response.data.data.products?.data || [];
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: 'Falha na busca do catálogo Dropea.' };
  }
};
