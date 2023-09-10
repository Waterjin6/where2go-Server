import multer from "multer";
import path from "path";
import fs from "fs";

export const dir = "C:/Users/water/Desktop/모든파일/wheretogo/where2go-Server/WHERETOGO/images";   // PATH TO UPLOAD FILE

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
            const dirSpc = dir + req.baseUrl;
            if (!fs.existsSync(dirSpc)) {  // CREATE DIRECTORY IF NOT FOUND
                fs.mkdirSync(dirSpc, { recursive: true });
            }
            cb(null, dirSpc);
        },
        filename:(req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },

        fileFilter : {fileFilter},

        limits: { fileSize: 30 * 1024 * 1024 },
});

export const upload = multer({storage: storage});