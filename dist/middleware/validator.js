"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.phoneRules = exports.dateRules = exports.registerValidationRules = exports.emailRules = exports.passwordRules = void 0;
const express_validator_1 = require("express-validator");
exports.passwordRules = (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((value) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;
    const characterTypesCount = [
        lowercaseRegex.test(value),
        uppercaseRegex.test(value),
        numberRegex.test(value),
        specialCharRegex.test(value),
    ].filter((isPresent) => isPresent).length;
    if (characterTypesCount >= 3) {
        return true;
    }
    throw new Error('Password must contain at least three of the following: lowercase letters, uppercase letters, numbers, or special characters');
});
exports.emailRules = (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address');
exports.registerValidationRules = [
    (0, express_validator_1.body)('username')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long'),
    (0, express_validator_1.body)('phone').isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number'),
    exports.emailRules,
    exports.passwordRules,
];
exports.dateRules = (0, express_validator_1.body)('dob').isDate().withMessage('Invalid date format');
exports.phoneRules = (0, express_validator_1.body)('phone').isLength({ min: 8 })
    .withMessage('Phone number must be at least 8').custom(async (value) => {
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(value)) {
        throw new Error('phone number must be numeric');
    }
    return true;
});
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
};
exports.validate = validate;
