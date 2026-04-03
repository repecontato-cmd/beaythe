import express from 'express';
import { getProducts, updateProduct, importFromDropea, getDropeaCatalog } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/dropea-catalog', getDropeaCatalog);
router.post('/import', importFromDropea);
router.put('/:id', updateProduct);

export default router;
