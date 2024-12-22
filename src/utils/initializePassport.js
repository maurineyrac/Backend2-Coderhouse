import passport from "passport";

import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import "dotenv/config";


// Estrategia de autenticación con passport y JWT usando cookies
const SECRET_KEY = process.env.JWT_SECRET

const initializePassport = () => {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['token'];
    }
    return token;
  }

  const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET_KEY,
  };

  const verifyToken = async (jwt_payload, done) => {
    try {
      if (!jwt_payload) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      return done(null, jwt_payload);
    }
    catch (error) {
      return done(error);
    }
  }

  passport.use('current',
    new jwtStrategy(
      strategyConfigCookies,
      verifyToken
    )
  );
}


export default initializePassport;