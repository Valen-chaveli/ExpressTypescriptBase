import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { join } from 'path';
import indexRouter from './routes';
import cors from 'cors';

const main = async() => {
    const app = express();
    app.set('view engine', 'jade');
    app.set('views', join(__dirname, 'views'));

  
    // Construct a schema, using GraphQL schema language
    const schema = buildSchema(`type Query { 
            hello: String 
        }`);

    // The root provides a resolver function for each API endpoint
    const root = {
        hello: () => {
            return 'Hello world222!';
        },
        query: () => {
            return 'Hello';
        },
    };

    app.use(cors());

    app.use(
        '/graphql',
        graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        })
    );

    app.use('/api', indexRouter);

    // fdfd
    app.listen(4000, () => {
        console.log(
            'Running a GraphQL API server at http://localhost:4000/graphql'
        );
    });
};

main().catch((err) => console.log(err));
