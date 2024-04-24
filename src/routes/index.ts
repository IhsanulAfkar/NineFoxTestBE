import { Router, static as static_ } from "express";
import userRouter from './user'
const router = Router()
router.use('/users', userRouter)
router.get('/', async (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

router.use('/media', static_('media'))
export default router