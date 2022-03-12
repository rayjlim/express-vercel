const express = require("express");
const app = express();
const cors = require('cors')
const product = require("./api/product");
const database = require("./api/database");
const mongodb = require("./api/mongodb");

app.use(cors())
app.use(express.json({ extended: false }));

app.use("/api/product", product);

app.use("/api/database", database);
app.use("/api/mongodb", mongodb);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
