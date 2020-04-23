import { Component, OnInit } from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {ToastMessage} from '../../classes/toast-message';
import {Observable} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
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
  stopTimer(toastMessage: ToastMessage) {
    this.toastService.stopTimeout(toastMessage);
  }
  startTimer(toastMessage: ToastMessage) {
    this.toastService.startTimeout(toastMessage);
  }
}
