import mongoose from "mongoose"

const { Schema, model } = mongoose

const CoversSchema = new Schema( {
  name: {

    type: String,
    required: true,

},

    coverImg: {

        type: String,
        required: true,

    }},
    {
        timestamps: true, // adding createdAt and modifiedAt automatically
      }
    )

    export default model("Covers", CoversSchema)



