"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const multer_1 = require("../config/multer");
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const categories_1 = require("../utils/categories");
const createUser = async (req, res) => {
    try {
        multer_1.diskUpload.single('media')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file' });
            }
            const { username, password, confirmPassword, email, category, description = '', phone } = req.body;
            // validate all inputs
            const error = {};
            console.log(password, confirmPassword);
            if (password !== confirmPassword) {
                error.password = 'password not match';
            }
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phone)) {
                error.phone = 'phone number must be numeric';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                error.email = 'Invalid email';
            }
            if (!categories_1.userCategories.includes(category)) {
                error.category = 'Invalid category';
            }
            // check username, email, phone
            const [checkUsername, checkEmail, checkPhone] = await Promise.all([
                await db_1.default.user.findFirst({
                    where: {
                        username
                    }
                }),
                await db_1.default.user.findFirst({
                    where: {
                        email
                    }
                }),
                await db_1.default.user.findFirst({
                    where: {
                        phone
                    }
                })
            ]);
            if (checkUsername)
                error.username = "Username already taken";
            if (checkEmail)
                error.email = "Email already taken";
            if (checkPhone)
                error.phone = "Phone number already taken";
            if (Object.keys(error).length > 0) {
                return res.status(400).json({ error });
            }
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            await db_1.default.user.create({
                data: {
                    username,
                    password: hashPassword,
                    category,
                    description,
                    email,
                    phone,
                    media: req.file?.path
                }
            });
            return res.status(201).json({ message: "User created successfully" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    const users = await db_1.default.user.findMany();
    const newUsers = users.map(user => {
        const { password, ...rest } = user;
        return rest;
    });
    res.status(200).json(newUsers);
};
exports.getAllUsers = getAllUsers;
