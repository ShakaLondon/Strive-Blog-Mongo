import express from "express";
// IMPORT EXPRESS SERVER
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs"
import path from "path"
import bodyParser from "body-parser"
// IMPORT CORS

import listEndpoints from "express-list-endpoints";
// SHOW API ENDPOINTS

// BASIC SERVER CREATION
// REMEMBER TO UPDATE START SCRIPT IN PACKAGE JSON

import authorsRouter from "./services/authors/index.js";
import blogsRouter from "./services/blogs/blog-index.js";
import filesRouter from "./services/uploads/index.js"
import { getCurrentFolderPath } from "./lib/fs-tools.js"
import { join } from "path"
// import authorByBlogs from "./blog-posts/index-author.js"
// TELL THE SERVER ABOUT THE ROUTES

// import AuthorModel from "./services/authors/schema.js"

// MIDDLEWARE ERROR HANDLERS
import {
  catchAllErrorHandler,
  entryForbiddenMiddleware,
  notFoundMiddleware,
} from "./errorHandlers.js";

const publicFolderPath = join(getCurrentFolderPath(import.meta.url), "../public")

const server = express();
const PORT = process.env.PORT || 3000;

// const whiteList = ["http://localhost:3000"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
//       callback(null, true);
//     } else {
//       const error = new Error("Not allowed by cors!");
//       error.status = 403;

//       callback(error);
//     }
//   },
// };
// server.use(cors(corsOptions));
server.use(express.static(publicFolderPath))
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
server.use("/blogs", filesRouter);
// server.use("/authors/:id/blogs", authorByBlogs),

// TELL SERVER YOU WANT TO USE THIS

server.use(notFoundMiddleware);
server.use(entryForbiddenMiddleware);
server.use(catchAllErrorHandler);

// MIDDLEWARES

console.table(listEndpoints(server));
// console.log(listEndpoints(server)) TO SHOW AS A LIST

server.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Server is running on ${PORT}  and connected to db`);
  } catch (error) {
    console.log("Db connection is failed ", error);
  }
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);


// FOR SERVER ALREADY IN USE ERROR RUN
// lsof -i:3000
// kill -9 [PID]
