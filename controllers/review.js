import Listing from "../model/listing.js";
import Review from "../model/review.js";

export const postReview = async (req, res) => {
  const hotel = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  hotel.reviews.push(newReview);

  await newReview.save();
  await hotel.save();
  req.flash("success", "New review is added successfully");
  res.redirect(`/list/${req.params.id}`);
};

export const allReview = async (req, res) => {
  const { id } = req.params;
  const hotel = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!hotel) {
    req.flash("error", "Hotel is not present");
    return res.redirect("/list");
  }
  res.render("listings/allReview.ejs", { data: hotel });
};

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/list/${id}`);
};
