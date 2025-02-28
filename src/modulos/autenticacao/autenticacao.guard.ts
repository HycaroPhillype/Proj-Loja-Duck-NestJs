import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  const token = this.extractTokenFromHeader(request);
  if (!token) {
    throw new UnauthorizedException('Erro de autenticação')
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


