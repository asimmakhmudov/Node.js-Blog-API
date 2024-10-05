const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],  
        unique: [true, "Email is required"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next()
})

UserSchema.methods.isValidPassword = async function (
    currentPassword,
    storedUserPassword
) {
    return await bcrypt.compare(currentPassword, storedUserPassword)
}

const User = mongoose.model("User", UserSchema);
module.export = User