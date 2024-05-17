
import { fastify } from 'fastify'
//import { Databasememory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js';


const server = fastify()
// Request body, é o corpo da requisição usado no post e no put, nunca no get

// const database = new Databasememory()

const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create( {
      title,
      description,
      duration,

    })
    //status code 201 significa que algo foi criado
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.list(search)
  
return videos
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  await database.update(videoId, {
    title, 
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 2000,
})