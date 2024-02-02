import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });

    this.logger.log(`Secret Key: ${process.env.SECRET_KEY}`);
  }

  async validate(payload: any) {
    console.log('Payload from JWT:', payload);
    const { email } = payload;
    const user = this.authService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
