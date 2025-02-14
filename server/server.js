require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const dramaRoutes = require("./routes/drama");  
const cors = require("cors");  
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", dramaRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));  
