import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import User from "../model/user.js";
import passport from "passport";
import { saveRedirectUrl } from "../middlewares/isAuth.js";
const router = express.Router();

//controller
import * as user from "../controllers/user.js";

//singup
router
  .route("/signup")
  .get(user.singupForm)
  .post(wrapAsync(user.Signup));

// router.post("/signup", wrapAsync(user.Signup));


//login
router
  .route("/login")
  .get(user.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    user.Login
  );

//logout
router.get("/logout", user.Logout);

export default router;
