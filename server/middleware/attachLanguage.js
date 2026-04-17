function attachLanguage(req, res, next) {
    const language = req.session?.language === undefined ? "english" : req.session.language;
    if (language) {
        req.language = language;
        res.locals.language = language;
        next();
    }
}

module.exports = attachLanguage;