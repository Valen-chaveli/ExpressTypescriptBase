import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { join } from "path";
import indexRouter from "./routes";

const app = express();

app.set("view engine", "jade");
app.set("views", join(__dirname, "views"));

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return "Hello world222!";
  },
};


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use("/api", indexRouter);

app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");
