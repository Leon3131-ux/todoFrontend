import { Component, OnInit } from '@angular/core';
import {ToastService} from '../services/toast.service';
import {ToastMessage} from '../classes/toast-message';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) { }
  messages: Observable<ToastMessage[]>;

  ngOnInit(): void {
    this.messages = this.toastService.getMessages();
  }
  deleteMessage(toastMessage: ToastMessage) {
    this.toastService.deleteMessage(toastMessage);
  }

}
