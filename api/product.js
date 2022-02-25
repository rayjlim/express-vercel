const express = require("express");
const router = express.Router();
const pkg = require("../package.json")
const quotes = require("./quotes.json")

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {
  try {
    const items = quotes.quotes;
    const item = items[Math.floor(Math.random()*items.length)];


    res.json({
      header: pkg.version + ":"+ new Date(),
      message: item.quote,
      author: item.author
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
