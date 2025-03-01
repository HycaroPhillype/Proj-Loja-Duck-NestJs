import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from './autenticacao.service';

export interface RequestWithUser extends Request {
  user: UserPayload;
}
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context
  .switchToHttp()
  .getRequest<RequestWithUser>();
  
  const token = this.extractTokenFromHeader(request);
  if (!token) {
    throw new UnauthorizedException('Erro de autenticação')
  }
  try {
    const payload: UserPayload = await this.jwtService.verifyAsync(token);
    request.user = payload
  } catch(error) {
    console.log(error);
    throw new UnauthorizedException('JWT inválido')

  }
    return true;
  }
  private extractTokenFromHeader(request:Request): string | undefined{
    // const authHeader = request.headers.authorization;
    // if (!authHeader) return undefined
    //formato do cabeçalho authorizathon: "Bearer <valor_do_jwt>" -> protocolo HTTP
    const [tipo, token] = request.headers.authorization?.split(' ') ?? []
    return tipo === 'Bearer' ? token : undefined
  }
}


