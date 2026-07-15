import express from "express";
import cors from "cors";
import "./lib/db.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // nextjs only
  }),
);

app.get("/", (_req, res) => {
  res.status(200).json("Hello Folks!");
});

app.listen(process.env.PORT, () => console.log("SERVER RUNNING..."));
