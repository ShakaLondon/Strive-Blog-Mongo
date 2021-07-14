import express from "express"
import createError from "http-errors"
import q2m from "query-to-mongo"

import BlogModel from "./blog-schema.js"
import AuthorModel from "../authors/schema.js"

const blogsRouter = express.Router()

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new BlogModel(req.body)
    const { _id } = await newBlog.save()

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

    const query = q2m(req.query)

    const { total, blogs } = await BlogModel.findBlogsWithAuthors(query)
    // No matter how you apply skip, limit, sort methods, the order will always be SORT, SKIP, LIMIT
    res.send({ links: query.links("/blogs", total), total, blogs })

  } catch (error) {

    next(createError(500, "An error occurred while getting blogs' list "))

  }
})

blogsRouter.get("/:blogId", async (req, res, next) => {
  try {

    const blogId = req.params.blogId

    const author = await BlogModel.findBlogWithAuthors(blogId)

    if (author) {
      res.send(author)
    } else {
      next(createError(404, `Blog with _id ${blogId} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting blog"))
  }
})

blogsRouter.post("/search", async (req, res, next) => {
  try {

    const searchInput  = req.query.searchQuery

    console.log(searchInput)

    const searchQ = searchInput.replace(/_/g, ' ')

    console.log(searchQ)

    // var stream = collection.find({"FirstName": new RegExp(val)}).stream();

    // let query = [
    //   {"title": {$regex: new RegExp(searchQ)}},
    //   {"category": {$regex: new RegExp(searchQ)}},
    //   {"content": {$regex: new RegExp(searchQ)}},
    //   {"author": {"name": { $regex: new RegExp(searchQ)},
    //             "surname": { $regex: new RegExp(searchQ)}} }
    //   ]

    // const searchResult = await BlogModel.find(
    //   { $or: query }, function(err, result) {
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       res.send(result);
    //     }
      // title: $SearchQ,
      // category: 'Commander',
      // content: '',
      // authors : { name: "reservations@marriott.com",
      //             surname: "" }
      
      const searchResult = await BlogModel.find(
        { $or: [{title: new RegExp(searchQ)}, {category: new RegExp(searchQ)}, {content: new RegExp(searchQ)}, {"author.name": new RegExp(searchQ)}, {"author.surname": new RegExp(searchQ)}]}, 
        function(err, result) {
          if (err) {
            res.send(err);
          }
          })

      // const authorSearch = await AuthorModel.find({ $or: [{name: new RegExp(searchQ)}, {surname: new RegExp(searchQ)}]},
      // function(err, result) {
      //   if (err) {
      //     res.send(err);
      //   }})

    if (searchResult) {
      res.send(searchResult)
    } else {
      next(createError(404, `Query: No results found for ${req.query.searchQuery}!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting blog"))
  }
})

blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId)

    if (deletedBlog) {
      res.status(204).send()
    } else {
      next(createError(404, `Blog with _id ${blogId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting blog ${req.params.deletedBlog}`))
  }
})

blogsRouter.put("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId

    const updatedAuthor = await BlogModel.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    })


    if (updatedAuthor) {
      res.send(updatedAuthor)
    } else {
      next(createError(404, `Blog with _id ${blogId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while updating blog ${req.params.blogId}`))
  }
})

//  COMMENTS // REVIEWS

blogsRouter.post("/:blogId/comments", async (req, res, next) => {
  try {
    // Given a book ID (req.body.blogId) we need to insert it into the purchase history array of the specified blog (req.params.blogId)
    // 1. Find book by id
    const blogId = req.body.blogId

    const commentAdd = await BookModel.findById(blogId, { _id: 0 })

    if (commentAdd) {
      // 2. Add additional properties to the book object (purchase date)
      const commentToInsert = { ...commentAdd.toObject(), commentDate: new Date() } // purchasedBook is a DOCUMENT not an object therefore I need to convert it into a JS Object with toObject() method

      // 3. Modify the specified blog by adding the book to the array

      const updatedBlog = await BlogModel.findByIdAndUpdate(
        req.params.blogId, // who you want to modify
        { $push: { comments: commentToInsert } }, // how you want to modify him/her (adding an element to the array)
        {
          // options
          new: true,
          runValidators: true,
        }
      )
      if (updatedBlog) {
        res.send(updatedBlog)
      } else {
        next(createError(404, "Blog not found!"))
      }
    } else {
      next(createError(404, "Book not found!"))
    }
  } catch (error) {
    next(createError(500, "Generic Error"))
  }
})

blogsRouter.get("/:blogId/comments", async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.blogId)
    if (blog) {
      res.send(blog.comments)
    } else {
      next(createError(404, "Blog not found!"))
    }
  } catch (error) {
    next(createError(500, "Generic Error"))
  }
})

blogsRouter.get("/:blogId/comments/:commentId", async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.blogId, {
      // first param is id, second is projection
      // comments: { $elemMatch: { _id: req.params.commentId } },
    })

    console.log(blog.comments.find(p => p._id.toString() === req.params.commentId))

    if (blog) {
      if (blog.comments.length > 0) {
        res.send(blog.comments[0])
      } else {
        next(createError(404, "Book not found in purchase history!"))
      }
    } else {
      next(createError(404, "blog not found!"))
    }
  } catch (error) {
    next(createError(500, "Generic Error"))
  }
})

blogsRouter.delete("/:blogId/comments/:commentId", async (req, res, next) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      req.params.blogId, // who you want to modify
      {
        $pull: {
          comments: { _id: req.params.commentId }, // how you want to modify him/her (removing an element from the array)
        },
      },
      { new: true } // options
    )
    if (blog) {
      res.send(blog)
    } else {
      next(createError(404, "Blog not found!"))
    }
  } catch (error) {
    next(createError(500, "Generic Error"))
  }
})

blogsRouter.put("/:blogId/comments/:commentId", async (req, res, next) => {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      {
        _id: req.params.blogId,
        "comments._id": req.params.commentId,
      },
      {
        $set: {
          "comments.$": req.body, // $ --> POSITIONAL OPERATOR https://docs.mongodb.com/manual/reference/operator/update/positional/#mongodb-update-up.-
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
    if (blog) {
      res.send(blog)
    } else {
      next(createError(404, "Blog not found!"))
    }
  } catch (error) {
    next(createError(500, "Generic Error"))
  }
})

export default blogsRouter


// await MyModel.find({ name: /john/i }, 'name friends').exec();
