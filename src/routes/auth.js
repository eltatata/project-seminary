const express = require('express');
const { body } = require("express-validator");
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', [
    body("name", "Min 5 characters").trim().isLength({ min: 5 }).escape(),
    body("name", "Name is invalid").notEmpty().escape(),
    body("lastName", "Last name is invalid").trim().notEmpty().escape(),
    body("program", "Program is required").trim().notEmpty().escape(),
    body("email", "Email is invalid").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({ min: 6 }).escape(),
    body("password", "Password invalid").custom((value, { req }) => {
        if (value != req.body.repassword) throw new Error("Passwords do not match");
        return value;
    })
], register);

router.post('/login', [
    body("email", "Email is invalid").trim().isEmail().normalizeEmail(),
    body("password", "Password is invalid").trim().isLength({ min: 6 }).escape(),
], login);

module.exports = router;