import express from "express"
const router = express.Router();
import {addOrderItem} from "../controllers/orderController.js"
import {protect} from "../middleware/authMiddleware.js"
 
router.route('/').post(protect, addOrderItem)


export default router;