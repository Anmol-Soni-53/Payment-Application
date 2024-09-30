const express = require("express");
const CORS=require("cors")
const PORT=3000;
const rootRouter=require("./routes/index");

const app=express();

app.use(CORS());
app.use(express.json());

app.use("/api/v1",rootRouter);

app.listen(PORT);




