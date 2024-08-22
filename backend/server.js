import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/main.route.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 3509;
const db_url = process.env.DB_STRING;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

app.get("/*", async (req, res) => {
  res.status(200).send("Antopolis Server is up and running!");
});

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Connection to DB successful!");
    app.listen(port, () => {
      console.log(`Antopolis started at port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
