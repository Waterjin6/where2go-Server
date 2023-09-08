import multer from "multer";
import path from "path";
import fs from "fs";

var dir = "../images/visited";   // PATH TO UPLOAD FILE
if (!fs.existsSync(dir)) {  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
    // 확장자 필터링
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
        cb(null, false);
    }
};


const storage = multer.diskStorage({
        //폴더위치 지정
        destination:(req, file, cb) => {
            cb(null, dir);
        },
        filename:(req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },

        fileFilter : {fileFilter},

        limits: { fileSize: 30 * 1024 * 1024 },
});

const upload = multer({storage: storage});

export default upload;