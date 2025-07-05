import Listing from "../model/listing.js";
import Review from "../model/review.js";

export const isAuthorised = async (req, res, next) => {
  let { id } = req.params;
  let data = await Listing.findById(id);
  if (!data.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you shoud be the owner of this listings");
    return res.redirect(`/list/${id}`);
  }
  next();
};

export const isReviewAuthor = async (req, res, next) => {
  let {id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser)) {
    req.flash("error", "You ar not allow to delete this review");
    return res.redirect(`/list/${id}`);
  }
};
