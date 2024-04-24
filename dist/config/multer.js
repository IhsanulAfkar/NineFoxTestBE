"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diskUpload = exports.memoryUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// using buffer
const memoryStorage = multer_1.default.memoryStorage();
// using url
const diskStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = `media`;
        if (!fs_1.default.existsSync(dir)) {
            try {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            catch (err) {
                console.error('Error creating directory:', err);
            }
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const memoryUpload = (0, multer_1.default)({ storage: memoryStorage });
exports.memoryUpload = memoryUpload;
const diskUpload = (0, multer_1.default)({ storage: diskStorage });
exports.diskUpload = diskUpload;
