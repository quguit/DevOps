
import { fastify } from 'fastify'
import { Databasememory } from './database-memory.js'


const server = fastify()
// Request body, é o corpo da requisição usado no post e no put, nunca no get

const database = new Databasememory()

server.post('/videos', () => {
  database.create( {
    title: 'video 01',
    description: 'descrição do video',
    duration: 240,

  })

  console.log(database.list())
})

server.get('/videos', () => {
  return 'usuario acessou qualquer rota'
})

server.put('/videos/:id', () => {
  return 'usuario acessou qualquer rota'
})

server.delete('/videos/:id', () => {
  return 'usuario acessou qualquer rota'
})

server.listen({
  port: 5656,
})