const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("./config/connectDB")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
const PORT = process.env.PORT || 3001

app.use("/users", require("./routes/users.js"))
app.use("/drivers", require("./routes/drivers.js"))
app.use("/request", require("./routes/request.js"))

process.on("SIGINT", async () => {
  mongoose.connection
    .close()
    .then((res) => {
      process.exit(0)
    })
    .catch((err) => {
      process.exit(0)
    })
})

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
})
