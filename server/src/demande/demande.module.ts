import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeController } from './demande.controller';
import { Demandes } from './demande.entity';
import { DemandeService } from './demande.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Module({
  imports: [TypeOrmModule.forFeature([Demandes]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
    fileFilter: (req, file, cb) => {
      // Only allow PDF, DOC, and DOCX files
      if (file.mimetype.match(/\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Unsupported file type'), false);
      }
    }}),
],
  controllers: [DemandeController],
  providers: [DemandeService],
  exports: [DemandeService],
})
export class DemandeModule {}