import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  author:{
     type: Schema.Types.ObjectId,
     ref:"User",
  },
  comment: {
    type: String,
    minLength: [1, "To short comment.."],
    maxLength: [500, "To long Comment.."],
  },
  rating: {
    type: String,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
