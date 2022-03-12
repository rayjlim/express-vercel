const express = require("express");
const router = express.Router();
const mariadb = require('mariadb');
require('dotenv').config()

const pool = mariadb.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 5,
});

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {
  try {
    console.log("start");
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query("SELECT COUNT(*) as count FROM `myTable` WHERE 1")
          .then((rows) => {
            console.log(rows); //[ {val: 1}, meta: ... ]
            //Table must have been created before
            // " CREATE TABLE myTable (id int, val varchar(255)) "
            return     res.json(Number(rows[0].count));
          })
          .catch((err) => {
            //handle error
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        //not connected
        console.log(err);
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
