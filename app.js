const express = require("express");
const app = express();
const port = 1000;

require("./db/conn");
const cors = require("cors");
const router = require("./routes/router.js");
const bodyParser = require('body-parser');
const cookieParser=require("cookie-parser");

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log("Server started at port", port);
});
