import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  constructor() {}
  findAll() {
    const result = [
      { id: 1, user: '하', title: '하 제목', contents: '휴 내용' },
      { id: 2, user: '호', title: '호 제목', contents: '용 내용' },
      { id: 3, user: '서나', title: '서나 제목', contents: '서나 내용' },
    ];

    return result;
  }

  create() {
    return '게시물 등록 성공!';
  }
}
