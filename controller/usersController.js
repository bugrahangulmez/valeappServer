const bcrypt = require("bcrypt")
const User = require("../data/User")
const jwt = require("jsonwebtoken")

const handleRegister = async (req, res) => {
  try {
    let name = req.body.name
    let surname = req.body.surname
    let pwd = req.body.pwd
    let email = req.body.email
    let phone = req.body.phone

    let hashedPwd = await bcrypt.hash(pwd, 10)

    const check = await User.findOne({ email })
    if (check) {
      res.json({ msg: `This email adress is used by another user` })
      return
    }

    const result = new User({
      name,
      surname,
      pwd: hashedPwd,
      email,
      phone,
    })

    result.save()

    res.json({ msg: result._id })
  } catch (error) {
    throw new Error(error)
  }
}

const handleLogin = async (req, res) => {
  let email = req.body.email
  let pwd = req.body.pwd
  let phone = req.body.phone

  let foundedUser

  if (email) {
    foundedUser = await User.findOne({ email })
  } else {
    foundedUser = await User.findOne({ phone })
  }

  if (foundedUser) {
    const isPasswordTrue = await bcrypt.compare(pwd, foundedUser.pwd)

    if (isPasswordTrue) {
      const accessToken = jwt.sign(
        {
          userName: foundedUser.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      )
      res.json({ msg: "Logged in", accessToken, id: foundedUser._id })
    } else {
      res.json({ msg: "Your password is not correct" })
    }
  } else {
    res.json({ msg: "User not found" })
  }
}

const handleLogout = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email })
  if (foundUser) {
    res.json({ msg: "users logout ok" })
  } else {
    res.json({ msg: "User not found" })
  }
}

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
}
