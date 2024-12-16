import express from 'express';
import { connectMongoDB } from './config/mongoDB.config.js';
import __dirname from './dirname.js';
import cors from 'cors';
import handlebars from 'express-handlebars';
import appRouter from './routes/api/index.router.js'
import viewsRouter from './routes/views.router.js';
import cookieParser from 'cookie-parser';
import initializePassport from './utils/initializePassport.js';
import passport from 'passport';

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


app.use('/api', appRouter)
app.use('/', viewsRouter)


app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});