"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Product = require("../models/product");

const productNewSchema = require("../schemas/productNew.json");

const router = new express.Router();

router.post("/", ensureAdmin, async function(req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, productNewSchema);
        if(!validator.valid){
            const errs = validator.errors.map((e) => e.stack);
            throw new BadRequestError(errs);
        }
    const product = await Product.create(req.body);
    return res.status(201).json({ product });
    } catch(err) {
        return next(err);
    }
});

router.patch("/", async function(req, res, next) {
    try {
        const product = await Product.updateProduct(req.body);
        return res.status(201).json({ product });
    }catch(err){
        return next(err);
    }
});

router.get("/", async function(req, res, next) {
    try{
        const products = await Product.findAll();
        return res.json({ products });
    } catch(err) {
        return next(err);
    }
});
router.get("/:id", async function(req, res, next) {
    try{
        const products = await Product.get(req.params.id);
        return res.json({ products });
    } catch(err) {
        return next(err);
    }
});

router.get("/:id/comments", async function(req, res, next) {
    try{
        const products = await Product.getCommentsForProducts(req.params.id);
        return res.json({ products });
    } catch(err) {
        return next(err);
    }
});
router.get("/:username/saved", async function(req, res, next) {
    try {
        const products = await Product.getSavedProducts(req.params.username);
        return res.json({ products });
    }catch(err) {
        return next(err);
    }
});

module.exports = router;