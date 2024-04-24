"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use('/users', user_1.default);
router.get('/', async (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
router.use('/media', (0, express_1.static)('media'));
exports.default = router;
