import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import multer from "multer"

const { readJSON, writeJSON, writeFile } = fs

const DIRCOVER = './public/cover';
const DIRUSER = './public/user';

// const usersJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/users.json")
// const booksJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/books.json")
const coverPublicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/cover")

// export const getUsers = () => readJSON(usersJSONPath)
// export const getBooks = () => readJSON(booksJSONPath)

// export const writeUsers = content => writeJSON(usersJSONPath, content)
// export const writeBooks = content => writeJSON(booksJSONPath, content)

export const getCurrentFolderPath = currentFile => dirname(fileURLToPath(currentFile))

export const writeUsersPicture = (fileName, content) => writeFile(join(coverPublicFolderPath, fileName), content)

export const coverStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIRCOVER);
    },
    filename: (req, file, cb) => {
      const fileName = file.name.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });

  export const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIRUSER);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });
