const express = require("express");
const router = express.Router();

const crawlController = require("../controllers/crawlController");

router.get("/crawl", crawlController);

module.exports = router;
