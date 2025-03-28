import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FilterExceptionGlobal implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private loggerNative: ConsoleLogger,
  ) {}  // tornando mais flexibel para usar tanto Express quanto Fastify

  catch(exception: unknown, host: ArgumentsHost) {
    this.loggerNative.error(exception)
    console.error(exception);

    const { httpAdapter } = this.adapterHost

    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    if('user' in request) {
      this.loggerNative.log(`Rota acessada pelo usuário ${request.user.sub}`);
    }

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
