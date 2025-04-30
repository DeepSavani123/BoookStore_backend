    import express from 'express';
const router = express.Router();
import { createBooks, deleteBook, getBook, getBooks, updateBook } from '../controllers/book.js';

router.post('/create', createBooks);
router.get('/get', getBooks);
router.get('/get/:id', getBook);
router.delete('/delete/:id', deleteBook);
router.put('/update', updateBook);

export default router;