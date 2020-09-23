import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponseErrorHandler} from './http-response-error-handler';
import {AuthorizationErrorHandler} from './authorization-error-handler';
import {InternalServerErrorHandler} from './internal-server-error-handler';
import {ValidationErrorHandler} from './validation-error-handler';
import {AuthenticationErrorHandler} from './authentication-error-handler';

@Injectable()
export class DefaultErrorHandler implements HttpResponseErrorHandler {

  private readonly handlers: HttpResponseErrorHandler[];

  constructor(
    private authorizationErrorHandler: AuthorizationErrorHandler,
    private internalServerErrorHandler: InternalServerErrorHandler,
    private validationErrorHandler: ValidationErrorHandler,
    private authenticationErrorHandler: AuthenticationErrorHandler
  ) {
    this.handlers = [
      authorizationErrorHandler,
      authenticationErrorHandler,
      internalServerErrorHandler,
      validationErrorHandler
    ];
  }

  handle(error: HttpErrorResponse) {
    for (const handler of this.handlers) {
      if (handler.matches(error)) {
        handler.handle(error);
      }
    }
  }

  matches(error: HttpErrorResponse): boolean {
    return true;
  }
}
