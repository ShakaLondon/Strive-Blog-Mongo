import mongoose from "mongoose"

const { Schema, model } = mongoose

const BlogSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    readTime: {
      value: {
          type: Number,
          required: true,
      },
      unit: {
          type: String,
          required: true,
          default: "minute",
      },
    },
    author: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Authors'
    }],
    content:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
)

BlogSchema.static("findBlogWithAuthors", async function (id) {
  const blog = await this.findById(id).populate("author")
  return blog
})

BlogSchema.static("findBlogsWithAuthors", async function (query) {
  const total = await this.countDocuments(query.criteria)
  const blogs = await this.find(query.criteria, query.options.fields)
    .skip(query.options.skip)
    .limit(query.options.limit)
    .sort(query.options.sort)
    .populate("author")

  return { total, blogs }
})

BlogSchema.post("validate", function (error, doc, next) {
  if (error) {
    const err = createError(400, error)
    next(err)
  } else {
    next()
  }
})

export default model("Blogs", BlogSchema) // bounded to "users" collection
