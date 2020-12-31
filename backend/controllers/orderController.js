import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

// @description    Create new order
// @route          POST /api/orders
// @access         Public
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItem,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
  } else {
      const order = new Order ({
        user: req.user._id,
        orderItem,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
  }

})


export { addOrderItem }
