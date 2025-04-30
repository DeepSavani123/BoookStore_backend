import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        pages: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            default: false
        },
        releaseYear: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);