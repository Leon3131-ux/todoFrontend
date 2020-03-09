import { Injectable } from '@angular/core';
import {ToastMessage} from '../classes/toast-message';
import {BehaviorSubject} from 'rxjs';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private idIncrement = 0;
  private messages: ToastMessage[] = [];
  private observableMessages: BehaviorSubject<ToastMessage[]> = new BehaviorSubject([]);
  addMessage(message: string, type: string, aliveFor?: number) {
    const newMessage = new ToastMessage(this.idIncrement, message, type, aliveFor);
    this.messages.push(newMessage);
    this.observableMessages.next(this.messages);
    this.idIncrement++;
    this.startTimeout(newMessage);
  }
  stopTimeout(toastMessage: ToastMessage) {
    clearTimeout(toastMessage.timeout);
  }
  startTimeout(toastMessage: ToastMessage) {
    const timeout = setTimeout(() => {
      this.deleteMessage(toastMessage);
    }, toastMessage.aliveFor);
    toastMessage.timeout = timeout;
  }
  getMessages() {
    return this.observableMessages.asObservable();
  }
  deleteMessage(toastMessage: ToastMessage) {
    this.messages.splice(this.messages.indexOf(toastMessage), 1);
    this.observableMessages.next(this.messages);
  }

}
