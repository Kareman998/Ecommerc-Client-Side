const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);
require('./DB')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})


const User = require('./models/User');
const UserRoutes = require('./routes/userRoutes');
const ProductRoutes = require('./routes/productRoutes');
const OrderRoutes = require('./routes/orderRoutes');
const ImageRoutes = require('./routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users',UserRoutes);
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);
app.use('/images', ImageRoutes);


app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})


server.listen(8080, ()=> {
  console.log('server running at port', 8080)
})

app.set('socketio', io);
