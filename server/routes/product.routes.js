import express from 'express';
import { getProducts, getProductById, updateProduct, importFromDropea, getDropeaCatalog } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/dropea-catalog', getDropeaCatalog);
router.get('/:id', getProductById);
router.post('/import', importFromDropea);
router.put('/:id', updateProduct);

export default router;
