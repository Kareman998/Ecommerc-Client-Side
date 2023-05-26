const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');

const orders=require("../Controllers/Order")






//creating  order

router.post('/', async(req, res)=> {
  const io = req.app.get('socketio');
  const {userId, cart, country, address} = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({owner: user._id, products: cart, country, address});
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart =  {total: 0, count: 0};
    user.orders.push(order);
    const notification = {status: 'unread', message: `New order from ${user.name}`, time: new Date()};
    io.sockets.emit('new-order', notification);
    user.markModified('orders');
    await user.save();
    res.status(200).json(user)

  } catch (e) {
    res.status(400).json(e.message)
  }
})
// get all orders;
router.get("/",orders.getallOrder);
// //shipping order
router.patch("/:id/mark-shipped",orders.shippingOrder);

module.exports = router;
