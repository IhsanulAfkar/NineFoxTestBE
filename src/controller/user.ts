import { RequestHandler } from "express";
import { diskUpload } from "../config/multer";
import prisma from "../utils/db";
import bcrypt from 'bcrypt'
import { userCategories } from "../utils/categories";
export const createUser: RequestHandler = async (req, res) => {
    try {
        diskUpload.single('media')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file' })
            }
            const { username, password, confirmPassword, email, category, description = '', phone } = req.body
            // validate all inputs
            const error: { [key: string]: string } = {};
            console.log(password, confirmPassword)
            if (password !== confirmPassword) {
                error.password = 'password not match'
            }
            const phoneRegex = /^[0-9]+$/
            if (!phoneRegex.test(phone)) {
                error.phone = 'phone number must be numeric'
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                error.email = 'Invalid email'
            }
            if (!userCategories.includes(category)) {
                error.category = 'Invalid category'
            }
            // check username, email, phone
            const [checkUsername, checkEmail, checkPhone] = await Promise.all([
                await prisma.user.findFirst({
                    where: {
                        username
                    }
                }),
                await prisma.user.findFirst({
                    where: {
                        email
                    }
                }),
                await prisma.user.findFirst({
                    where: {
                        phone
                    }
                })
            ])
            if (checkUsername)
                error.username = "Username already taken"
            if (checkEmail)
                error.email = "Email already taken"
            if (checkPhone)
                error.phone = "Phone number already taken"
            if (Object.keys(error).length > 0) {
                return res.status(400).json({ error });
            }
            const hashPassword = await bcrypt.hash(password, 10)
            await prisma.user.create({
                data: {
                    username,
                    password: hashPassword,
                    category,
                    description,
                    email,
                    phone,
                    media: req.file?.path
                }
            })
            return res.status(201).json({ message: "User created successfully" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getAllUsers: RequestHandler = async (req, res) => {
    const users = await prisma.user.findMany()
    const newUsers = users.map(user => {
        const { password, ...rest } = user
        return rest
    })
    res.status(200).json(newUsers)
} 