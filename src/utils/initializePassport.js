import passport from "passport";
import GitHubStrategy from "passport-github2";

import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import "dotenv/config";

// Estragegia de autenticación con passport y GitHub2
// const initializePassport = () => {
//   passport.use(
//     new GitHubStrategy(
//       {
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "ruta de redirección de GitHub",
//       },async (accessToken, refreshToken, profile, done) => {
//         try {
//           console.log(profile);
//           let user = await userModel.findOne({ email: profile._json.email });
//           if (!user) {
//             let newUser = {
//               name: profile._json.name,
//               email: profile._json.email,
//               avatar: profile._json.avatar_url,
//             }
//             let result = await userModel.create(newUser);
//           }
//           done(null, user);
//         } catch (error) {
//           done(error);
          
//         }
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
//   passport.deserializeUser((obj, done) => {
//     done(null, obj);
//   });

// }

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
        return done(null, false, { message: 'Usuario no autorizado' });
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