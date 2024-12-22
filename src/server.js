import express from 'express';
import { connectMongoDB } from './config/mongoDB.config.js';
import __dirname from './dirname.js';
import cors from 'cors';
import handlebars from 'express-handlebars';
import apiRouter from './routes/api/index.routes.js'
import viewsRouter from './routes/renders/index.views.routes.js'
import cookieParser from 'cookie-parser';
import initializePassport from './utils/initializePassport.js';
import passport from 'passport';
import { Server } from 'socket.io';

const PORT = 8080;
const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors());

initializePassport();
app.use(passport.initialize());

//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use((req, res, next) => {
  req.io = socketServer;
  next();
});


app.use('/api', apiRouter)
app.use('/', viewsRouter)


const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  
  console.log("Nuevo cliente conectado!");
  socket.on("disconnect", () => {
      console.log("Cliente desconectado");
  });
});
