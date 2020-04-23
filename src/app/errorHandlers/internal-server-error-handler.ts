import {HttpErrorResponse} from "@angular/common/http";
import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {Injectable} from "@angular/core";
import {ToastService} from "../services/toast.service";

@Injectable()
export class InternalServerErrorHandler implements HttpResponseErrorHandler{

  constructor(private toastService: ToastService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 500;
  }

  handle(error: HttpErrorResponse) {
    this.toastService.addMessage(error.error.message, 'danger', 5000);
  }
}
