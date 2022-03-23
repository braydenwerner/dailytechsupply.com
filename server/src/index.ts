require('dotenv').config()

import 'reflect-metadata'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { User } from './Entities'
import { UserResolver } from './Resolvers'

const main = async () => {
  /*const conn = */ await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User],
    migrations: [path.join(__dirname, './migrations/*')],
    ssl: {
      rejectUnauthorized: false,
    },
  })
  //  await conn.runMigrations()

  const app = express()

  app.use(cors())
  app.set('trust proxy', 1)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    uploads: false,
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/',
  })

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server started on localhost:${process.env.PORT!}`)
  })
}
main()
