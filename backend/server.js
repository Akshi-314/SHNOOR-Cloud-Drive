const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("Cloud Drive Backend Running");
});

// Create HTTP Server
const server = http.createServer(app);

// Create Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

// When a user connects
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Make io available to other files
app.set("io", io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});