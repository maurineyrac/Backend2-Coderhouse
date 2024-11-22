import passport from 'passport';
import { createResponse } from '../utils/utils.js';

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) return createResponse(req, res, 401, null, info.messages ? info.messages : info.toString())
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const passportCallView = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                req.user = null;
                return next();
            }
            console.log(user);
            req.user = user;
            next();
        })(req, res, next);
    };
};
