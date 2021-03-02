const express = require("express");

const { getUser, getUsers, registerUser, updateUser } = require("../controller/user-controller");
const { login } = require("../controller/authentication-controller");
const { isAuthenticated } = require("../middleware/is-authenticated");

const router = express.Router();

//login

router.post("/login", login);
router.post("/user", registerUser);

//auth middleware

router.use(isAuthenticated);

//user

router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.put("/user", updateUser);


module.exports = router;
