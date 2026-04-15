const express = require("express");
const menuRouter = require("./routes/menu.routes");
const userRouter = require("./routes/user.routes");


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/menu', menuRouter);
app.use('/user',userRouter);

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
