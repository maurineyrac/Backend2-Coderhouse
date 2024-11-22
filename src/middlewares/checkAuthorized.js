import { userModel } from "../dao/mongoDB/models/users.models.js";
import { createResponse } from "../utils/utils.js";

export const checkAuthorized = async (req, res, next) => {

  try {
    const user = req.user;
    console.log(user); 
    if (!user) {
      res.redirect('/login');
    }
    else if (user.role == 'admin') {
      return next();
    }
    else {
      return createResponse(req, res, 403, {email: user.email, role: user.role}, 'No tienes permisos para acceder a esta ruta');
    }
  } catch (error) {
    console.error('Error al verificar la autorización:', error);
    return createResponse(req, res, 500, null, 'Error al verificar la autorización');
  }
}