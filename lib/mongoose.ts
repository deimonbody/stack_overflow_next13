import mongoose from "mongoose";

let isContected: boolean = false;

export const connectToDatebase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isContected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isContected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
