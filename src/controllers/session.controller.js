import UserDTO from "../dto/user.dto.js"
import userService from "../services/user.services.js"
import { generateToken } from "../utils/jwt.js"
import { createHash, createResponse, isValidPassword } from "../utils/utils.js"


class SessionController {
  register = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body
      if (!email || !password) {
        return res.status(400).send({ status: 'error', error: 'Email y password son requeridos' })
      }
      const userExist = await userService.getByEmail(email)
      if (userExist) {
        return res.status(401).send({ status: 'error', error: 'El usuario ya existe' })
      }
      const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password)
      }
      await userService.createUser(newUser)
      res.redirect('/sessions/login')
    } catch (error) {
      console.log(error)
      res.send({ status: 'error', error: 'Error al registrar el usuario' })
    }
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body
      const userExist = await userService.getByEmail(email)
      if (!userExist) {
        return res.send({ status: 'error', error: 'No existe el usuario' })
      }
      // comparar la contraseña hasheada
      const isPasswordValid = isValidPassword(password, userExist.password)
      if (!isPasswordValid) {
        return res.send({ status: 'error', error: 'El email o la contraseña no coinciden' })
      }
      const token = generateToken(userExist)
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24, // un día 24h
        httpOnly: true
      })
      !token ? res.redirect('/sessions/login') : res.redirect('/sessions');
    } catch (error) {
      console.log(error)
      res.send({ status: 'error', error: 'error al loguear el usuario' })
    }
  }

  logout = async (req, res) => {
    res.clearCookie('token')
    res.redirect('/sessions')
  }

  current = async (req, res) => {
    try {
      const userDTO = new UserDTO(req.user)
      createResponse(req, res, 200, userDTO, 'Datos filtrados por UserDTO')
    } catch (error) {
      createResponse(req, res, 500, null, 'Internal server error')
    }
  }
}

export default SessionController