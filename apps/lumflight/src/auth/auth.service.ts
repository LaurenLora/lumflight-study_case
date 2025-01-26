import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/common/utils/hash';
import { ConfigService } from '@nestjs/config';
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from 'src/common/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const validPass = await comparePassword(password, user.password);
    if (user && validPass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(JWT_ACCESS_SECRET),
      expiresIn: this.configService.get<string>(JWT_ACCESS_EXPIRES_IN),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(JWT_REFRESH_SECRET),
      expiresIn: this.configService.get<string>(JWT_REFRESH_EXPIRES_IN),
    });

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      role: user.role,
      email: user.email,
    };
  }

  async refreshToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(JWT_ACCESS_SECRET),
      expiresIn: this.configService.get<string>(JWT_ACCESS_EXPIRES_IN),
    });

    return accessToken;
  }
}
