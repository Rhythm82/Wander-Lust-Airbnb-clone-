export const isLoggedIn=(req, res, next)=>{
    if (!req.isAuthenticated()) {
      req.session.redirectUrl=req.originalUrl;
      req.flash("error","you must be logged in to create listings");
      return res.redirect("/login");
    }
    next();
}

export const saveRedirectUrl=(req, res, next)=>{
    if (req.session.redirectUrl) {
      res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}