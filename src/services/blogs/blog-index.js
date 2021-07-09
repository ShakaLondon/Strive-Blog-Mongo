import express from "express"
import createError from "http-errors"

import BlogModel from "./blog-schema.js"

const blogsRouter = express.Router()

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new BlogModel(req.body)
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

blogsRouter.get("/", async (req, res, next) => {
  try {

    const users = await BlogModel.find()

    res.send(users)

  } catch (error) {

    next(createError(500, "An error occurred while getting users' list "))

  }
})

blogsRouter.get("/:authorId", async (req, res, next) => {
  try {

    const authorId = req.params.authorId

    const author = await BlogModel.findById(authorId)

    if (author) {
      res.send(author)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting author"))
  }
})

blogsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId

    const deletedAuthor = await BlogModel.findByIdAndDelete(authorId)

    if (deletedAuthor) {
      res.status(204).send()
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting author ${req.params.authorId}`))
  }
})

blogsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId

    const updatedAuthor = await BlogModel.findByIdAndUpdate(authorId, req.body, {
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

export default blogsRouter
