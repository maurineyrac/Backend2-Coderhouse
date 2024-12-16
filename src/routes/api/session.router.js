
import Router from 'express'
import passport from 'passport'
import { generateToken } from '../../utils/jwt.js'
import { createHash, createResponse, isValidPassword } from '../../utils/utils.js'
import { userModel } from '../../dao/mongoDB/models/users.model.js'
import { passportCall } from '../../middlewares/passportCall.js'



const router = Router()

// Usado con estrategia passport local
// router.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), async (req, res) => {
//   res.send({ satus: 'success', message: 'usuario registrado' })
// })
// router.post('/failRegister', async (req, res) => {
//   res.send({ satus: 'success', message: 'fallo la estrategia' })
// })

// router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), async (req, res) => {
//   if (!req.user) return res.status(401).send({ satus: 'credenciales invalidas' })
//   req.session.user = {
//     email: req.user.email
//   }
//   res.send({ satus: 'success', message: 'usuario registrado' })
// })
// router.post('/failLogin', async (req, res) => {
//   res.send({ satus: 'success', message: 'fallo la login' })
// })

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body
    if (!email || !password) {
      return res.status(400).send({ status: 'error', error: 'Email y password son requeridos' })
    }
    const userExist = await userModel.findOne({ email })
    if (userExist) {
      return res.status(401).send({ status: 'error', error: 'El usuario ya existe' })
    }
    const newUser = {
      first_name,
      last_name,
      email,
      password: createHash(password)
    }
    await userModel.create(newUser)
    res.redirect('/login')
  } catch (error) {
    console.log(error)
    res.send({ status: 'error', error: 'Error al registrar el usuario' })
  }
})

router.post('/login', async (req, res) => {
try {
  const { email, password } = req.body
  const userExist = await userModel.findOne({ email })
  if (!userExist) {
    return res.send({ status: 'error', error: 'No existe el usuario' })
  }
  // comparar la contraseña hasheada
  const isPasswordValid = isValidPassword(password, userExist.password)
  if (!isPasswordValid) {
      return res.send({status: 'error', error: 'El email o la contraseña no coinciden'})
  }
  const token = generateToken(userExist)
  res.cookie('token', token, {
    maxAge: 60 * 60 * 1000 * 24, // un día 24h
    httpOnly: true
  })
// respuesta en formato json
// !token ? createResponse(req, res, 404, null, token) : createResponse(req, res, 200, token);
// respuesta en formato redirección a las vistas de handlebars
!token ? res.redirect('/login') : res.redirect('/');
} catch (error) {
  console.log(error)
  res.send({ status: 'error', error: 'error al loguear el usuario' })
}
})

router.get('/logout', async (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
})

router.get('/current', passportCall('current'), async (req, res) => {
  // usar dto para no mostrar contraseña
  try {
    const user = await userModel.findOne({ email: req.user.email })
    createResponse(req, res, 200, user, 'Usuario autorizado se muestran datos sensibles')
  } catch (error) {
    console.log(error)
    createResponse(req, res, 500, null, 'Error al obtener el usuario')    
  }
})

export default router