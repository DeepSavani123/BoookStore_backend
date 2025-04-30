import express from 'express';

import auth from './auth.js';
import book from './book.js';
import authorization from '../middlewares/authorization.js';

const router = express.Router();

router.use(authorization);

router.use('/auth', auth);
router.use('/book', book);

export default router;