require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const Sales = require("./models/salesModel");

const app = express();

mongoose.set('strictQuery', false);

// Middlewares
app.use(express.json());
//app.use(cookieParser());
app.use(cookieParser("thekitabkorner", {
  sameSite: "None",
  secure: true,
  httpOnly: true,
}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000","https://thekitabkorner.vercel.app"],
    credentials: true,
  })
);


// Trusting proxy for HTTPS (if applicable)
app.set('trust proxy', 1);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Initialize Total Sales if not present in DB
const initializeTotalSales = async () => {
  const salesData = await Sales.findOne({});
  if (!salesData) {
    const newSales = new Sales({ totalSales: 0 });
    await newSales.save();
  }
};
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  
  .then(() => {
    initializeTotalSales();
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));