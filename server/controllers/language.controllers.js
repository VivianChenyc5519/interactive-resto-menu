exports.toggleLanguage = (req, res, next) => {
  try {
    const currentLanguage = req.session.language || "english";
    req.session.language = currentLanguage === "french" ? "english" : "french";
    console.log(req.session.language);
    let redirect = req.query.redirect || "/";
    if (!redirect.startsWith("/")) {
      redirect = "/";
    }

    req.session.save((err) => {
      if (err) return next(err);
      res.redirect(redirect);
    });
  } catch (err) {
    next(err);
  }
};