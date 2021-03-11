import express from 'express';
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProduct,
	updateProduct,
	createProduct,
	createReview,
	getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top-products', getTopProducts);
router
.route('/:id')
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createReview);
export default router;
