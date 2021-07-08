import express from "express"
import createError from "http-errors"

import AuthorModel from "./schema.js"

const authorRouter = express.Router()

authorRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })

  } catch (error) {

    if (error.name === "ValidationError") {

      next(createError(400, error))

    } else {

      console.log(error)

      next(createError(500, "An error occurred while creating new blog"))
    }
  }
})

authorRouter.get("/", async (req, res, next) => {
  try {

    const authors = await AuthorModel.find()

    res.send(authors)

  } catch (error) {

    next(createError(500, "An error occurred while getting authors' list "))

  }
})

authorRouter.get("/:authorId", async (req, res, next) => {
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

authorRouter.delete("/:authorId", async (req, res, next) => {
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

authorRouter.put("/:authorId", async (req, res, next) => {
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

export default authorRouter
