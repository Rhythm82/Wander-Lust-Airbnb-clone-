import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import validateLists from "../middlewares/validateList.js";
import { isLoggedIn } from "../middlewares/isAuth.js";
import { isAuthorised } from "../middlewares/authorised.js";
//controller
import * as listing from "../controllers/listings.js";

//image acept from frontent
import multer from "multer";

//cloud storage
import { storage } from "../cloudinaryConfig.js"; // use correct path
//image store and show handel
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  // Get all Hotels
  .get(wrapAsync(listing.index))

  //create new
  .post(
    isLoggedIn,
    upload.single("regDetails[image]"),
    validateLists,
    wrapAsync(listing.createNewHotel)
  );

// Register your hotel
router.get("/create", isLoggedIn, listing.renderNewForm);

//search
router.get("/search",isLoggedIn, wrapAsync(listing.Search));

router
  .route("/:id")
  //show hotels page
  .get(wrapAsync(listing.showHotels))
  //update hotel data
  .patch(
    isLoggedIn,
    isAuthorised,
    upload.single("regDetails[image]"),
    validateLists,
    wrapAsync(listing.update)
  )

  //delete listings
  .delete(isLoggedIn, isAuthorised, wrapAsync(listing.deleteHotel));

//edit
router.get("/:id/edit", isLoggedIn, isAuthorised, wrapAsync(listing.editForm));

//Booking
router.post("/:id/reserve",isLoggedIn,wrapAsync(listing.reserve))
router.post("/:id/confirm", isLoggedIn, wrapAsync(listing.confirm));

//show all bookings
router.get("/:id/bookings",isLoggedIn,isAuthorised,wrapAsync(listing.ownerBookings))


router.get("/category/:cat", wrapAsync(listing.filterByCategory));



export default router;

