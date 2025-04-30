import { Book } from "../models/book.js";

const createBooks = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            author,
            pages,
            releaseYear,
            status
        } = req.body;

        const book = await Book.create({
            userId: req.user.id,
            name,
            description,
            price,
            category,
            author,
            pages,
            releaseYear,
            status
        });

        return res.status(200).json({ success: true, data: book, message: "Book created successfully!" });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getBooks = async(req, res) => {
    try {
         
         const books = await Book.find({ userId: req.user.id });

         if(!books) {
            return res.status(404).json({ success: false, message: "Books not found!" });
         }

         return res.status(200).json({ success: true, data: books, message: "Books fetched successfully!" });
         
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

const getBook = async (req, res) => {
    try {

        const { id } = req.params;

        const book = await Book.findOne({ _id: id, userId: req.user.id });

        if (!book) return res.status(404).json({ success: false, message: "Book not found!" });

        return res.status(200).json({ success: true, data: book, message: "Book fetched successfully!" });

    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({ _id: id, userId: req.user.id });

        if (!book) return res.status(404).json({ success: false, message: "Book not found!" });

        const deleteBook = await Book.findByIdAndDelete({ _id: book._id });

        return res.status(200).json({ success: true, data: deleteBook, message: "Book deleted successfully!" });

    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            author,
            pages,
            releaseYear,
            status,
            bookId
        } = req.body;

        const payload = {
            name,
            description,
            price,
            category,
            author,
            pages,
            releaseYear,
            status,
        }

        const book = await Book.findOne({ _id: bookId, userId: req.user.id });

        if (!book) return res.status(404).json({ success: false, message: "Book not found!" });

        const updateBook = await Book.findByIdAndUpdate({ _id: book._id }, { $set: payload }, { new: true });

        return res.status(200).json({ success: true, data: updateBook, message: "Book updated successfully!" });

    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}


export {
    createBooks,
    getBooks,
    getBook,
    deleteBook,
    updateBook
}