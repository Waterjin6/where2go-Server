// import express
import express from "express";
// import cors
import cors from "cors";
import createError from "http-errors";
import path from "path";

import multer from "multer";
import {dir} from "./config/multer.js";

// import routes
import eventRouter from "./Event/eventRouter.js";
import userRouter from "./User/userRouter.js";
import keywordRouter from "./Keyword/keywordRouter.js";
import searchRouter from "./Search/searchRouter.js";
import visitedRouter from "./Visited/visitedRouter.js";
import savedRouter from "./Saved/savedRouter.js";
import calendarRouter from "./Calendar/calendarRouter.js";
import kindRouter from "./Kind/kindRouter.js";
import areaRouter from "./Area/areaRouter.js";
import companionRouter from "./Companion/companionRouter.js";
import reviewRouter from "./Review/reviewRouter.js";

import dotenv from "dotenv";


dotenv.config();

// init express
const app = express();

// use express json
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

// use router
app.use("/event", eventRouter);
app.use("/user", userRouter);
app.use("/search", searchRouter);
app.use("/keyword", keywordRouter);
app.use("/visited", visitedRouter);
app.use("/saved", savedRouter);
app.use("/calendar", calendarRouter);
app.use("/kind", kindRouter);
app.use("/area", areaRouter);
app.use("/companion", companionRouter);
app.use("/review", reviewRouter);
app.use('/images',express.static(dir));


// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));