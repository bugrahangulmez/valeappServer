const Request = require("../data/Request")
const User = require("../data/User")
const Driver = require("../data/Driver")
const jwt = require("jsonwebtoken")

const createRequest = async (req, res) => {
  let currentLocation = req.body.currentLocation
  let targetLocation = req.body.targetLocation
  let distance = req.body.distance
  let price = req.body.price
  let userId = req.body.userId
  let accessToken = req.body.accessToken

  const foundUser = await User.findOne({ _id: userId })

  if (foundUser) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ error: err })
        return
      }
      const result = new Request({
        currentLocation,
        targetLocation,
        distance,
        price,
        userId,
      })

      result.save()

      res.json({ id: result.id, data: decoded.userName })
    })
  }
}

const cancelRequest = async (req, res) => {
  let _id = req.body.id

  const result = await Request.deleteOne({ _id })

  res.json({ result: result.acknowledged })
}

const acceptRequest = async (req, res) => {
  let requestId = req.body.requestId
  let driverId = req.body.driverId
  let accessToken = req.body.accessToken

  const foundDriver = await Driver.findById(driverId)
  const foundRequest = await Request.findById(requestId)

  if (!foundDriver) {
    res.json({ msg: "driver not found" })
    return
  }
  if (!foundRequest) {
    res.json({ msg: "request not found" })
    return
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.json({ error: err })
      return
    }
    foundRequest.driver.id = foundDriver._id
    foundRequest.driver.phone = foundDriver.phone
    foundRequest.isAccepted = true
    foundRequest.save()
    res.json({
      msg: `Request is accepted by ${foundDriver.name}`,
      driverName: decoded.driverName,
    })
  })
}

const showRequests = async (req, res) => {
  let accessToken = req.body.accessToken

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        res.json({ error: err })
        return
      }
      const list = await Request.find({ isAccepted: false })
      if (list) {
        res.json({ list, decoded })
      } else {
        res.json({ msg: "could not found any request", decoded })
      }
    }
  )
}

const rejectRequest = async (req, res) => {
  let requestId = req.body.requestId
  let accessToken = req.body.accessToken

  const foundRequest = await Request.findById(requestId)
  if (!foundRequest) {
    res.json({ msg: "Request could not found" })
    return
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        res.json({ error: err })
        return
      }
      foundRequest.isAccepted = false
      foundRequest.driver.id = ""
      foundRequest.driver.phone = ""
      foundRequest.save()
      res.json({ msg: "request is rejected", foundRequest, decoded })
    }
  )
}

module.exports = {
  createRequest,
  cancelRequest,
  acceptRequest,
  showRequests,
  rejectRequest,
}
