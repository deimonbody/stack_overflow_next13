import mongoose from "mongoose";

let isContected: boolean = false;

export const connectToDatebase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Missing DB url");
  }
  if (isContected) {
    console.log("mongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflowNextjs",
    });
    isContected = true;
    console.log("MongoDB is connected");
  } catch (error) {}
};
