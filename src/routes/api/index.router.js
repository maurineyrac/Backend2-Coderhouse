import {Router} from 'express';

import userRouter from './user.router.js';
import sessionRouter from './session.router.js';
import productRouter from './product.router.js';

const router = Router();

router.use('/users', userRouter);
router.use('/sessions', sessionRouter);
router.use('/products', productRouter);


export default router;