//dotenv for store .env file data
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import listRoute from "./router/list.js";
import reviewRoute from "./router/review.js"
import path from "path";
import methodOverride from "method-override";
import engine from "ejs-mate";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import locals from "./middlewares/locals.js";
//authoncation
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./model/user.js";
//userRoute
import userRoute from "./router/user.js"
// import indexRoutes from "./router/list.js"
const app = express();
const PORT = process.env.PORT || 8080;

//ejs setup
const __dirname = path.resolve(); //// Required for ES modules
app.set("view engine", "ejs");
// Set the folder where your EJS files are located
app.set("views", path.join(__dirname, "views"));

//setup ejs-mate as the view engine
app.engine("ejs", engine);

//Connect with databas e
const dbUrl=process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then((res) => {
    console.log("Data Base Connected Sucessfully");
  })
  .catch((err) => {
    console.log("Disconnect", err);
  });

//serve static file
app.use(express.static(path.join(process.cwd(), "/public")));

// parsing
app.use(express.urlencoded({ extended: true }));

//MiddleWare
app.use(express.json());

//Using method-override
app.use(methodOverride("_method"));


//connect-mongo store

const mongoStore=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret: process.env.SECRET,
    touchAfter: 24*3600,
  }
})

mongoStore.on("error",()=>{
  console.log("Error in MONGO SESSION STORE")
})

//session use
const sessionOpt = {
  store:mongoStore,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  //set cookie
  cookie: {
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOpt));
app.use(flash())

//authoncation  
app.use(passport.initialize())
app.use(passport.session())
//use static authenticate method od model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()))

app.use(locals);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())



app.get("/", (req, res) => {
  res.redirect("/list")
});


app.use("/list", listRoute);
// app.use("/", indexRoutes);
app.use("/list/:id/reviews",reviewRoute)
app.use("/",userRoute)

//Error handle fro all routes
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).render("listings//error.ejs", { statusCode, message });
// });

app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).send(err.message || "Internal Server Error");
});
 
app.listen(PORT, () => {
  console.log(`Server is Running from Localhost:${PORT}`);
});

