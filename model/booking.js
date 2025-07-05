import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  phone: String,
  rooms: Number,
  guests: Number,
  checkIn: Date,
  checkOut: Date,
  totalPrice: Number,
  bookingId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking=mongoose.model("Booking",bookingSchema);
export default Booking