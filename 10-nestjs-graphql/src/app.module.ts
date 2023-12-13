import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productCategory/productsCategories.module';
import { UsersService } from './apis/users/users.service';
import { UsersResolver } from './apis/users/users.resolver';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BoardModule,
    ProductsModule,
    ProductsCategoriesModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      /**
       * 여기서 context를 작성해줘야 resolver @Context로 받을 수 있음
       * 작성 안해주면 default로 req는 가지만 res는 안 감
       */
      context: (req, res) => ({
        req, //
        res,
      }),
    }),
    // TODO .env로 변경필요
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'tjsk1004',
      database: 'testproject',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
