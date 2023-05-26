const Order = require('../models/Order');
const User = require('../models/User');


 

// // get all orders;
exports.getallOrder=async(req, res)=> {
    try {
      const orders = await Order.find().populate('owner', ['email', 'name']);
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json(e.message)
    }
  }
//shipping order
exports.shippingOrder=async(req, res)=> {
    const io = req.app.get('socketio');
    const {ownerId} = req.body;
    const {id} = req.params;
    try {
      const user = await User.findById(ownerId);
      await Order.findByIdAndUpdate(id, {status: 'shipped'});
      const orders = await Order.find().populate('owner', ['email', 'name']);
      const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
      io.sockets.emit("notification", notification, ownerId);
      user.notifications.push(notification);
      await user.save();
      res.status(200).json(orders)
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

