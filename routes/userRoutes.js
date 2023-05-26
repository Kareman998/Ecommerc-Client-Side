const users = require("../Controllers/User");

const router = require("express").Router();
// signup
router.post("/signup", users.Signup);
// login
router.post("/login", users.Login);
// get users;
router.get("/", users.getalluser);
// get user orders
router.get("/:id/orders", users.getbyid);
// update user notifcations
router.post("/:id/updateNotifications", users.updatenotifcation);



module.exports = router;

