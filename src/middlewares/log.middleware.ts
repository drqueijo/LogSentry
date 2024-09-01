import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  logger = new Logger('Response');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const reqTime = new Date().getTime();

    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime() - reqTime;
      if (statusCode === 200 || statusCode === 201) {
        this.logger.log(`${method} ${originalUrl} ${statusCode} ${resTime}ms`);
      }
    });
    next();
  }
}
