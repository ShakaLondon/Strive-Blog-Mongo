import express from "express"
import createError from "http-errors"

import AuthorModel from "./blog-schema.js"

const authorsRouter = express.Router()

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })

  } catch (error) {

    if (error.name === "ValidationError") {

      next(createError(400, error))

    } else {

      console.log(error)

      next(createError(500, "An error occurred while creating new author"))
    }
  }
})

authorsRouter.get("/", async (req, res, next) => {
  try {

    const users = await AuthorModel.find()

    res.send(users)

  } catch (error) {

    next(createError(500, "An error occurred while getting users' list "))

  }
})

authorsRouter.get("/:authorId", async (req, res, next) => {
  try {

    const authorId = req.params.authorId

    const author = await AuthorModel.findById(authorId)

    if (author) {
      res.send(author)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting author"))
  }
})

authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId

    const deletedAuthor = await AuthorModel.findByIdAndDelete(authorId)

    if (deletedAuthor) {
      res.status(204).send()
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting author ${req.params.authorId}`))
  }
})

authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId

    const updatedAuthor = await AuthorModel.findByIdAndUpdate(authorId, req.body, {
      new: true,
      runValidators: true,
    })

    if (updatedAuthor) {
      res.send(updatedAuthor)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while updating author ${req.params.authorId}`))
  }
})

export default authorsRouter
