import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandlerMiddleware.js";

// @DESC add  order items
// POST api/orders
// @ACCESS Auth usser
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
});

// @DESC get my orders
// GET api/orders/myorders
// @ACCESS Auth usser
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});

// @DESC get order by id
// GET api/orders/:id
// @ACCESS Auth usser
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error(`there is no order with id ${id} `);
  }
});

// @DESC update order to paid
// Put api/orders/:id
// @ACCESS Auth usser
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.status(200).json("update order to paid");
});

// @DESC update order to delivered
// Put api/orders/:id/deliver
// @ACCESS Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.status(200).json("update order to deliver");
});

// @DESC update order to delivered
// Get api/orders/:id/deliver
// @ACCESS Admin
export const getOrders = asyncHandler(async (req, res) => {
  res.status(200).json("get all orders");
});
