import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Campo ou entidade não encontrado',
        error: exception.message,
      });
    }

    if (
      exception.message.includes(
        'duplicate key value violates unique constraint',
      ) ||
      exception.message.includes('UNIQUE KEY constraint')
    ) {
      return response.status(409).json({
        statusCode: 409,
        message: 'Já existe um dado com esse valor',
        error: exception.message,
      });
    }
    return response.status(400).json({
      statusCode: 400,
      message: 'Dado não existe ou inválido',
      error: exception.message,
    });
  }
}
