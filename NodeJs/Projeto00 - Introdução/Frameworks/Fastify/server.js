
import { fastify } from 'fastify'
import { Databasememory } from './database-memory.js'


const server = fastify()
// Request body, é o corpo da requisição usado no post e no put, nunca no get

const database = new Databasememory()

server.post('/videos', (request, reply) => {

  
  const { title, description, duration } = request.body

  database.create( {
    title,
    description,
    duration,

  })
  console.log(database.list())
  //status code 201 significa que algo foi criado
  return reply.status(201).send()
})

server.get('/videos', () => {
  const videos = database.list()
  console.log(videos)
return videos
})

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  database.update(videoId, {
    title, 
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', () => {
  return 'usuario acessou qualquer rota'
})

server.listen({
  port: 5656,
})