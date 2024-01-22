"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
    try{
        const authHeader = req.headers && req.headers.authorization;
        if(authHeader){
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();

    }catch(err){
      console.log('Error burada oluyor',err);
      console.log("JWT Verification Error - Name:", err.name, "Message:", err.message);
        return next(err);
    }
}

function ensureLoggedIn(req, res, next) {
    try{
        if(!res.locals.user){ 
        throw new UnauthorizedError();
        }
        return next();
    }catch(err){
      
        return next(err);
    }
}

function ensureAdmin(req, res, next) {
    try{
        if(!res.locals.user || !res.locals.user.isAdmin){
            throw new UnauthorizedError();
        }
        return next();
    }catch(err){
        return next(err);
    }
}

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        if(!(user && (user.isAdmin || user.username === req.params.username))){
            throw new UnauthorizedError();
        }
        return next();
    } catch(err){
        return next(err);
    }
}

module.exports = {
    authenticateJWT,
    ensureAdmin,
    ensureLoggedIn,
    ensureCorrectUserOrAdmin,
};