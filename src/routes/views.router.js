import {Router} from 'express';
import { passportCallView } from '../middlewares/passportCall.js';
import { userModel } from '../dao/mongoDB/models/users.model.js';
import { checkAuthorized } from '../middlewares/checkAuthorized.js';

const router = Router();
// modificar esta ruta para que sea cuando el usuario se loguea
// agregar una ruta raiz / que muestre la vista index con productos
router.get('/', passportCallView('current'), async (req, res) => {
  try {
    // Renderiza la vista con los datos del usuario si está autenticado
    if (req.user) {
      const user = await userModel.findOne({ email: req.user.email });
      
      return res.render('index', {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    }
    
    res.render('index', { user: req.user });
    
  } catch (error) {
    console.error('Error al cargar la vista principal:', error);
    res.render('error', { message: 'Error al cargar la vista principal' });
  }
  
});

router.get('/admin', passportCallView('current'), checkAuthorized, async (req, res) => {
  try {
    // Renderiza la vista con los datos del usuario si está autenticado
    if (req.user) {
      const user = await userModel.findOne({ email: req.user.email });
      return res.render('admin', {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error('Error al cargar la vista principal:', error);
    res.render('error', { message: 'Error al cargar la vista principal' });
  }
  
});

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/register', (req, res) => {
  res.render('register');
});

export default router;