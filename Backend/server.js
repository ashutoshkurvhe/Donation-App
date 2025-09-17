const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

// Add uncaught exception handler
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

const { errorHandler } = require("./src/middlewares/errorMiddleware");
const { apiLimiter } = require("./src/middlewares/rateLimitMiddleware");

// 🔹 Import Routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const ngoRoutes = require("./src/routes/ngo.routes");
const campaignRoutes = require("./src/routes/campaign.routes");
const donationRoutes = require("./src/routes/donation.routes");
const commentRoutes = require("./src/routes/comment.routes");
const notificationRoutes = require("./src/routes/notification.routes");
const analyticsRoutes = require("./src/routes/analytics.routes");
const certificateRoutes = require("./src/routes/certificate.routes");
const adminRoutes = require("./src/routes/admin.routes");

dotenv.config();
const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// 🔹 Apply Rate Limiter (to all /api routes)
app.use("/api", apiLimiter);

// 🔹 Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/admin", adminRoutes);

// 🔹 Health Check
app.get("/", (req, res) => {
  res.send("Donation Platform API is running...");
});

// 🔹 Error Handler (last middleware)
app.use(errorHandler);

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
