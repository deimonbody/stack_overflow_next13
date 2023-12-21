import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  ckerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  ckerkId: { type: "string", required: true },
  name: { type: "string", required: true },
  username: { type: "string", required: true, unique: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string" },
  bio: { type: "string" },
  picture: { type: "string", required: true },
  location: { type: "string" },
  portfolioWebsite: { type: "string" },
  reputation: { type: "number", default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
