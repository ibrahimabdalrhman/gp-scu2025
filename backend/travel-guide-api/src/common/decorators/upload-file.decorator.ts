import { UseInterceptors, applyDecorators } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function UploadFilesDecorator(
  field: string,
  destination: string,
  filesNumbers: number,
) {
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(field, filesNumbers, {
        storage: diskStorage({
          destination: destination,
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    ),
  );
}

export function uploadFileFieldsDecorator(
  fields: string[],
  destination: string,
) {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(
        fields.map((f) => {
          return { name: f, maxCount: 1 };
        }),
        {
          storage: diskStorage({
            destination: destination,
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        },
      ),
    ),
  );
}

export function UploadFileDecorator(field: string, destination: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field, {
        storage: diskStorage({
          destination: destination,
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    ),
  );
}
