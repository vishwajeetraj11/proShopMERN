import express from "express"
const router = express.Router();
import {addOrderItem, getOrderById, updateOrderToPaid, getAllUserOrders, getAllOrders, updateOrderDelivered} from "../controllers/orderController.js"
import {protect, admin} from "../middleware/authMiddleware.js"
 
router.route('/').post(protect, addOrderItem).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getAllUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderDelivered)


export default router;
