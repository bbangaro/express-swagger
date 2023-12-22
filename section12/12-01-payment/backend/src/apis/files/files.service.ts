import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    // yarn add @google-cloud/storage
    console.log('files', files);
    const waitedFiles = await Promise.all(files);

    // 1. 파일을 클라우드 스토리지로 전송

    // 1-1) 스토리지 셋팅
    const storage = new Storage({
      projectId: process.env.GOOGLE_STORAGE_ID,
      keyFilename: 'nestapi-408702-ed1ce92f7884.json',
    }).bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME);

    // 1-2) 스토리지 파일 업로드
    // File객체는 Promise가 아니기 때문에 만들어줘야 함
    const results = await Promise.all(
      waitedFiles.map((file, i) => {
        return new Promise<string>((resolve, reject) => {
          file.createReadStream().pipe(
            storage
              .file(file.filename)
              .createWriteStream()
              .on('finish', () =>
                resolve(
                  `${process.env.GOOGLE_STORAGE_BUCKET_NAME}/${file.filename}`,
                ),
              )
              .on('error', () => reject('실패')),
          );
        });
      }),
    );

    console.log('파일 전송 완료', results);

    return results;
  }
}
