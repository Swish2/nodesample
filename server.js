const express = require('express')
const next = require('next')

const port = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.get('/', (req, res) => {
    const actualPage = '/'
    app.render(req, res, actualPage, {})
})

server.get('/register', (req, res) => {
    const actualPage = '/register'
    app.render(req, res, actualPage, {})
})
    
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Port is ${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})