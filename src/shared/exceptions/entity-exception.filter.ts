import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityPropertyNotFoundError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityPropertyNotFoundError)
export class EntityPropertyNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = `Entidade ou propriedade não encontrada: ${exception.message}`;

    response.status(404).json({
      statusCode: 404,
      message: message,
      error: exception.message,
    });
  }
}
