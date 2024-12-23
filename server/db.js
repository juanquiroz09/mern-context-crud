import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error("MongoDB URI is not defined.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message || error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongodb is connected to", mongoose.connection.db.databaseName);
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message || error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected.");
});
