const mongoose = require("mongoose")
const { Schema } = mongoose

const requestSchema = new Schema(
  {
    currentLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      latitudeDelta: {
        type: Number,
        required: true,
      },
      longitudeDelta: {
        type: Number,
        required: true,
      },
    },
    targetLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      latitudeDelta: {
        type: Number,
        required: true,
      },
      longitudeDelta: {
        type: Number,
        required: true,
      },
    },
    distance: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    driver: {
      id: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Request", requestSchema)
