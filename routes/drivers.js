const router = require("express").Router()
const {
  handleLogin,
  handleLogout,
  handleRegister,
} = require("../controller/driversController.js")

router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/logout", handleLogout)

module.exports = router
