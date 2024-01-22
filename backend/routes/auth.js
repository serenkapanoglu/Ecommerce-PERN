"use strict";

const jsonschema = require("jsonschema");
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");


router.post("/token", async function(req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });

    }catch(err) {
        console.log('Is error happening here? ',err);
        return next(err);
    }
});


router.post("/register", async function (req, res, next){
    try{
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({ ...req.body, isAdmin: false});
        const token = createToken(newUser);
        return res.status(201).json({ token });
    }catch(err){
        console.log('Is error happening here? ',err);
        return next(err);
    }
});

 module.exports = router;