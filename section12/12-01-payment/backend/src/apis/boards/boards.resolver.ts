import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => [Board])
  // async fetchBoards(): Board[] {
  @Query(() => String)
  async fetchBoards(): Promise<string> {
    const myRedis = await this.cacheManager.get('redis-board');
    console.log('myRedis', myRedis);

    return 'redis 조회 완료';

    // redis 하는 동안 임시 주석
    // return this.boardService.findAll();
  }

  // post는 타입정의 input으로 해야함
  @Mutation(() => String)
  async createBoard(
    // @Args('user') user: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 0 : 영구저장

    console.log('redis createBoardInput', createBoardInput);
    await this.cacheManager.set('redis-board', createBoardInput, {
      ttl: 10000,
    });

    return 'redis 등록 완료';

    // redis 하는 동안 임시 주석
    // return this.boardService.create();
  }
}
