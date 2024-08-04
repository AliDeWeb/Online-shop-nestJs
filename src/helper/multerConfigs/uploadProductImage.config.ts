import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const maxFileSize = 1 * 1024 * 1024;

export const uploadProductImageMulterOptions = {
  storage: diskStorage({
    destination: 'static/uploads/images/products',
    filename: (req, file, cb) => {
      const uniqueName = `product-${Date.now()}-${Math.floor(Math.random() * 100000)}-image`;
      const ext = file.originalname.split('.').pop();
      cb(null, `${uniqueName}.${ext}`);
    },
  }),
  fileFilter: (req, file: Express.Multer.File, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('file type is not allowed'), false);
    }
  },
  limits: {
    fileSize: maxFileSize,
  },
};
