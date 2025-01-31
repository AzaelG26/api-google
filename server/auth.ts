import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import {PassportStatic} from "passport";
import dotenv from "dotenv";

dotenv.config();

export const passportConfig=(passport: PassportStatic) => {
    const opts: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET as string,
    }
    passport.use(
        new JwtStrategy(opts, async (token, done) => {
            return done(null, token);
        })
    )
}