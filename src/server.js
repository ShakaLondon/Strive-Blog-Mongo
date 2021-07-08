import express from "express";
// IMPORT EXPRESS SERVER
import mongoose from "mongoose";
// import cors from "cors";
// IMPORT CORS

import listEndpoints from "express-list-endpoints";
// SHOW API ENDPOINTS

// BASIC SERVER CREATION
// REMEMBER TO UPDATE START SCRIPT IN PACKAGE JSON

import authorsRouter from "./services/index.js";
import blogsRouter from "./services/blog-index.js";
// import authorByBlogs from "./blog-posts/index-author.js"
// TELL THE SERVER ABOUT THE ROUTES

// MIDDLEWARE ERROR HANDLERS
import {
  catchAllErrorHandler,
  entryForbiddenMiddleware,
  notFoundMiddleware,
} from "./errorHandlers.js";

const server = express();
const PORT = process.env.PORT || 3000;

// server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
// server.use("/authors/:id/blogs", authorByBlogs),

// TELL SERVER YOU WANT TO USE THIS

server.use(notFoundMiddleware);
server.use(entryForbiddenMiddleware);
server.use(catchAllErrorHandler);

// MIDDLEWARES

console.table(listEndpoints(server));
// console.log(listEndpoints(server)) TO SHOW AS A LIST

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
      console.log('connected to db')
    server.listen(PORT, () => console.log("server is running on port:", PORT));

    server.on("error", (error) =>
      console.log(`server is not running due to: ${error}`)
    );
  }).catch(e=>console.log(e))

// FOR SERVER ALREADY IN USE ERROR RUN
// lsof -i:3000
// kill -9 [PID]
