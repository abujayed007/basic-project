import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // console.log(this, "pre hook:we will save data");
  const user = this;
  // hashing password save in DB
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// post/save middleware / hook:

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("Users", userSchema);
