
import Router from 'express'
import { generateToken } from '../../utils/jwt.js'
import { createHash, createResponse, isValidPassword } from '../../utils/utils.js'
import { userModel } from '../../dao/mongoDB/models/user.model.js'
import { passportCall } from '../../middlewares/passportCall.js'
import { Session } from 'express-session'
import sessionController from '../../controllers/session.controller.js'



const router = Router()

router.post('/register', sessionController.register)

router.post('/login', sessionController.login)

router.get('/logout', sessionController.logout)

router.get('/current', passportCall('current'), sessionController.current)

export default router