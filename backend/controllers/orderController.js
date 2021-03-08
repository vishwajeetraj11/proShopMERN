import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

// @description    Create new order
// @route          POST /api/orders
// @access         Private
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
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

// @description    Get order by ID
// @route          Get /api/orders/:id
// @access         Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @description    Update order to paid
// @route          Get /api/orders/:id/pay
// @access         Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    // comes from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @description    Get logged in user orders
// @route          Get /api/orders/myorders
// @access         Private
const getAllUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})


// @description    Get logged in user orders
// @route          Get /api/orders/orders
// @access         Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @description    Update order delivered
// @route          Get /api/orders/:id/deliver
// @access         Private/Admin
const updateOrderDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export { addOrderItem, getOrderById, updateOrderToPaid, getAllUserOrders, getAllOrders, updateOrderDelivered }
