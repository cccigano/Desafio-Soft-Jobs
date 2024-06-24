const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController.js");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/usuarios", registerUser);
router.post("/login", loginUser);
router.get("/usuarios", authMiddleware, getUserProfile);

module.exports = router;
