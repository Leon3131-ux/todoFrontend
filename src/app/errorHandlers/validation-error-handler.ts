import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {ToastService} from "../services/toast.service";

@Injectable()
export class ValidationErrorHandler implements HttpResponseErrorHandler{

  constructor(private toastService: ToastService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 400;
  }

  handle(error: HttpErrorResponse) {
    for(const errorMsg of error.error.validationErrors){
      this.toastService.addMessage(errorMsg, 'danger', 5000);
    }
  }


}
