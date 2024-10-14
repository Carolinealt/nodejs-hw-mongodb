import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("src", "tmp"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);


    }
})

export const upload = multer({ storage });