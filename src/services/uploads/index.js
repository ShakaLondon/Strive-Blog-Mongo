import express from "express"
import createError from "http-errors"
import q2m from "query-to-mongo"
import multer from "multer"
import { coverStorage } from "../../lib/fs-tools.js"

import CoversModel from "./schema.js"
// import AuthorModel from "../authors/schema.js"

const filesRouter = express.Router()

filesRouter.post(
    "/upload",
    
    multer({
      storage: coverStorage,
      fileFilter: (req, file, multerNext) => {
        console.log(file.mimetype)
        if (file.mimetype !== "image/gif" || file.mimetype !== "image/jpeg" || file.mimetype !== "image/jpg" || file.mimetype !== "image/png") {
          return multerNext(createError(400, "Only .gif, .jpg, .jpeg, and .png allowed!"))
        } else {
          return multerNext(null, true)
        }
      },
    }).single("avatar"),
    async (req, res, next) => {
      try {
        console.log(req.file)

        const newImage = new CoversModel({
          name: req.body.name,
          coverImg: req.file.path
        })

        console.log(req.body.name)
        console.log(req.file.path)

        const savedimage = await newImage.save()
  
        // await writeUsersPicture(req.file.originalname, req.file.buffer)
        res.send("Img uploaded!")
      } catch (error) {
        next(error)
      }
    }
  )
  
  // 2.
  
  filesRouter.post("/uploadMultiple", multer().array("avatar", 2), async (req, res, next) => {
    try {
      console.log("REQ. FILE: ", req.file)
      console.log("REQ. FILES: ", req.files)
  
      const arrayOfPromises = req.files.map(file => writeUsersPicture(file.originalname, file.buffer))
  
      await Promise.all(arrayOfPromises)
      res.send()
    } catch (error) {
      next(error)
    }
  })
  
  export default filesRouter
  