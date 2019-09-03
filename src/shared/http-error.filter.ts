import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errResponse = {
      statusCode: status,
      // timestamp: new Date().toISOString(), // 2019-08-27T09:12:36.082Z
      // get-locale-short-date-format-using-javascript
      timestamp: new Date().toLocaleDateString('vi-VN'), // 2019-08-27T09
      path: request.url,
      method: request.method,
      message: exception.message.error || exception.message || null
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errResponse),
      'ExceptionFilter')
    response.status(status).json(errResponse);
  }
}