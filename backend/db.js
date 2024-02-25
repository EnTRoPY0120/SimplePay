const { default: mongoose,  } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm");

// Create a mongoose Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// Create a model to be exported for the defined mongoose Schema
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
