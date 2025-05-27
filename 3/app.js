const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes"); // Assuming you saved the routes as todoRoutes.js
require("dotenv").config(); // For environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use To-Do routes
app.use("/todos", todoRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to To-Do API!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;

// Only connect and start server if run directly (not required by tests)
if (require.main === module) {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tododb";
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}
