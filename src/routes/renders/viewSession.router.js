import { Router } from 'express';
import { passportCallView } from '../../middlewares/passportCall.js';
import { checkAuthorized } from '../../middlewares/checkAuthorized.js';
import ViewController from '../../controllers/view.controller.js';



const router = Router();

const { renderSession, renderAdmin, renderLogin, renderRegister } = new ViewController();

router.get('/', passportCallView('current'), renderSession);

router.get('/admin', passportCallView('current'), checkAuthorized, renderAdmin);

router.get('/login', renderLogin);


router.get('/register', renderRegister);

export default router;