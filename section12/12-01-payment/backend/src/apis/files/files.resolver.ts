import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  // yarn add graphql-upload @types/graphql-upload
  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    // graphQl타입과 typescript타입이 다를경우 Args에 graph type 별도로 정의

    return this.filesService.upload({ files });
  }
}
