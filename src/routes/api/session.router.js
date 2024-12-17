
import Router from 'express'
import { passportCall } from '../../middlewares/passportCall.js'
import SessionController from '../../controllers/session.controller.js'


const sessionController = new SessionController()

const router = Router()

router.post('/register', sessionController.register)

router.post('/login', sessionController.login)

router.get('/logout', sessionController.logout)

router.get('/current', passportCall('current'), sessionController.current)

export default router