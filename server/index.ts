import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import db from './utils/database'
import rooms from './routes/rooms'
import createServer from './utils/socket'
import path from 'path'
const app: express.Application = express()

const server = createServer(app)


// Middleware
app.use(express.json())


db.on('connect', () => console.log('Database connected'))
db.on('error', () => console.log('Failed to connect db...'))

app.use('/api/rooms', rooms)

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '../client/build/index.html'));
    });
  }

server.listen(process.env.PORT, () => console.log(`Server is started on port ${process.env.PORT}`))
