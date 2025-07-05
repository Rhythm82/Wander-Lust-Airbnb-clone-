import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose); //we use this becouse this auto generated user, pass and also it work on hashing and salting

const User = mongoose.model("User", userSchema);
export default User;
