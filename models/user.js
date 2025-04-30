import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        interest: {
            type: Array,
            required: true,
        },
        image: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);