const router = require("express").Router()
const {
  handleRegister,
  handleLogin,
  handleLogout,
} = require("../controller/usersController.js")

router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/logout", handleLogout)

module.exports = router
