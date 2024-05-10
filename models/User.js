import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: [50, "The first name cannot exceed 50 characters"]
    },
    lastName: {
        type: String,
        required: true,
        max: [50, "The last name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
        lowercase: true,
        validate: {
            validator: v => {
                return validator.isEmail(v)
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    password: {
        type: String,
        required: true,
        min: [8, "The password must have at least 6 characters"],
        max: [30, "The password can not exceed 30 characters"],
        validate: {
            validator: v => {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
                return specialCharacters.test(v)
            },
            message: props => `${props.value} must contain at least one special character.`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: v => {
            return validator.isMobilePhone(v, 'vi-VN', { strictMode: false })
        },
        message: props => `${props.value} is not a valid phone number.`
    },
    role: {
        type: String,
        enum: ["candidate", "officer"],
        default: "candidate",
        required: true,
        message: '{VALUE} is not supported'
    },
    avatarPath: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)



export default User;