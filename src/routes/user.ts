import { Router } from "express";
import * as controller from '../controller/user'
import { emailRules, passwordRules, phoneRules, validate } from "../middleware/validator";
const router = Router()
router.get('/', controller.getAllUsers)
router.post('/', validate, controller.createUser)
export default router