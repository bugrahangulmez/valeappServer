const router = require("express").Router()
const {
  createRequest,
  cancelRequest,
  acceptRequest,
  showRequests,
  rejectRequest,
  showDriverRequests,
  showUserRequests,
} = require("../controller/requestController")

router.post("/create", createRequest)
router.delete("/cancel", cancelRequest)
router.post("/accept", acceptRequest)
router.post("/list", showRequests)
router.post("/reject", rejectRequest)
router.post("/driverrequests", showDriverRequests)
router.post("/userrequests", showUserRequests)

module.exports = router
