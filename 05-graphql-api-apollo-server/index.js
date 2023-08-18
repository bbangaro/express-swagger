import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getToken } from "./phone.js";

// The GraphQL schema
const myTypeDefs = `#graphql
  type GetBoard {
    id: Int, user: String, title: String, contents: String 
  }
  input PostBoard {
    user: String, title: String, contents: String 
  }

  type Query {
    fetchBoards: [GetBoard]
  }

  type Mutation {
    createBoard(user: String, title: String, contents: String): String,
    createBoard2(postBoard: PostBoard): String
    createTokenPhone(myPhone: String): String
  }
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    fetchBoards: () => {
      const result = [
        { id: 1, user: "휴", title: "휴 제목", contents: "휴 내용" },
        { id: 2, user: "용", title: "용 제목", contents: "용 내용" },
        { id: 3, user: "서나", title: "서나 제목", contents: "서나 내용" },
      ];

      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      console.log("만들기", args);
      return "등록 성공!!";
    },

    createBoard2: (_, args) => {
      console.log("만들기", args);
      return "등록 성공!!";
    },

    createTokenPhone: (_, args) => {
      const isValid = true;
      if (isValid) {
        const mytoken = getToken(6);

        console.log(args.myPhone, mytoken);
        return "인증 완료!!";
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: myTypeDefs,
  resolvers: myResolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 Server ready at ${url}`);
