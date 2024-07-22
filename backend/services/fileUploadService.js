
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { InvalidFileTypeError } from '../utils/errors.js';

// Utility function to configure multer
const configureMulter = (destinationPath, allowedTypes) => {
  const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };
  // Storage configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDirectoryExists(destinationPath)
      cb(null, destinationPath)
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()} ${path.parse(file.originalname).name}${path.extname(file.originalname)}`
      cb(null, filename.replace(/\s+/g, '-'));
    },
  });

  // File filter configuration
  const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new InvalidFileTypeError('Invalid file type. Only specific types are allowed.');
      error.status = 400;
      return cb(error, false);
    }
    cb(null, true);
  };

  // Multer configuration
  return multer({ storage, fileFilter });
};

export default configureMulter;
