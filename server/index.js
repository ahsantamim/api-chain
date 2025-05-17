const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

const routes = require("./routes");
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/contact", (req, res) => {
  res.send("Conatct Us by Booking an appointment");
});

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
