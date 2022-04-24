require('dotenv').config()

import 'reflect-metadata'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { Storage } from '@google-cloud/storage'
import { graphqlUploadExpress } from 'graphql-upload'

import { User, Item, Printer3d, Comment } from './Entities'
import { UserResolver, Printer3dResolver, CommentResolver } from './Resolvers'

//  get storage credentials from .env instead of json file
const keysEnvVar = process.env['STORAGE_CREDS']
if (!keysEnvVar) {
  throw new Error('The $STORAGE_CREDS environment variable was not found!')
}
const keys = JSON.parse(keysEnvVar)
const gc = new Storage({
  projectId: 'chrome-extension-images',
  credentials: {
    client_email: keys.client_email,
    private_key: keys.private_key,
  },
})
export const bucket = gc.bucket('chrome-extension-bucket')

const main = async () => {
  /*const conn = */ await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User, Item, Printer3d, Comment],
    migrations: [path.join(__dirname, './migrations/*')],
    ssl: {
      rejectUnauthorized: false,
    },
  })
  //  await conn.runMigrations()

  const app = express()

  app.use(cors())
  app.set('trust proxy', 1)
  app.use(graphqlUploadExpress({ maxFileSize: 1048576 * 5, maxFiles: 1 }))
  app.use(express.json({ limit: '5' }))
  app.use(express.urlencoded({ limit: '5' }))

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, Printer3dResolver, CommentResolver],
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
