import AuthorModel from "./schema.js"
import mongoose from "mongoose"

const { Schema, model } = mongoose

const newAuthor = {
        "name": "Tobia",
        "surname": "De Angelis",
        "email": "Tobia.DeAngelis@striveschool.co.uk",
        "dateOfBirth": "19/08/1975",
        "avatar": "https://striveschool.ghost.io/content/images/2020/12/tobia_mymoji.jpg",
};

// export default newAuthor


// db.Authors.insertMany([
//     { name: "Bri", surname: "Cho", email: "Bri.Cho@striveschool.co.uk", dateOfBirth: "22/09/1985", avatar: "https://striveschool.ghost.io/content/images/2020/11/FBBRRZy5_400x400.jpg" },
//     { name: "Shakira", surname: "Pingue", email: "Shakira.Pingue@striveschool.co.uk", dateOfBirth: "04/12/1994", avatar: "https://striveschool.ghost.io/content/images/2020/12/tobia_mymoji.jpg" },
//     { name: "Rianne", surname: "Thomas", email: "Rianne.Thomas@striveschool.co.uk", dateOfBirth: "29/02/1972", avatar: "https://striveschool.ghost.io/content/images/2020/12/tobia_mymoji.jpg" },
// ])

// db.Authors.insertOne(
//     { name: "Bri", surname: "Cho", email: "Bri.Cho@striveschool.co.uk", dateOfBirth: "22/09/1985"},
// )



const newDocument = new AuthorModel(newAuthor)
await newDocument.save(function (err) {
    if (err) return handleError(err);
    // saved!
  })
