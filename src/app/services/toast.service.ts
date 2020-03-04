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
  addMessage(message: string, type: string) {
    const newMessage = new ToastMessage(this.idIncrement, message, type);
    this.messages.push(newMessage);
    this.observableMessages.next(this.messages);
    this.idIncrement++;
    timer(3000).subscribe(() => {
      this.deleteMessage(newMessage);
    });
  }
  getMessages() {
    return this.observableMessages.asObservable();
  }
  deleteMessage(toastMessage: ToastMessage) {
    this.messages.splice(this.messages.indexOf(toastMessage), 1);
    this.observableMessages.next(this.messages);
  }



}
