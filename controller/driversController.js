const Request = require("../data/Request")
const bcrypt = require("bcrypt")
const Driver = require("../data/Driver")
const jwt = require("jsonwebtoken")

const handleRegister = async (req, res) => {
  let name = req.body.name
  let surname = req.body.surname
  let email = req.body.email
  let phone = req.body.phone
  let pwd = req.body.pwd

  const check = await Driver.findOne({ email })

  if (check) {
    res.json({ msg: `This email adress is taken by another driver` })
    return
  }

  const hashedPwd = await bcrypt.hash(pwd, 10)

  const result = new Driver({
    name,
    surname,
    email,
    phone,
    pwd: hashedPwd,
  })

  result.save()

  res.json({ result })
}

const handleLogin = async (req, res) => {
  const email = req.body.email
  const pwd = req.body.pwd
  const phone = req.body.phone
  let foundUser

  if (email) {
    foundUser = await Driver.findOne({ email })
  } else {
    foundUser = await Driver.findOne({ phone })
  }

  if (foundUser) {
    const isPasswordTrue = await bcrypt.compare(pwd, foundUser.pwd)
    if (isPasswordTrue) {
      const accessToken = jwt.sign(
        {
          driverName: foundUser.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      )
      res.json({
        msg: "Logged in succesfully",
        accessToken,
        id: foundUser._id,
        phone: foundUser.phone,
      })
    } else {
      res.json({ msg: "Your password is incorrect" })
    }
  } else {
    res.json({ msg: "Driver not found" })
  }
}

const handleLogout = async (req, res) => {
  res.json({ msg: "drivers logout ok" })
}

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
}
