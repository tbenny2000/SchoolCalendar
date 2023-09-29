const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.get("/", async (req, res) => {
    const listofUsers = await Users.findAll()
    res.json(listofUsers);
});

router.post("/", async (req,res) => {
    const post = req.body;
    await Users.create(post);
    res.json(post);
});

module.exports = router;