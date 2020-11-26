import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import socketio from 'socket.io';
import { authRoutes } from './routes/auth.routes';
import { authorRoutes } from './routes/authors.routes';
import { bookRoutes } from './routes/books.routes';
import { userRoutes } from './routes/users.routes';
import path from 'path';

// Instance the express framework
const app = express();

// Setting the port of aplication server
app.set('port', 3000);

// Middlewares
app.use(express.json()); // Poder interpretar json en las peticiones

// Load the file routes users
app.use('/users', userRoutes.router);
app.use('/books', bookRoutes.router);
app.use('/authors', authorRoutes.router);

//authentication
app.use('/auth', authRoutes.router);

//socket.io
app.get('/', (req: Request, res:Response)=>{
    res.sendFile(path.resolve('./src/client/index.html'));
});

// Start the server, using the port defined
const server = app.listen(app.get('port'), () => {

    console.log('New console.log');
    console.log('New console.log 1');
    console.log(`Ther server is running on port ${app.get('port')}`); 
    
});

let io = new socketio.Server(server);

io.on('connection', function(socket: any){
    console.log('a user connected');

    socket.on('message', (message: any)=>{
        console.log(message);
    })
});