import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import { JwtPayload } from "../types";

@Injectable()
export class AccessTokenStrategies extends PassportStrategy(Strategy, "jwt") {
    constructor(public config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearer(),
            secretOrkey: config.get("ACCESS_TOKEN_SECRET"),
            passReqToCallback: true,
        })
    }
    async validate(payload: JwtPayload) {
        return payload;
    }
}