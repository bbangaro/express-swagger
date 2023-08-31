import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll() {
    const result = [
      { id: 1, user: '휴', title: '휴 제목', contents: '휴 내용' },
      { id: 2, user: '용', title: '용 제목', contents: '용 내용' },
      { id: 3, user: '서나', title: '서나 제목', contents: '서나 내용' },
    ];

    return result;
  }

  create() {
    return '게시물 등록 성공!';
  }
}
