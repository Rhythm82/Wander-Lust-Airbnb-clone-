import Listing from "../model/listing.js";
import Booking from "../model/booking.js";
import { geocoding, config } from "@maptiler/client";
import dotenv from "dotenv";
dotenv.config();

config.apiKey = process.env.MAPTILER_API_KEY;

export const index = async (req, res) => {
  const listOfData = await Listing.find({});
  res.render("listings/home.ejs", { listOfData });
};

export const renderNewForm = (req, res) => {
  res.render("listings/create.ejs");
};

export const showHotels = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!data) {
    req.flash("error", "Hotel is not present");
    return res.redirect("/list");
  }
  res.render("listings/show.ejs", { data });
};


export const createNewHotel = async (req, res) => {
  const location = req.body.location || req.body.regDetails?.location;

  if (!location || location.trim() === "") {
    throw new Error("Location is required for geocoding.");
  }

  // ✅ THIS is the correct MapTiler geocoding call — no .send()
  const response = await geocoding.forward(location, { limit: 1 });

  const coordinates = response.features[0]?.geometry?.coordinates;

  if (!coordinates) {
    throw new Error("No coordinates found for the given location.");
  }

  // Handle image
  const url = req.file.path;
  const filename = req.file.filename;

  const data = new Listing(req.body.regDetails);
  data.owner = req.user._id;
  data.image = { url, filename };
  data.geometry = { type: "Point", coordinates };

  // Optional: store coordinates
  await data.save();

  req.flash("success", "New listing is created");
  res.redirect("/list");
};



export const editForm = async (req, res) => {
  const { id } = req.params;
  const data = await Listing.findById(id);
  if (!data) {
    req.flash("error", "Hotel is not present");
    return res.redirect("/list");
  }
  let realImgUrl = data.image.url;
  realImgUrl = realImgUrl.replace("/upload", "/upload/w_150");
  res.render("listings/edit.ejs", { data, realImgUrl });
};

export const update = async (req, res) => {
  const { id } = req.params;
  let data = await Listing.findByIdAndUpdate(id, { ...req.body.regDetails });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    data.image = { url, filename };
    await data.save();
  }

  req.flash("update", "Information update secessfully!");
  res.redirect(`/list/${id}`);
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("remove", "Delete Sucessful");
  res.redirect("/list");
};

export const reserve = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const { checkIn, checkOut, guests } = req.body;
  // You can pass bookingData to reserve.ejs
  res.render("listings/reserve.ejs", {
    listing,
    user: req.user,
    bookingData: {
      checkIn,
      checkOut,
      guests,
    },
  });
};

export const confirm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  const { name, email, phone, rooms, guests, checkIn, checkOut } = req.body;

  const nightCount =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  const totalPrice = nightCount * listing.price * rooms;

  const booking = new Booking({
    user: req.user._id,
    listing: listing._id,
    phone,
    rooms,
    guests,
    checkIn,
    checkOut,
    totalPrice,
    bookingId: `BK-${Date.now().toString().slice(-6)}-${req.user._id
      .toString()
      .slice(-4)}`,
  });

  await booking.save();

  res.render("listings/bookingSuccess", {
    booking,
    listing,
  });
};

export const ownerBookings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // Check if current user is the owner
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not authorized!");
    return res.redirect(`/list/${id}`);
  }

  const bookings = await Booking.find({ listing: id }).populate("user");
  res.render("listings/Bookings.ejs", { listing, bookings });
};

export const Search=async (req, res) => {
   const { title } = req.query;

  const listing = await Listing.findOne({
    title: { $regex: new RegExp(title, "i") }  // ← case-insensitive
  });

  if (!listing) {
    req.flash("error", "No hotel found with that title.");
    return res.redirect("/list");
  }

  res.redirect(`/list/${listing._id}`);
}

export const filterByCategory = async (req, res) => {
  const { cat } = req.params;

  const listings = await Listing.find({
    category: { $regex: new RegExp(cat, "i") }
  });

    res.render("listings/category.ejs", { listings, categoryName: cat });
};