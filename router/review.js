import express from "express";
import { isLoggedIn } from "../middlewares/isAuth.js";
import validateReview from "../middlewares/validateReview.js";
import wrapAsync from "../utils/wrapAsync.js";
import { isReviewAuthor } from "../middlewares/authorised.js";
//controller
import * as review from "../controllers/review.js";

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, wrapAsync(review.postReview));

//show more reviews
router.get("/all", wrapAsync(review.allReview));

//delete  reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(review.deleteReview)
);

export default router;
