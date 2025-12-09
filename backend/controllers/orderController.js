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
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;

  // Count all orders for this user
  const totalOrders = await Order.countDocuments({ user: req.user._id });

  // Fetch only current page
  const orders = await Order.find({ user: req.user._id })
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 });

  return res.status(200).json({
    totalPages: Math.ceil(totalOrders / limit),
    currentPage: page,
    totalOrders,
    orders,
  });
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
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(
    id,
    { isDelivered: true },
    {
      new: true,
    }
  );
  console.log("order", order);
  res.status(200).json(order);
});

// @DESC update order to delivered
// Get api/orders/:id/deliver
// @ACCESS Admin
export const getOrders = asyncHandler(async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  const orders = await Order.find({})
    .populate("user", "name email")
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 });

  const count = await Order.countDocuments();
  return res.status(200).json({
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    orders,
  });
});
