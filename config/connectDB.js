const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.DATABASE_URL)
    console.log(`Connected to MongDB: ${res.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
