const express = require("express");
var exphbs = require('express-handlebars');
const menuRouter = require("./routes/menu.routes");
const userRouter = require("./routes/user.routes");
const languageRouter = require("./routes/language.routes");
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const attachLanguage = require("./middleware/attachLanguage");


const app = express();
const PORT = 3000;

app.use(express.json());
const hbs = exphbs.create({
  helpers: {
    formatPrice(price) {
      return String(price).replace('.', ',');
    }
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(express.static("public"));
app.use(cookieParser());

// use session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60000
  }
}));
app.use(attachLanguage);
app.use('/menu', menuRouter);
app.use('/user',userRouter);
app.use('/language', languageRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});
