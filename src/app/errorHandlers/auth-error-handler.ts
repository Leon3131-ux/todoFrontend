import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ToastService} from "../services/toast.service";

@Injectable()
export class AuthErrorHandler implements HttpResponseErrorHandler{

  constructor(private toastService: ToastService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse) {
    if(error.error){
      this.toastService.addMessage(error.error.message, 'danger', 5000);
    }else{
      this.toastService.addMessage(error.message, 'danger', 5000);
    }
  }

}
