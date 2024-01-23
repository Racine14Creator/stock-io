const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profileImage: String
});

const User = mongoose.model("User", userSchema);