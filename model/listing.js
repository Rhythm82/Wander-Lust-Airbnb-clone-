import mongoose, { Schema } from "mongoose";
import Review from "./review.js";
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: [1, "Title is to short.."],
    maxLength: [200, "Title is to long.."],
  },
  description: {
    type: String,
    require: true,
    maxLength: [500, "Title is to long to long.."],
  },
  image: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  price: {
    type: Number,
    require: true,
    min: 1,
    max: 2000000,
  },
  location: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  amenities: [String],

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  
   category: {
    type: String,
    enum: [
      "Trending", "Rooms", "Amazing Views", "Beach",
      "Pool", "Amazing Cities", "Castles", "Camping",
      "Forest", "Caravan", "Arctic"
    ],
    required: true
  }

});

listSchema.post("findOneAndDelete", async (hotel) => {
  if (hotel) {
    await Review.deleteMany({ _id: { $in: hotel.reviews } });
  } else {
    console.log("No reviews");
  }
});

const Listing = mongoose.model("Listing", listSchema);
export default Listing;
