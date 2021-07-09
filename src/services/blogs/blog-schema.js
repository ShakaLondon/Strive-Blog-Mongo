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
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      }
    },
    content:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
)

export default model("Blogs", BlogSchema) // bounded to "users" collection
