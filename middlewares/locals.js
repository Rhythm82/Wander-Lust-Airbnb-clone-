const locals = (req, res, next) => {
  const wrapArray = (val) => (Array.isArray(val) ? val : [val]);
  res.locals.success = req.flash("success");
  res.locals.remove = req.flash("remove");
  res.locals.update = req.flash("update");
  res.locals.error = req.flash("error");
  res.locals.currUser=req.user;
  next();


















  
};

export default locals;
