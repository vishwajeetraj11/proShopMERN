import express from "express"
const router = express.Router();
import {addOrderItem, getOrderById, updateOrderToPaid, getAllUserOrders, getAllOrders} from "../controllers/orderController.js"
import {protect, admin} from "../middleware/authMiddleware.js"
 
router.route('/').post(protect, addOrderItem).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getAllUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router;
