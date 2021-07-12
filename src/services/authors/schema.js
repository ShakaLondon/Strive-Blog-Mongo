import mongoose from "mongoose"

const { Schema, model } = mongoose

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth:{
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
)

export default model("Authors", AuthorSchema) // bounded to "users" collection

// seperate crud for embeded values check purchase history in riccardos code

