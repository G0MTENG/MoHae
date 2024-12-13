import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const uploadDir = path.join(__dirname, '../public/uploads'); // 절대 경로 설정

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return cb(err, '');
      }
      const ext = path.extname(file.originalname);
      cb(null, `${buf.toString('hex')}${ext}`);
    });
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB 제한
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
}