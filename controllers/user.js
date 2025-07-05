import User from "../model/user.js";

export const singupForm = (req, res) => {
  res.render("users/signup.ejs");
};

export const Signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // Register new user
    const newUser = new User({ username, email });
    let regUser = await User.register(newUser, password);
    req.login(regUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User registered successfully");
      res.redirect("/list");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

export const loginForm = (req, res) => {
  res.render("users/login.ejs");
};

export const Login = async (req, res) => {
  let { username } = req.body;
  req.flash("success", `Welcome ${username} to Wanderlust`);
  let url = res.locals.redirectUrl || "/list";
  res.redirect(url);
};

export const Logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you ar logged out!");
    res.redirect("/list");
  });
};
