import express from 'express';
import { connectMongoDB } from './config/mongoDB.config.js';
import __dirname from './dirname.js';
// usado con session
import MongoStore from 'connect-mongo';
import session from 'express-session';
//
import handlebars from 'express-handlebars';
import appRouter from './routes/api/index.router.js'
import viewsRouter from './routes/views.router.js';
import cookieParser from 'cookie-parser';
import initializePassport from './utils/initializePassport.js';
import passport from 'passport';

const PORT = 8080;
const app = express();

connectMongoDB();

// usado con estrategia passport local
// app.use(session({
//   secret: 'secret',
// resave: false,
// saveunitilialized: false,
// store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }})
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use('/api',appRouter)
app.use('/', viewsRouter)


app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});